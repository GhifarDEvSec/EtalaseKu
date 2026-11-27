# Tahap 3 dari 5: Pencarian, Filter, Sorting, dan Pagination

## Konteks
Tahap 1 dan 2 selesai. Kerjakan hanya search, filter kategori, sorting, dan pagination dengan state disimpan di URL. Context dan form dikerjakan di tahap lain. Setelah selesai, berhenti.

## Aturan
- Hanya git status dan git diff. Jangan menyarankan pesan commit.
- Dilarang komentar dan tipe any. Dilarang menyebut AI, agent, atau nama tool di berkas repo. Jangan membuat PROGRESS.md atau STRUCTURE.md.
- Satu komponen satu berkas, ekspor default, props bertipe interface. Teks Bahasa Indonesia.
- Dilarang pustaka tambahan. Ikuti desain yang ada.

## Berkas
Dibuat:
```
src/hooks/useProductQuery.ts
src/hooks/useDebouncedValue.ts
src/utils/productQuery.ts
src/components/products/SearchBar.tsx
src/components/products/CategoryFilter.tsx
src/components/products/SortSelect.tsx
src/components/products/Pagination.tsx
```
Diubah: src/types/product.ts, src/pages/ProductsPage.tsx, src/services/productService.ts, src/styles.

## Spesifikasi
- types/product.ts: tambah SortOption = "default" | "harga-asc" | "harga-desc" | "nama-asc" | "rating-desc" dan interface ProductQuery (q, category, sort, page).
- productService.ts: tambah fetchCategories(): Promise<string[]> (endpoint /products/category-list).
- utils/productQuery.ts: fungsi murni filterProducts, sortProducts, paginateProducts (generik bila memungkinkan), semuanya tanpa mengubah array asli. Pencarian pada judul, deskripsi, dan brand tanpa membedakan huruf besar kecil. 12 produk per halaman.
- useDebouncedValue<T>(value, delay): custom hook penunda nilai (300 ms) untuk kolom pencarian.
- useProductQuery: memakai useSearchParams (URL state). Membaca dan menulis parameter q, kategori, urut, dan halaman. Mengembalikan query terbaca, fungsi pengubah, dan reset. Mengubah q, kategori, atau urut mengembalikan halaman ke 1. Nilai tidak valid di URL diganti nilai bawaan. Parameter bawaan tidak ditulis ke URL.
- SearchBar: kolom terkontrol dengan label dan tombol hapus; nilai lokal ditunda lewat useDebouncedValue baru ditulis ke URL.
- CategoryFilter: select berisi "Semua kategori" dan kategori dari API.
- SortSelect: select dengan lima opsi urut.
- Pagination: tombol Sebelumnya, nomor halaman (ringkas dengan elipsis bila banyak), Berikutnya; halaman aktif ditandai aria-current; tombol nonaktif di ujung; menggulir ke atas daftar saat pindah halaman.
- ProductsPage: ambil semua produk sekali, hitung hasil filter, sort, dan paginasi dari data dan URL (tidak disimpan sebagai state terpisah). Tampilkan jumlah hasil, tombol "Reset" bila ada filter aktif, EmptyState "Produk tidak ditemukan" bila hasil kosong. Membuka URL seperti /produk?q=phone&kategori=smartphones&urut=harga-asc&halaman=1 harus langsung menampilkan kondisi yang sama; tombol back browser mengembalikan kondisi sebelumnya.
- Tautan ke detail membawa query saat ini sehingga tombol "Kembali ke daftar" di halaman detail mengembalikan pencarian dan halaman yang sama (gunakan state pada Link atau parameter query).
- CSS: bilah kontrol satu baris di desktop dan bertumpuk di mobile, input tinggi minimal 44px, rapi di 360px sampai 1440px.

## Checkpoint
- [ ] Semua berkas wajib ada
- [ ] npm run build berhasil
- [ ] Pencarian, filter, sort, dan pagination berfungsi bersamaan
- [ ] URL berubah sesuai pilihan, reload dan tombol back mempertahankan kondisi
- [ ] Hasil kosong menampilkan empty state
- [ ] Kembali dari detail mengembalikan pencarian dan halaman
- [ ] Tanpa komentar, any, atau penyebutan AI/agent
- [ ] .env tidak muncul di git status

## Laporan Akhir
Pohon direktori, hasil build, git status. Jangan menyarankan pesan commit. Tutup dengan "Tahap 3 selesai." lalu berhenti.