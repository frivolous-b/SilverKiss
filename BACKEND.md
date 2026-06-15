# SILVER KISS — Backend интеграция (Supabase)

Сайтът се рендира изцяло от **`content.js`** (обектът `SK_DEFAULT`). Целият достъп до
данни минава през абстракцията **`SK_STORE`**, която има два адаптера:

| Адаптер     | Кога                         | Къде пази съдържанието          | Снимки                          |
|-------------|------------------------------|----------------------------------|----------------------------------|
| `local`     | Демо (по подразбиране, сега) | `localStorage` (ключ `sk_content`) | base64, смалени, вградени в JSON |
| `supabase`  | Продукция                    | таблица `site_content` (jsonb)   | Storage bucket `media`           |

Превключването става **само от админ панела → „Връзка / Backend"** (или директно през
`SK_STORE.setConn({ adapter:'supabase', url, anonKey, table, bucket })`). **Нула промени в
останалия код.**

---

## 1. Създай проект в Supabase
1. https://supabase.com → New project. Запиши **Project URL** и **anon public key**
   (Project Settings → API).

## 2. Таблица за съдържанието
Единичен ред (`id = 1`) с jsonb колона `data`, която съдържа целия `content` обект.

```sql
create table public.site_content (
  id          int primary key,
  data        jsonb not null,
  updated_at  timestamptz not null default now()
);

-- начален ред (по желание — иначе адаптерът връща дефолтите)
insert into public.site_content (id, data) values (1, '{}'::jsonb)
  on conflict (id) do nothing;
```

## 3. Storage bucket за снимки
```
Storage → New bucket → име: media → Public: ON
```
Публичните URL-и са от вида:
`https://<PROJECT>.supabase.co/storage/v1/object/public/media/uploads/<file>`

## 4. Row Level Security (RLS)
Anon ключът е публичен по дизайн — реалната защита са политиките.

```sql
alter table public.site_content enable row level security;

-- всеки може да ЧЕТЕ съдържанието (сайтът е публичен)
create policy "content readable by anyone"
  on public.site_content for select
  using (true);

-- само вписан потребител може да ПИШЕ (админът)
create policy "content writable by authenticated"
  on public.site_content for insert
  with check (auth.role() = 'authenticated');
create policy "content updatable by authenticated"
  on public.site_content for update
  using (auth.role() = 'authenticated');
```

Storage политики за bucket `media`:
```sql
-- публично четене
create policy "media public read"
  on storage.objects for select
  using (bucket_id = 'media');

-- качване само от вписан потребител
create policy "media upload authenticated"
  on storage.objects for insert
  with check (bucket_id = 'media' and auth.role() = 'authenticated');
```

## 5. Свържи админа
Админ панел → **Връзка / Backend** → избери **Supabase** → попълни Project URL, anon key,
таблица (`site_content`), bucket (`media`) → **Тествай връзката**.

---

## 6. Auth (замяна на демо паролата)
Демото ползва статична парола (`silver2026`) само като визуален gate. За продукция:

1. Supabase → Authentication → Providers → Email (или друг).
2. Създай админ потребител.
3. В `Admin.html` замени `tryUnlock` да вика Supabase Auth и да пази токена:

```js
// POST https://<PROJECT>.supabase.co/auth/v1/token?grant_type=password
const res = await fetch(conn.url + '/auth/v1/token?grant_type=password', {
  method: 'POST',
  headers: { apikey: conn.anonKey, 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
const { access_token } = await res.json();
window.SK_STORE.setConn({ token: access_token });   // адаптерът го ползва за запис/качване
```

`SK_STORE` вече праща `Authorization: Bearer <token>` при `save` и `uploadImage`,
така че щом подадеш `token`, защитеният запис тръгва.

---

## 7. API договор (какво вика адаптерът)
Всичко е стандартен Supabase REST/Storage — не пишеш собствен сървър.

| Операция        | Заявка |
|-----------------|--------|
| Прочети съдържание | `GET  {url}/rest/v1/{table}?select=data&id=eq.1` |
| Запази съдържание  | `POST {url}/rest/v1/{table}` body `{id:1, data:{…}}`, header `Prefer: resolution=merge-duplicates` |
| Качи снимка        | `POST {url}/storage/v1/object/{bucket}/uploads/<ts>-<name>` body = файла |
| Публичен URL       | `{url}/storage/v1/object/public/{bucket}/uploads/<ts>-<name>` |

Заглавки на всяка заявка: `apikey: <anonKey>`, `Authorization: Bearer <token|anonKey>`.

---

## 8. Hydration (по желание, за live съдържание на сайта)
Сайтът рисува моментално от локалния кеш (`window.__SK`). За да чете винаги
най-новото от Supabase, добави в края на `Silver Kiss.html` (след React mount):

```js
if (window.SK_STORE.adapterName === 'supabase') {
  window.SK_STORE.load().then((fresh) => {
    if (fresh) { localStorage.setItem('sk_content', JSON.stringify(fresh)); /* по желание: re-render */ }
  });
}
```

За демото това не е нужно — `localStorage` кешът е достатъчен.

---

## Обобщение
- `content.js` → схема на данните (един обект).
- `SK_STORE` → разменяеми адаптери; supabase кодът е готов.
- Този документ → SQL, bucket, RLS, Auth.

Разработчикът прави стъпки 1–6 и сайтът минава на реален backend без преписване.
