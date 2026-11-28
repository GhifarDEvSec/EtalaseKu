# EtalaseKu

Katalog produk sederhana yang menampilkan data dari DummyJSON. Aplikasi mendukung pencarian, filter kategori, pengurutan, pagination, favorit, catatan produk, tema terang dan gelap, serta panel informasi API.

## Teknologi

- React dan React Router
- TypeScript
- Vite
- CSS murni dengan token desain

## Fitur

- Katalog produk dengan grid responsif dan kartu seragam.
- Pencarian, filter kategori, pengurutan, dan pagination.
- Halaman detail produk dengan galeri gambar, harga, stok, dan merek.
- Quick View dan favorit dengan penyimpanan lokal.
- Catatan pribadi per produk.
- Tema terang dan gelap yang tersimpan di perangkat.
- Harga ditampilkan dalam Rupiah menggunakan kurs tetap.
- Panel "Data dari API" berisi daftar endpoint dan statistik permintaan.
- Penampil JSON untuk melihat respons API pada halaman detail.

## Sumber Data

Data produk berasal dari [DummyJSON](https://dummyjson.com). Endpoint yang digunakan:

- `GET /products?limit=0` untuk seluruh daftar produk.
- `GET /products/{id}` untuk detail satu produk.
- `GET /products/category-list` untuk daftar kategori.

## Konversi Harga

Harga dari API masih dalam dolar AS. Nilai dikonversi ke Rupiah memakai kurs tetap dari `VITE_USD_TO_IDR` sebagai perkiraan, lalu diformat dengan `Intl.NumberFormat` untuk mata uang IDR.

## Variabel Lingkungan

Buat berkas `.env` di root proyek:

```
VITE_APP_NAME=EtalaseKu
VITE_API_BASE_URL=https://dummyjson.com
VITE_USD_TO_IDR=16000
```

- `VITE_APP_NAME`: nama aplikasi yang tampil di antarmuka.
- `VITE_API_BASE_URL`: alamat dasar API.
- `VITE_USD_TO_IDR`: kurs konversi dolar AS ke Rupiah.

## Struktur Singkat

```
src/
  components/   komponen antarmuka dan fitur
  context/      penyedia tema, favorit, catatan, dan notifikasi
  hooks/        hook data dan antarmuka
  pages/        halaman aplikasi
  services/     akses API
  styles/       token dan gaya global
  types/        tipe data
  utils/        pembantu format dan query
```
## Penjelasan Singkat

- Routing: memakai React Router. Ada 5 halaman, termasuk detail produk dengan alamat dinamis `/produk/:id`. Semua halaman berada di dalam satu layout (navbar dan footer) lewat nested route.
- State management: `useState` untuk kondisi komponen dan form, Context API untuk favorit, catatan, dan tema, hook `useFetch` untuk data dari API, serta parameter URL untuk pencarian, filter, urutan, dan halaman.
- API: data produk diambil dari DummyJSON dengan `fetch`. Tersedia tampilan loading, pesan kesalahan sistem, dan pesan jika data kosong. Harga dapat dikoonversi dari dolar (default Amerika) ke rupiah (custom Indonesia).
- Custom hooks: `useFetch` untuk mengambil data, `useProductQuery` untuk pencarian di URL, `useDebouncedValue` untuk menunda input pencarian, dan `useLocalStorage` untuk menyimpan data di browser.
- Struktur folder: `components`, `pages`, `hooks`, `services` (khusus pemanggilan API), `context`, `types`, `utils`, dan `styles`, sehingga tampilan, logika, dan akses API terpisah.