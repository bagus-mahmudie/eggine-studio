# Egginestudio

Website profil Egginestudio yang menampilkan informasi studio, game, karier, dan kontak.

**Status:** Live · [Buka website](https://egginestudio.com/)

## Fitur

- Halaman profil studio dan katalog game
- Informasi karier
- Template halaman dan komponen yang digunakan bersama

## Teknologi

Eleventy 3, Nunjucks, Tailwind CSS 3.

## Menjalankan secara lokal

Pasang Node.js dan npm sesuai persyaratan dependensi pada `package-lock.json`.

```sh
npm ci
npm run dev
```

Buka alamat server yang ditampilkan di terminal. Untuk build:

```sh
npm run build
```

Hasil build berada di `_site/`. Folder hasil build tidak menjadi sumber utama repository.

## Struktur

- `src/` — halaman, template, data, dan aset.
- `.eleventy.js` — konfigurasi generator website.
- `package.json` — dependensi dan perintah pengembangan.

## Catatan repository

Dependensi terpasang, cache, file `.env`, database, dan unggahan pengguna tidak disertakan. Nama merek dan aset pihak ketiga tetap mengikuti hak pemiliknya. Tidak ada lisensi penggunaan ulang yang diberikan melalui repository ini.
