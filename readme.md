# Tahap 4 dari 5: Context API (Favorit dan Catatan) dan Form

## Konteks
Tahap 1 sampai 3 selesai. Kerjakan hanya global state dengan Context API, halaman Favorit, dan form catatan dengan validasi. Setelah selesai, berhenti.

## Aturan
- Hanya git status dan git diff. Jangan menyarankan pesan commit.
- Dilarang komentar dan tipe any. Dilarang menyebut AI, agent, atau nama tool di berkas repo. Jangan membuat PROGRESS.md atau STRUCTURE.md.
- Satu komponen satu berkas, ekspor default untuk komponen, props bertipe interface. Teks Bahasa Indonesia.
- Dilarang pustaka state management tambahan. Ikuti desain yang ada.

## Berkas
Dibuat:
```
src/context/FavoritesContext.tsx
src/context/NotesContext.tsx
src/hooks/useFavorites.ts
src/hooks/useNotes.ts
src/hooks/useLocalStorage.ts
src/components/products/FavoriteButton.tsx
src/components/notes/NoteForm.tsx
src/components/notes/NoteList.tsx
src/types/note.ts
```
Diubah: src/main.tsx, src/components/layout/Navbar.tsx, src/components/products/ProductCard.tsx, src/pages/ProductDetailPage.tsx, src/pages/FavoritesPage.tsx, src/styles.

## Spesifikasi
- useLocalStorage<T>(key, initialValue): custom hook generik, aman terhadap data rusak (try/catch), menyimpan perubahan ke localStorage.
- types/note.ts: interface Note (id, productId, text, createdAt).
- FavoritesContext: Provider menyimpan id produk favorit (array number). Nilai: favoriteIds, isFavorite(id), toggleFavorite(id), count. Disimpan lewat useLocalStorage. useFavorites adalah hook untuk memakai context dan melempar error jika dipakai di luar Provider.
- NotesContext: Provider menyimpan Note[]. Nilai: notes, getNotesByProduct(productId), addNote(productId, text), deleteNote(id). Disimpan lewat useLocalStorage. useNotes sebagai hook pemakai.
- main.tsx: bungkus App dengan kedua Provider di dalam BrowserRouter.
- FavoriteButton: tombol ikon dengan aria-pressed dan aria-label yang menyebut nama produk; dipakai di ProductCard dan ProductDetailPage.
- Navbar: tampilkan jumlah favorit (dari context) pada tautan Favorit.
- FavoritesPage: memakai daftar produk dari API (useProducts) dan menampilkan hanya yang favorit lewat ProductGrid. Loading dan error ditangani. Jika belum ada favorit tampilkan EmptyState "Belum ada produk favorit" dengan tautan ke /produk.
- NoteForm (form state): textarea terkontrol (useState) dengan label, hitung karakter, validasi: wajib diisi, minimal 5 karakter, maksimal 200 karakter. Pesan kesalahan tampil di bawah kolom dan menghilang saat input valid. onSubmit dengan preventDefault, panggil addNote, lalu kosongkan form dan tampilkan pesan sukses singkat.
- NoteList: daftar catatan produk (map dengan key id), tanggal terformat Indonesia, tombol Hapus dengan konfirmasi; kosong menampilkan teks "Belum ada catatan".
- ProductDetailPage: tambahkan bagian Catatan berisi NoteForm dan NoteList untuk produk tersebut.
- CSS: form dan daftar catatan rapi di 360px sampai 1440px, fokus jelas, animasi halus (mati pada reduced-motion).

## Checkpoint
- [ ] Semua berkas wajib ada
- [ ] npm run build berhasil
- [ ] Favorit bisa ditambah dan dihapus dari kartu dan detail, jumlah di navbar ikut berubah, tetap ada setelah reload
- [ ] Halaman Favorit menampilkan hanya produk favorit
- [ ] Form menolak input kosong, kurang dari 5 karakter, dan lebih dari 200 karakter dengan pesan jelas
- [ ] Catatan bertambah dan terhapus, tetap ada setelah reload, terpisah per produk
- [ ] Pemakaian context di luar Provider memunculkan error yang jelas
- [ ] Tanpa komentar, any, atau penyebutan AI/agent
- [ ] .env tidak muncul di git status

## Laporan Akhir
Pohon direktori, hasil build, git status. Jangan menyarankan pesan commit. Tutup dengan "Tahap 4 selesai." lalu berhenti.