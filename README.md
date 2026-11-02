# Risss.clobber

Static e-commerce fashion prototype berbasis HTML5, CSS3, dan Vanilla JavaScript. **Mode utama project saat ini adalah frontend standalone tanpa database.**

> **Status MVP:** Katalog, wishlist, cart, akun demo, checkout simulasi, order, dan admin berjalan menggunakan data demo serta `localStorage`. Backend dan PostgreSQL belum diperlukan untuk menjalankan atau mempresentasikan prototype.

> **Batasan prototype:** Data hanya tersimpan di browser yang digunakan, autentikasi bukan untuk production, pembayaran masih simulasi, dan order belum tersimpan ke server. Menghapus data browser dapat menghapus state demo.

---

## Cara Menjalankan (Rekomendasi)

1. Buka project ini di VS Code.
2. Jalankan `index.html` langsung di browser, atau gunakan extension **Live Server**.
3. Tidak perlu PostgreSQL, pgAdmin, file `.env`, atau `npm install` untuk mode prototype.
4. Untuk pengujian paling stabil, gunakan Live Server atau static server lokal agar routing hash dan penyimpanan browser berjalan konsisten.
5. Pastikan tab **Network** tidak menampilkan request ke `/api/*`; halaman utama hanya memuat `js/products.js`, `js/auth.js`, `js/admin.js`, dan `js/app.js`.

> `js/api.js` tetap disimpan sebagai adapter untuk fase integrasi backend berikutnya, tetapi tidak dimuat oleh `index.html` pada mode offline.

### Akun demo

- **Admin:** `admin@risssclobber.demo` / `password123`
- **Customer:** `demo@risssclobber.demo` / `password123`

Akun baru juga dapat dibuat melalui halaman Register. Kredensial tersebut hanya untuk simulasi lokal dan tidak boleh digunakan di production.

### Penyimpanan lokal

| Data | Penyimpanan |
| --- | --- |
| Produk | Data demo frontend |
| Cart | `localStorage` |
| Wishlist | `localStorage` |
| Session dan akun demo | `localStorage` |
| Order dan status admin | `localStorage` |

---

## Tahap Lanjutan (Opsional): Backend + PostgreSQL

Folder `server/` dan `sql/` dipertahankan sebagai rancangan integrasi tahap berikutnya. Aktifkan bagian ini hanya ketika project membutuhkan multi-user, order permanen, stok real-time, admin lintas perangkat, atau deployment production.

1. Install Node.js 18+ dan PostgreSQL 12+.
2. Di pgAdmin 4, buat database `risss_clobber`.
3. Salin `.env.example` menjadi `.env`, lalu sesuaikan `DATABASE_URL` dan `JWT_SECRET`.
4. Jalankan `npm install`, lalu inisialisasi schema dan seed dengan perintah otomatis (meng-generate password bcrypt demo):
   ```bash
   npm run seed
   ```
5. Jalankan server:
   ```bash
   npm run dev
   ```
6. Buka `http://localhost:3000`; health check tersedia di `http://localhost:3000/api/health`.

Endpoint awal meliputi `GET /api/products`, `GET /api/brands`, `GET /api/categories`, endpoint auth, cart customer, orders, dan `/api/admin/*`. Browser tidak pernah terhubung langsung ke PostgreSQL.

> Jangan pernah menaruh password PostgreSQL, token, atau secret di frontend.

---

## Checklist Pengujian Demo

Jalankan aplikasi melalui Live Server, lalu verifikasi:

