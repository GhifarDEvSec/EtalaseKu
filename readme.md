# Tahap 1 dari 5: Inisialisasi, Routing, dan Struktur Folder

## Konteks
Aplikasi "Katalog Produk" dengan React, React Router, Vite, dan TypeScript. Kerjakan hanya tahap 1, lalu berhenti dan tunggu perintah.

## Aturan
- Hanya git status dan git diff. Jangan menyarankan pesan commit.
- Jangan deploy.
- Dilarang komentar di semua berkas. Dilarang tipe any.
- Dilarang menyebut AI, agent, asisten, atau nama tool di berkas repo. Jangan membuat PROGRESS.md atau STRUCTURE.md.
- Teks antarmuka Bahasa Indonesia.
- Proyek dibuat langsung di root folder kerja. Jangan hapus folder .git.

## Spesifikasi
Vite template react-ts non-interaktif (npm create vite@latest . -- --template react-ts), TypeScript strict, npm. Pasang react-router-dom.

Berkas dan folder wajib:
```
index.html
package.json
vite.config.ts
.gitignore
.env
.env.example
public/favicon.svg
public/_redirects
src/main.tsx
src/App.tsx
src/config.ts
src/vite-env.d.ts
src/components/layout/AppLayout.tsx
src/components/layout/Navbar.tsx
src/components/layout/Footer.tsx
src/pages/HomePage.tsx
src/pages/ProductsPage.tsx
src/pages/ProductDetailPage.tsx
src/pages/FavoritesPage.tsx
src/pages/NotFoundPage.tsx
src/hooks/
src/services/
src/context/
src/types/
src/styles/
```
Folder kosong diberi berkas .gitkeep.

- .env (tidak masuk Git):
```
VITE_APP_NAME=Katalog Produk
VITE_STUDENT_NAME=Nama Mahasiswa
VITE_STUDENT_NIM=0000000000
VITE_API_BASE_URL=https://dummyjson.com
```
.env.example berisi sama persis dan masuk Git. vite-env.d.ts memperluas ImportMetaEnv. config.ts membaca empat variabel dan mengekspor appConfig; satu-satunya tempat membaca import.meta.env.
- .gitignore: node_modules, dist, .env, .env.local, .env.*.local, *.log, .DS_Store, .vscode/* (kecuali .vscode/extensions.json).
- public/_redirects berisi satu baris: `/* /index.html 200` (agar rute dinamis tidak 404 saat di-reload di Netlify).
- main.tsx: StrictMode dan BrowserRouter membungkus App.
- App.tsx: Routes dengan nested route. Route induk path "/" memakai AppLayout (berisi Navbar, Outlet, Footer). Anak: index (HomePage), "produk" (ProductsPage), "produk/:id" (ProductDetailPage), "favorit" (FavoritesPage), "*" (NotFoundPage).
- Navbar: NavLink untuk Beranda, Produk, Favorit (gaya aktif), tautan dirender dengan map dan key, menampilkan appName. Di bawah 768px menu dibuka tombol menu memakai useState (local state), menutup setelah tautan diklik.
- Footer: appName, nama, dan NIM dari appConfig.
- Setiap halaman sementara berisi judul dan teks singkat. ProductDetailPage membaca id dengan useParams dan menampilkannya. NotFoundPage punya tautan kembali ke beranda.
- Desain: bersih dan modern, bukan tampilan template bawaan. Satu aksen warna, kartu berborder tipis, teks kontras minimal 4.5:1, tanpa framework CSS dan tanpa sumber eksternal. CSS di src/styles (tokens.css, base.css, layout.css), container maksimum 1100px, tanpa scroll horizontal, rapi di 360px sampai 1440px.
- Pembersihan: hapus App.css, index.css, assets/react.svg, public/vite.svg, dan isi contoh template.

## Checkpoint
- [ ] Semua berkas dan folder wajib ada (periksa dengan ls)
- [ ] npm install dan npm run build berhasil
- [ ] Pindah halaman lewat menu tanpa reload, /produk/5 menampilkan id 5, alamat tak dikenal menampilkan NotFoundPage
- [ ] Menu mobile berfungsi, tanpa scroll horizontal
- [ ] .env tidak muncul di git status, .env.example muncul
- [ ] Tanpa komentar, any, atau penyebutan AI/agent

## Laporan Akhir
Pohon direktori, hasil build, git status. Jangan menyarankan pesan commit. Tutup dengan "Tahap 1 selesai." lalu berhenti.