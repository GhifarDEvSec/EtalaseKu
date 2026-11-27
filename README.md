# Katalog Produk

Aplikasi web katalog produk yang dibangun dengan React, TypeScript, dan Vite. Data produk diambil dari DummyJSON dan disajikan dengan pencarian, filter kategori, pengurutan, pagination, halaman detail, fitur favorit, serta catatan pribadi.

## Identitas

- Nama: Nama Mahasiswa
- NIM: 0000000000

## Sumber Data

Data produk, kategori, dan detail produk berasal dari [DummyJSON](https://dummyjson.com). Seluruh permintaan API dipusatkan di folder `src/services`.

## Fitur

- Beranda yang menampilkan nama aplikasi, identitas, dan tautan menuju katalog.
- Daftar produk dengan pencarian (debounce), filter kategori, pengurutan, dan pagination.
- Pencarian, filter, pengurutan, dan nomor halaman tersimpan pada URL.
- Halaman detail produk berdasarkan ID pada URL.
- Favorit produk yang tersimpan di `localStorage` dan dihitung pada navbar.
- Catatan pribadi per produk dengan validasi dan penyimpanan di `localStorage`.
- Keadaan loading, error, dan kosong pada setiap tampilan data.
- Judul tab dinamis untuk setiap halaman.
- Tata letak responsif untuk lebar 360px hingga 1440px.
- Fokus keyboard yang terlihat dan teks alternatif pada gambar.

## Teknologi

- React 19
- TypeScript
- Vite
- React Router
- CSS

## Halaman dan Rute

| Rute | Halaman | Keterangan |
| --- | --- | --- |
| `/` | Beranda | Nama aplikasi, identitas, tautan ke katalog |
| `/produk` | Daftar Produk | Pencarian, filter, pengurutan, pagination |
| `/produk/:id` | Detail Produk | Informasi produk, favorit, catatan |
| `/favorit` | Favorit | Daftar produk yang disimpan |
| `*` | Tidak Ditemukan | Halaman 404 |

## Struktur Folder

```
src/
  components/
    layout/      # kerangka halaman, navbar, footer
    products/    # komponen katalog produk
    notes/       # komponen catatan
    ui/          # komponen antarmuka umum
  context/       # state global favorit dan catatan
  hooks/         # custom hook data, URL, penyimpanan, judul
  pages/         # halaman aplikasi
  services/      # akses API
  styles/        # token dan gaya global
  types/         # tipe data
  utils/         # logika filter, urutan, dan pagination
  App.tsx
  config.ts
  main.tsx
```

## Menjalankan Proyek

1. Pasang dependensi.

   ```
   npm install
   ```

2. Salin berkas contoh environment.

   ```
   cp .env.example .env
   ```

3. Sesuaikan nilai pada `.env` bila diperlukan.

4. Jalankan server pengembangan.

   ```
   npm run dev
   ```

## Variabel Environment

| Variabel | Keterangan |
| --- | --- |
| `VITE_APP_NAME` | Nama aplikasi pada antarmuka dan judul tab |
| `VITE_STUDENT_NAME` | Nama yang ditampilkan di beranda |
| `VITE_STUDENT_NIM` | NIM yang ditampilkan di beranda |
| `VITE_API_BASE_URL` | Alamat dasar API, default `https://dummyjson.com` |

## Skrip NPM

| Perintah | Keterangan |
| --- | --- |
| `npm run dev` | Menjalankan server pengembangan |
| `npm run build` | Memeriksa tipe dan membangun berkas produksi |
| `npm run preview` | Menjalankan pratinjau hasil build |
| `npm run lint` | Menjalankan pemeriksaan lint |

## Build Produksi

```
npm run build
```

Hasil build tersimpan di folder `dist`. Berkas `public/_redirects` ikut disalin sehingga rute sisi klien tetap bekerja saat di-deploy.