- [ ] Login customer dengan `demo@risssclobber.demo` / `password123`.
- [ ] Login admin dengan `admin@risssclobber.demo` / `password123`.
- [ ] Tambah produk ke cart dan ubah quantity.
- [ ] Terapkan voucher `FREESHIP`.
- [ ] Selesaikan checkout dengan data valid.
- [ ] Verifikasi order muncul di riwayat customer dan panel admin.
- [ ] Ubah status order dan verifikasi sinkronisasi customer.
- [ ] Verifikasi stok berkurang setelah checkout.
- [ ] Verifikasi produk stok `0` menampilkan `Out of Stock` dan tidak dapat dibeli.
- [ ] Uji tombol `Reset Data Demo ↺`.
- [ ] Uji menu navigasi mobile dan empty states.
- [ ] Uji filter, search, sorting, dan hasil kosong di halaman Shop.

### Hasil yang Diharapkan

- Order baru berstatus `Pending`.
- Cart dikosongkan setelah order berhasil.
- Stok berkurang sesuai quantity.
- Reset demo menghapus cart, wishlist, order, akun tambahan, dan perubahan admin.

---

## Fitur yang Tersedia

- Katalog, pencarian, filter, sorting, dan quick view produk.
- Detail produk dengan pilihan ukuran dan validasi stok demo.
- Wishlist dan cart berbasis browser storage.
- Checkout dan pembayaran simulasi.
- Login/register demo, profile, dan riwayat order lokal.
- Dashboard admin demo untuk inventory dan status order.

---

## Halaman Web

- [Halaman Utama (Landing Page)](index.html) — Hero showcase, featured brands, new arrivals, promo banner, dan newsletter.
- [Katalog Produk (Shop)](shop.html) — Daftar produk lengkap dengan filter brand, kategori, rentang harga, search, dan sort.
- [Detail Produk (Product)](product.html?id=si-jacket) — Galeri gambar, deskripsi, pemilihan ukuran, dan status ketersediaan stok.
- [Wishlist](wishlist.html) — Daftar simpanan produk favorit berbasis browser storage.
- [Keranjang Belanja (Cart)](cart.html) — Review kuantitas item, estimasi pengiriman, dan kupon diskon promo demo (`FREESHIP`).
- [Checkout Simulation](checkout.html) — Form rincian alamat pemesan, pilihan ekspedisi, dan simulasi pembayaran.
- [Tentang Kami (About)](about.html) — Visi kurasi brand, editorial fashion, dan informasi prototype.

---

## Dokumentasi Standar Development

Dokumentasi teknis dan panduan arsitektur aplikasi tersimpan pada direktori [`docs/standar-dev/`](docs/standar-dev/):

1. [PRD (Product Requirements Document)](docs/standar-dev/prd.md)  
   Latar belakang, persona pengguna, cakupan fungsional MVP, dan kriteria penerimaan.

2. [Tech Stack](docs/standar-dev/tech_stack.md)  
   Rincian teknologi HTML5 Semantic, Modern CSS Custom Properties, ES6+ Modules, dan pertimbangan non-library.

3. [Arsitektur Aplikasi](docs/standar-dev/arsitektur.md)  
   Struktur komponen, flow state aplikasi, skema LocalStorage (`risssClobberCart`, `risssClobberWishlist`), dan event handler.

4. [Panduan Desain UI/UX](docs/standar-dev/ui.ux.md)  
   Design system, palet monokromatik utilitarian, skala tipografi, grid layout, dan state interaksi.

5. [Instruksi Pengembangan & Verifikasi](docs/standar-dev/instruction.md)  
   Checklist pengujian fungsional manual, konvensi kode, keamanan data lokal, dan batasan teknis prototype.

---

## Struktur Direktori

```text
standarDev/
├── README.md                  <-- Dokumentasi & panduan utama project
├── index.html
├── shop.html
├── product.html
├── wishlist.html
├── cart.html
├── checkout.html
├── about.html
├── css/
│   └── style.css
├── js/
│   ├── products.js
│   ├── main.js
│   ├── shop.js
│   ├── product.js
│   ├── wishlist.js
│   ├── cart.js
│   └── checkout.js
└── docs/
    └── standar-dev/
        ├── prd.md
        ├── tech_stack.md
        ├── arsitektur.md
        ├── ui.ux.md
        └── instruction.md
```
