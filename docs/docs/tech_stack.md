# Technology Stack — Risss.clobber

## Stack Aktual
- **Markup:** HTML5 semantic (nav, main, section, aside, footer, article, details, dialog/modal hooks).
- **Styling:** CSS3 murni tanpa framework (CSS Variables, Flexbox, CSS Grid, media queries, prefers-reduced-motion, system sans-serif typography).
- **Interaktivitas:** Vanilla JavaScript murni (ES6+ modular, DOM events, querySelectors, Intl.NumberFormat).
- **State Management & Persistence:** Web Storage API (`localStorage`) untuk shopping cart dan wishlist.
- **Library Frontend:** 0 dependency (Tidak menggunakan React, Vue, Angular, Bootstrap, Tailwind, atau jQuery).
- **Backend:** Node.js (>= 18) & Express.js (`server/index.js`), struktur REST API modular.
- **Database target:** PostgreSQL 12+ (`sql/schema.sql`, 12 tabel relasional, query terparameterisasi via pool `pg`).
- **Database administration:** pgAdmin 4 untuk membuat database, menjalankan migrasi/seed, dan inspeksi data.
- **API & Keamanan:** REST API JSON, autentikasi via password hashing (bcryptjs) & JWT cookies/Bearer token, proteksi transaksi inventori dengan `FOR UPDATE` + `ROLLBACK`.
- **Images:** File gambar lokal di `image/products/` dengan nama sesuai ID produk dan alt-text deskriptif.

---

# Technology Stack

> **Status:** Belum dapat ditentukan dari konfigurasi proyek. Workspace `C:\Users\LENOVO\Documents\standarDev` saat dianalisis tidak berisi source code maupun file konfigurasi.

## 1. Hasil Audit Aktual

| Komponen | Temuan | Versi | Status |
|---|---|---|---|
| Bahasa pemrograman | Tidak ada source code | Tidak tersedia | Perlu dikonfirmasi |
| Framework | Tidak ada manifest/config | Tidak tersedia | Perlu dikonfirmasi |
| Library/dependensi | Tidak ada `package.json`, `requirements.txt`, dan manifest sejenis | Tidak tersedia | Perlu dikonfirmasi |
| Database | Tidak ada konfigurasi atau schema | Tidak tersedia | Perlu dikonfirmasi |
| Server/cloud | Tidak ada konfigurasi deployment | Tidak tersedia | Perlu dikonfirmasi |
| Testing | Tidak ada test runner atau test suite | Tidak tersedia | Belum diimplementasikan |
| CI/CD | Tidak ada pipeline | Tidak tersedia | Belum diimplementasikan |
| Containerisasi | Tidak ada Dockerfile/compose | Tidak tersedia | Belum diimplementasikan |

## 2. Teknologi yang Direkomendasikan untuk Dipilih

Bagian ini bukan catatan teknologi aktual. Pemilihan harus disetujui setelah domain, target deployment, kemampuan tim, dan kebutuhan skala dikonfirmasi.

1. **Bahasa dan framework:** pilih satu stack resmi sesuai jenis aplikasi; jangan mencampur framework tanpa kebutuhan yang jelas.
2. **Database:** pilih basis data relasional atau nonrelasional berdasarkan bentuk data dan kebutuhan transaksi.
3. **Testing:** tetapkan unit, integration, dan end-to-end test runner yang kompatibel dengan stack final.
4. **CI/CD:** gunakan pipeline yang tersedia pada platform repository setelah repository remote ditentukan.
5. **Observability:** tetapkan logging terstruktur, monitoring, dan alerting sebelum production.

## 3. Prinsip Pemilihan

- Versi harus dikunci di manifest dan lockfile.
- Gunakan teknologi yang memiliki dukungan keamanan dan dokumentasi aktif.
- Hindari dependency yang tidak diperlukan.
- Setiap penambahan teknologi wajib memiliki alasan teknis dan dicatat pada perubahan arsitektur.
- Jangan mengganti teknologi yang sudah dipilih tanpa persetujuan Product Owner/Tech Lead.

## 4. Perlu Dikonfirmasi

- Domain dan tipe aplikasi.
- Target platform (web, mobile, desktop, atau API).
- Penyedia repository, server, dan cloud.
- Pilihan bahasa, framework, database, serta versi yang disetujui.
- Kebutuhan integrasi layanan pihak ketiga.
- Strategi backup, observability, dan biaya operasional.

Sampai informasi tersebut tersedia, tidak ada versi teknologi yang boleh dianggap sebagai stack resmi proyek.
