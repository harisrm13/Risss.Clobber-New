# Product Requirement Document (PRD) — Risss.clobber

> **Status Dokumen:** Approved Baseline v1.0  
> **Status Implementasi:** Frontend Prototype Lengkap (Static HTML5/CSS3/Vanilla JS)  
> **Lokasi Proyek:** `C:\Users\LENOVO\Documents\standarDev`  
> **Tanggal Pembaruan:** 20 Oktober 2026  
> **Peran Penyusun:** Senior Frontend Developer, UI/UX Designer & Software Engineer  

---

## 1. Latar Belakang dan Visi Proyek

### 1.1 Latar Belakang
Fashion casual dan subkultur streetwear modern (terracewear & utilitarian fashion) menuntut pengalaman belanja digital yang minimalis, cepat, dan berfokus pada produk berkarakter kuat tanpa distraksi visual berlebihan. Toko online konvensional kerap terlalu padat dan lambat. Proyek **Risss.clobber** hadir sebagai curated e-commerce prototype yang menyajikan kurasi merek premium streetwear: **Stone Island**, **C.P. Company**, **Adidas**, dan **Ellesse**.

### 1.2 Visi Produk
Menjadi etalase digital fashion casual terdepan yang memadukan estetika premium, navigasi efisien, dan performa instan tanpa ketergantungan library pihak ketiga yang memberatkan browser pengguna.

---

## 2. Target Pengguna

| Persona | Karakteristik | Kebutuhan Utama pada Aplikasi |
| :--- | :--- | :--- |
| **Streetwear & Casual Enthusiast** | Penggemar brand terkurasi (Stone Island, C.P. Company, dsb.) | Foto resolusi tinggi, detail potongan/material, navigasi cepat, simpan wishlist. |
| **Shopper Mobile-First** | Pengguna ponsel pintar yang mengakses via browser mobile | Antarmuka bersih, tombol sentuh ergonomis, filter instan, alur checkout ringkas. |
| **Product & Quality Reviewer** | Penilai kualitas tampilan prototipe UI/UX | Responsivitas tampilan, konsistensi token warna, validasi formulir yang tepat. |

---

## 3. Fitur Utama dan Kebutuhan Fungsional

| Modul | Deskripsi Fungsional | Status Implementasi |
| :--- | :--- | :--- |
| **Catalog & Filtering** | Filter menurut Brand (4 brand), Kategori (6 kategori), Slider rentang harga, Sort (Terbaru, Harga rendah-tinggi, tinggi-rendah), serta live search. | **Terimplementasi** |
| **Quick View Modal** | Modal pop-up instan untuk meninjau informasi ringkas produk tanpa berpindah halaman. | **Terimplementasi** |
| **Product Detail** | Galeri thumbnail interaktif, pemilihan ukuran wajib sebelum add to cart, color swatch, quantity stepper, buy now CTA. | **Terimplementasi** |
| **Shopping Cart** | Keranjang belanja berbasis `localStorage`, penyesuaian kuantitas, hapus item, validasi promo code (`FREESHIP`), kalkulasi otomatis subtotal & total. | **Terimplementasi** |
| **Wishlist** | Penambahan/penghapusan produk favorit dengan sinkronisasi badge counter realtime dan penyimpanan `localStorage`. | **Terimplementasi** |
| **Simulated Checkout** | Formulir validasi data pemesan, opsi kurir, simulasi metode pembayaran, dan modal konfirmasi dengan ID pesanan demo unik. | **Terimplementasi** |

---

## 4. Kebutuhan Nonfungsional (NFR)

1. **Performa:** Waktu render instan tanpa jeda rendering bundler (Zero-bundle overhead, native HTML5 & CSS3).
2. **Kompatibilitas:** Berjalan mulus di Google Chrome, Mozilla Firefox, Microsoft Edge, dan Safari.
3. **Penyimpanan Lokal Aman:** State cart dan wishlist dikelola melalui `localStorage` dengan penanganan fallback jika data rusak (`try-catch safe parsing`).
4. **Aksesibilitas (a11y):** Dukungan keyboard navigation, atribut `aria-label`, kontras warna WCAG AA, serta `prefers-reduced-motion`.

---

## 5. Batasan & Status Informasi

- **Keaslian Barang & Transaksi:** Seluruh produk, harga, nomor pesanan, dan metode pembayaran adalah **data demonstrasi (demo prototype)**. Tidak ada penagihan uang nyata.
- **Fitur Backend yang Memerlukan Pengembangan Lanjutan:** Otentikasi database pengguna server, webhook payment gateway nyata (Midtrans/Xendit), integrasi resi API kurir riil (JNE/SiCepat), dan manajemen stok multi-gudang.



