# Development Instructions — Risss.clobber

## Status Implementasi
Proyek ini adalah website static frontend yang dapat langsung dijalankan di browser. Tidak ada dependency, package manager, build tool, backend, atau server aplikasi.

## Struktur
- `index.html` — landing page, featured brands, new arrivals, categories, promo, newsletter.
- `shop.html` — katalog dengan search, filter, sort, quick view.
- `product.html?id=...` — detail produk dan validasi ukuran.
- `wishlist.html` — wishlist berbasis localStorage.
- `cart.html` — cart berbasis localStorage, promo, total.
- `checkout.html` — checkout dan pembayaran simulasi.
- `about.html` — brand/project story.
- `css/style.css` — design system dan responsive layout.
- `js/products.js` — 16 data produk demo dan utility data.
- `js/main.js` — navigasi, counter, newsletter, card, modal, storage helpers.
- `js/shop.js`, `product.js`, `wishlist.js`, `cart.js`, `checkout.js` — modul halaman.

## Cara Menjalankan
1. Buka `C:\Users\LENOVO\Documents\standarDev\index.html` langsung di browser, atau gunakan extension **Live Server** pada VS Code.
2. Pastikan folder `image/products/` berisi gambar lokal sesuai ID produk.
3. Tidak perlu `npm install`, build, atau environment variable.

## PostgreSQL dan pgAdmin 4

- PostgreSQL digunakan sebagai database target aplikasi.
- pgAdmin 4 digunakan untuk administrasi database, Query Tool, menjalankan schema, seed, dan inspeksi tabel.
- Buat database `risss_clobber` di pgAdmin 4, lalu jalankan `sql/schema.sql` dan `sql/seed.sql` secara berurutan.
- pgAdmin 4 bukan web server dan browser tidak boleh terhubung langsung ke PostgreSQL.
- Diperlukan backend REST API untuk autentikasi, katalog, stok, pesanan, admin, dan transaksi production.


## Verifikasi Manual
- Search/filter/sort pada `shop.html`.
- Klik quick view dan product detail.
- Pilih ukuran sebelum add cart.
- Wishlist dan cart bertahan setelah reload.
- Promo `FREESHIP` memberi diskon demo Rp100.000.
- Checkout menampilkan nomor order demo dan membersihkan cart.

## Konvensi
- Gunakan semantic HTML dan `data-*` hooks untuk interaksi.
- Jangan memasukkan secret atau data sensitif ke localStorage.
- Harga tetap numerik di data dan diformat melalui `Intl.NumberFormat`.
- Jangan klaim keaslian brand, harga, stok, atau pembayaran.

## Batasan
Backend, database, authentication, payment gateway, admin inventory, order persistence, email, real shipping, deployment, CI/CD, analytics, dan image CDN belum tersedia.



Saat ini belum ada perintah instalasi yang faktual. Setelah stack dipilih, prosedur wajib mencakup:

1. Clone repository.
2. Gunakan versi runtime yang dikunci (misalnya melalui `.nvmrc`, `.tool-versions`, atau mekanisme stack terkait).
3. Instal dependency dari lockfile dengan mode reproducible.
4. Salin `.env.example` menjadi `.env` lokal.
5. Isi konfigurasi lokal tanpa memasukkan secret ke repository.
6. Jalankan migration/seed hanya setelah database dan prosedurnya disetujui.
7. Jalankan validasi, test, dan build.

## 3. Menjalankan Aplikasi Lokal

**Belum tersedia:** script `dev`, `start`, `build`, dan `test` belum ditemukan karena manifest belum ada. Perintah final harus dicatat di sini setelah stack dipilih, termasuk host, port, dependency service, dan cara menghentikan aplikasi.

## 4. Environment dan Database

### Environment yang Disarankan

Gunakan environment terpisah: `development`, `test`, `staging`, dan `production`.

- Commit hanya `.env.example` dengan nama variabel tanpa nilai rahasia.
- Jangan commit `.env`, token, private key, password, atau dump produksi.
- Validasi environment saat aplikasi mulai berjalan.
- Dokumentasikan sumber secret production menggunakan secret manager platform yang dipilih.

### Database

Database dan schema belum tersedia. Sebelum implementasi, tentukan engine, connection string, migration tool, user dengan least privilege, backup, restore test, serta kebijakan data sensitif.

## 5. Struktur Kode dan Penamaan

Struktur aktual belum ada. Baseline yang perlu disepakati:

- Pisahkan presentation/interface, domain/business logic, data access, configuration, dan shared utilities.
- Nama variabel/fungsi harus deskriptif dan mengikuti idiom bahasa final.
- Gunakan `PascalCase` untuk class/type (jika berlaku), `camelCase` untuk variabel/fungsi (jika idiom berlaku), dan `UPPER_SNAKE_CASE` untuk konstanta konfigurasi.
- Hindari fungsi besar, global mutable state, duplikasi, dan komentar yang hanya mengulang kode.
- Public API, keputusan arsitektur, dan perilaku non-obvious harus didokumentasikan.

Konvensi final **Perlu dikonfirmasi** setelah bahasa pemrograman dipilih.

## 6. Coding Standards

- Gunakan formatter dan linter resmi yang dikunci versinya.
- Terapkan format otomatis sebelum commit.
- Perlakukan warning lint dan static analysis sebagai hal yang harus diselesaikan, bukan diabaikan.
- Gunakan dependency lockfile dan review perubahan dependency.
- Setiap fitur harus memiliki test yang sesuai dan dokumentasi perubahan bila berdampak pada pengguna/API.


## 7. Aturan Keamanan

- Validasi dan sanitasi input di server; validasi client hanya pelengkap UX.
- Gunakan query terparameterisasi/ORM aman; jangan membangun query dari input mentah.
- Terapkan autentikasi, otorisasi per resource, rate limiting, timeout, dan security headers sesuai stack.
- Hash password dengan algoritma adaptif; jangan log password, token, PII sensitif, atau connection string.
- Pin/scan dependency, gunakan HTTPS di environment non-lokal, dan batasi izin service account.
- Rotasi secret ketika bocor dan catat insiden sesuai prosedur.

## 8. Testing dan Debugging

Test runner dan suite belum tersedia. Target prosedur setelah implementasi:

1. Unit test untuk fungsi/domain logic.
2. Integration test untuk database dan boundary service.
3. End-to-end test untuk alur MVP yang kritikal.
4. Lint, type check/static analysis, dan build di CI.
5. Gunakan data test sintetis; jangan memakai data produksi tanpa masking dan persetujuan.
6. Saat debugging, reproduksi masalah, baca log terstruktur, isolasi perubahan, tambahkan regression test, lalu verifikasi ulang.

Target coverage dan gate CI perlu dikonfirmasi bersama tim.

## 9. Git dan Pull Request

- Gunakan branch terpisah untuk fitur, perbaikan, dan dokumentasi.
- Commit harus kecil, terfokus, dan menjelaskan tujuan perubahan.
- Jangan commit secret, file build, dependency cache, atau file OS/IDE yang tidak diperlukan.
- Pull request harus menjelaskan konteks, perubahan, test yang dijalankan, risiko, dan kebutuhan migrasi.
- Minimal satu reviewer untuk perubahan kode; perubahan keamanan/infrastruktur memerlukan reviewer yang kompeten.
- Lindungi branch utama dengan status check dan review.

## 10. Deployment

Belum ada target server/cloud atau pipeline aktual. Sebelum deployment, tetapkan:

1. Provider dan environment target.
2. Cara build artifact/image yang reproducible.
3. Registri artifact dan secret management.
4. Migration strategy yang aman dan backward-compatible.
5. Health check, rollback, logging, metrics, alerting, dan backup.
6. Approval untuk production serta runbook insiden.

Deployment production wajib melalui staging/verification dan tidak boleh menggunakan secret development.

## 11. Troubleshooting Awal

| Masalah | Pemeriksaan |
|---|---|
| Runtime tidak ditemukan | Pastikan versi runtime yang disetujui terpasang dan PATH benar. |
| Dependency gagal dipasang | Periksa versi runtime, lockfile, koneksi registry, dan jangan menghapus lockfile sembarangan. |
| Aplikasi gagal start | Periksa environment wajib, port, log aplikasi, dan service dependency. |
| Database tidak terhubung | Periksa engine aktif, host/port, kredensial lokal, izin, dan status migration. |
| Test gagal | Jalankan test terisolasi, baca stack trace, periksa fixture, lalu buat regression test. |
| Secret terlanjur ter-commit | Cabut/rotasi secret segera, bersihkan riwayat sesuai prosedur, dan laporkan insiden. |

## 12. Informasi yang Perlu Dikonfirmasi

- Domain dan tujuan aplikasi.
- Bahasa, framework, library, dan versi.
- Database serta schema/migration tool.
- Platform repository, server/cloud, dan CI/CD.
- Perintah install, run, test, build, dan deploy.
- Owner aplikasi, reviewer, SLA, backup, monitoring, serta prosedur incident response.


