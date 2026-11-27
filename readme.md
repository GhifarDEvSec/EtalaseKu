# Tahap 2 dari 5: Data Fetching dan Komponen Reusable

## Konteks
Tahap 1 selesai. Kerjakan hanya pengambilan data dari API, custom hook, komponen reusable, dan tampilan daftar serta detail. Search, filter, sort, pagination, Context, dan form dikerjakan di tahap lain. Setelah selesai, berhenti.

## Aturan
- Hanya git status dan git diff. Jangan menyarankan pesan commit.
- Dilarang komentar dan tipe any. Dilarang menyebut AI, agent, atau nama tool di berkas repo. Jangan membuat PROGRESS.md atau STRUCTURE.md.
- Satu komponen satu berkas, ekspor default, props bertipe interface. Teks Bahasa Indonesia.
- Pemanggilan API hanya di folder services. Komponen dan halaman tidak boleh memanggil fetch langsung.
- Dilarang pustaka tambahan untuk data fetching (gunakan fetch bawaan). Ikuti desain yang ada.

## Berkas
Dibuat:
```
src/types/product.ts
src/services/apiClient.ts
src/services/productService.ts
src/hooks/useFetch.ts
src/hooks/useProducts.ts
src/hooks/useProduct.ts
src/components/ui/Button.tsx
src/components/ui/Badge.tsx
src/components/ui/Loader.tsx
src/components/ui/ErrorMessage.tsx
src/components/ui/EmptyState.tsx
src/components/products/ProductCard.tsx
src/components/products/ProductGrid.tsx
```
Diubah: src/pages/ProductsPage.tsx, src/pages/ProductDetailPage.tsx, src/pages/HomePage.tsx, src/styles (tambah gaya komponen).

## Spesifikasi
- types/product.ts: interface Product (id, title, description, category, price, discountPercentage, rating, stock, brand opsional, thumbnail, images string[]) dan interface ProductListResponse (products, total, skip, limit).
- apiClient.ts: fungsi generik getJson<T>(path: string): Promise<T> memakai fetch dengan base URL dari appConfig. Jika respons tidak ok, lempar Error dengan pesan Bahasa Indonesia yang jelas.
- productService.ts: fetchAllProducts(): Promise<Product[]> memanggil /products?limit=0. fetchProductById(id: string): Promise<Product> memanggil /products/{id}.
- useFetch<T>(fetcher): custom hook generik yang mengembalikan data, loading, error, dan reload. Membatalkan hasil jika komponen sudah dilepas atau parameter berubah.
- useProducts dan useProduct: membungkus useFetch dengan service yang sesuai.
- Komponen reusable: Button (variant utama, netral, bahaya), Badge (tone), Loader (indikator loading beraksesibilitas, role="status"), ErrorMessage (pesan dan tombol "Coba Lagi"), EmptyState (pesan dan ilustrasi SVG sederhana buatan sendiri).
- ProductCard: gambar, judul, kategori (Badge), harga terformat Rupiah-gaya Indonesia dengan simbol dolar atau format yang konsisten, rating, tautan Link ke /produk/{id}.
- ProductGrid: menerima products dan merender ProductCard lewat map dengan key id; kosong menampilkan EmptyState "Produk tidak ditemukan".
- ProductsPage: memakai useProducts; loading menampilkan Loader, error menampilkan ErrorMessage dengan reload, data menampilkan ProductGrid.
- ProductDetailPage: memakai useParams dan useProduct; menampilkan loading, error (termasuk id tidak ada), gambar utama dan galeri kecil, judul, deskripsi, kategori, harga, diskon, rating, stok, dan tautan kembali ke daftar.
- HomePage: ringkasan aplikasi dan tombol menuju /produk.
- CSS: grid kartu 1 kolom di mobile, 2 kolom mulai 640px, 3 kolom mulai 1024px, animasi halus (mati pada prefers-reduced-motion), rapi di 360px sampai 1440px.

## Checkpoint
- [ ] Semua berkas wajib ada
- [ ] npm run build berhasil
- [ ] Daftar produk tampil dari API, Loader muncul saat memuat
- [ ] Error tampil saat internet dimatikan atau URL API salah sementara, tombol Coba Lagi berfungsi
- [ ] /produk/1 menampilkan detail, /produk/99999 menampilkan pesan error
- [ ] Tidak ada fetch di luar folder services
- [ ] Tanpa komentar, any, atau penyebutan AI/agent
- [ ] .env tidak muncul di git status

## Laporan Akhir
Pohon direktori, hasil build, git status. Jangan menyarankan pesan commit. Tutup dengan "Tahap 2 selesai." lalu berhenti.