## 4. Target Pengguna (User Persona)

| Persona | Peran / Karakteristik | Kebutuhan Utama | Status |
| :--- | :--- | :--- | :--- |
| **End User (Pengguna Akhir)** | Pengguna umum yang berinteraksi dengan antarmuka aplikasi untuk menyelesaikan tugas harian. | Antarmuka intuitif, performa cepat, data terlindungi. | *Perlu dikonfirmasi* |
| **Administrator Sistem** | Pengguna internal pengelola operasional, hak akses, dan manajemen data master. | Panel admin yang terstruktur, audit log aktivitas, keamanan data tingkat tinggi. | *Perlu dikonfirmasi* |
| **Development & DevOps Engineer** | Tim teknis yang membangun, memelihara, dan merilis aplikasi. | Repositori rapi, konfigurasi environment jelas, alur CI/CD otomatis, dokumentasi lengkap. | *Terdokumentasi* |

---

## 5. Tujuan dan Manfaat Aplikasi

### 5.1 Tujuan Produk
- Membangun aplikasi dengan arsitektur modular yang siap dikembangkan secara berkelanjutan.
- Menjamin stabilitas sistem dengan *uptime* target minimal 99,5% pada lingkungan produksi.
- Menerapkan siklus pengembangan berbasis *continuous integration* dan *continuous deployment* (CI/CD).

### 5.2 Manfaat Produk
- **Bagi Pengguna:** Memperoleh sistem digital yang andal, aman, responsif di berbagai perangkat, serta mudah digunakan.
- **Bagi Bisnis/Organisasi:** Efisiensi operasional, transparansi proses, serta kemudahan integrasi dengan sistem lain di masa depan.
- **Bagi Tim Teknis:** Kecepatan *onboarding* anggota tim baru dan kemudahan *debugging* serta pemeliharaan kode.


---

## 6. Kebutuhan Fungsional dan Fitur Utama

Karena saat ini kode sumber aplikasi belum diimplementasikan, rincian fitur diklasifikasikan ke dalam kategori modul rencana yang wajib dikonfirmasi:

| ID Modul | Nama Fitur / Modul | Deskripsi Kebutuhan | Status Implementasi |
| :--- | :--- | :--- | :--- |
| **MOD-01** | **Autentikasi & Otorisasi** | Pendaftaran pengguna, login akun, pengelolaan sesi/token, verifikasi kata sandi, dan Role-Based Access Control (RBAC). | *Belum diimplementasikan* |
| **MOD-02** | **Manajemen Profil Pengguna** | Pembaruan informasi profil, pengaturan preferensi, dan pengubahan kata sandi. | *Belum diimplementasikan* |
| **MOD-03** | **Modul Bisnis Inti (Core Engine)** | Logika bisnis utama sistem (menyesuaikan domain aplikasi final yang disepakati). | *Perlu dikonfirmasi* |
| **MOD-04** | **Dashboard & Pelaporan** | Visualisasi data aktivitas, ringkasan transaksi/metrik, dan ekspor laporan. | *Belum diimplementasikan* |
| **MOD-05** | **Manajemen Audit Log** | Pencatatan otomatis riwayat aksi kritikal pengguna untuk kepentingan keamanan dan audit jejak digital. | *Belum diimplementasikan* |

---

## 7. Kebutuhan Nonfungsional (NFR)

### 7.1 Keamanan (*Security*)
- Menerapkan proteksi terhadap kerentanan OWASP Top 10 (seperti SQL Injection, XSS, CSRF, dan Broken Access Control).
- Penyimpanan kata sandi wajib di-*hash* menggunakan algoritma kuat (misal Argon2id atau bcrypt dengan cost factor yang memadai).
- Komunikasi jaringan wajib menggunakan protokol HTTPS/TLS 1.3 pada lingkungan *staging* dan *production*.
- Pengelolaan kunci rahasia (*secret keys*) dan kredensial basis data wajib melalui variabel lingkungan (*environment variables*), dilarang keras melakukan *hardcoding* di dalam kode sumber.

### 7.2 Performa (*Performance*)
- Waktu respon rata-rata API backend maksimal $\le 300\text{ ms}$ untuk *endpoint* pembacaan standar pada beban normal.
- Waktu muat halaman pertama antarmuka (*First Contentful Paint* / FCP) diusahakan $\le 1{,}5\text{ detik}$.
- Kemampuan penanganan konkurensi minimal disesuaikan dengan kapasitas server yang ditentukan.

### 7.3 Ketersediaan & Keandalan (*Availability & Reliability*)
- Target ketersediaan layanan (*uptime SLA*): minimal 99,5%.
- Mekanisme pencadangan (*backup*) basis data otomatis terjadwal secara periodik dengan *recovery point objective* (RPO) $\le 24\text{ jam}$.

### 7.4 Kemudahan Penggunaan & Aksesibilitas (*Usability & Accessibility*)
- Desain antarmuka berprinsip responsif (*mobile-first* / adaptif untuk desktop, tablet, dan ponsel pintar).
- Mematuhi pedoman aksesibilitas dasar Web Content Accessibility Guidelines (WCAG) 2.1 Tingkat AA.

---

## 8. Minimum Viable Product (MVP)

Ruang lingkup MVP difokuskan untuk memvalidasi fungsi esensial sistem sebelum penambahan modul tingkat lanjut:

1. **Sprint MVP 1 — Pondasi & Otentikasi:**
   - Inisialisasi arsitektur dasar proyek dan konfigurasi dependensi.
   - Fitur registrasi pengguna baru, login, dan logout dengan validasi formulir standar.
   - Halaman pendaratan (*landing/login page*) yang bersih dan responsif.
2. **Sprint MVP 2 — Fitur Inti Tunggal & Dashboard Dasar:**
   - Implementasi operasi Create, Read, Update, Delete (CRUD) untuk satu entitas data bisnis utama.
   - Dashboard ringkas untuk menampilkan daftar data tersebut.
3. **Sprint MVP 3 — Validasi & Penanganan Error Terpadu:**
   - Penanganan error terpusat dengan pesan error yang ramah pengguna.
   - Pengujian unit (*unit testing*) untuk alur bisnis utama.

---

## 9. User Stories dan Kriteria Penerimaan (Acceptance Criteria)

### US-01: Autentikasi Pengguna
- **Sebagai** pengguna terdaftar,
- **Saya ingin** dapat masuk ke dalam sistem menggunakan kredensial yang valid,
- **Agar** saya dapat mengakses fitur dan data pribadi saya dengan aman.

**Kriteria Penerimaan:**
1. Pengguna memasukkan identitas (email/username) dan kata sandi yang valid.
2. Sistem memvalidasi kredensial dan menerbitkan sesi/token otentikasi aman.
3. Jika kredensial salah, sistem menampilkan pesan error netral *"Kredensial tidak valid"* tanpa membocorkan apakah akun terdaftar atau tidak.
4. Input kata sandi tersembunyi (*masked*) secara default.

### US-02: Navigasi Antarmuka yang Responsif
- **Sebagai** pengguna dari perangkat ponsel atau desktop,
- **Saya ingin** tampilan antarmuka menyesuaikan resolusi layar secara otomatis,
- **Agar** saya dapat mengoperasikan aplikasi secara nyaman tanpa elemen visual yang terpotong.

**Kriteria Penerimaan:**
1. Antarmuka tidak mengalami *horizontal scrolling* tak diinginkan pada resolusi mobile (360px - 480px).
2. Menu navigasi berubah menjadi menu navigasi adaptif (*hamburger menu* atau *bottom navigation*) pada resolusi layar sempit.
3. Seluruh tombol memiliki area sentuh minimal $44 \times 44\text{ px}$.

---

## 10. Metrik Pengukuran Keberhasilan Produk (KPI)

| Metrik | Indikator Keberhasilan | Target | Status Pengukuran |
| :--- | :--- | :--- | :--- |
| **Kestabilan Rilis** | Jumlah insiden kritis (*blocking bug*) di lingkungan produksi | 0 insiden pada rilis MVP | *Belum diimplementasikan* |
| **Adopsi Pengguna** | Tingkat keberhasilan pendaftaran dan login mandiri | $\ge 95\%$ tanpa bantuan teknis | *Perlu dikonfirmasi* |
| **Kinerja Sistem** | Waktu respon rata-rata HTTP request | $< 300\text{ ms}$ | *Belum diimplementasikan* |
| **Cakupan Pengujian** | Cakupan pengujian unit (*Code Coverage*) modul inti | Minimal 80% pada logika bisnis | *Belum diimplementasikan* |

---

## 11. Catatan dan Langkah Lanjutan

1. Konfirmasi domain bisnis utama dan tujuan aplikasi bersama Product Owner.
2. Setelah domain bisnis disepakati, perbarui bagian kebutuhan fungsional dan model data pada dokumen ini.
3. Lakukan penyesuaian MVP dan sprint backlog sebelum memulai penulisan kode sumber.


