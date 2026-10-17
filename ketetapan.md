# Ketetapan & Standar Pengembangan Platform (Ketetapan.md)

Dokumen ini merupakan **sumber kebenaran tunggal (*Single Source of Truth*)** bagi seluruh anggota tim dan AI assistant dalam pengembangan website **WorkBranch (Dev & Collaboration Suite)**. Seluruh penamaan, struktur fitur, estetika desain, dan aturan bahasa wajib mematuhi ketetapan di bawah ini secara konsisten.

---

## 1. Identitas & Visi Produk

Website ini adalah platform kolaborasi *all-in-one* khusus tim pengembang perangkat lunak (*developer teams*). Platform ini menyatukan tiga kebutuhan krusial dalam satu jendela tanpa perlu berpindah-pindah aplikasi (*zero context switching*):
1. **Manajemen Tugas & Sprint**
2. **Pengelolaan Kode & Pull Request**
3. **Komunikasi & Pesan Instan Tim**

---

## 2. Ketetapan Penamaan Fitur Resmi (Pilar Utama)

> [!IMPORTANT]
> **DILARANG** menggunakan nama merek aplikasi komersial pihak ketiga (seperti *ClickUp*, *GitHub*, *Discord*) di seluruh tampilan antarmuka (UI), kode komponen, maupun materi publikasi. Gunakan selalu nama fitur resmi kita:

### 1. TaskFlow *(Pilar 1 - Manajemen Tugas)*
- **Fungsi**: Pelacakan tugas harian, manajemen backlog, dan sprint tim.
- **Komponen Utama**:
  - Papan Kanban 4 kolom: *Belum Dikerjakan (To Do)*, *Sedang Dikerjakan (In Progress)*, *Dalam Peninjauan (Review)*, *Selesai (Done)*.
  - Tampilan Tabel / List View alternatif.
  - Filter tingkat prioritas: *Mendesak (Urgent)*, *Tinggi (High)*, *Sedang (Medium)*, *Rendah (Low)*.
  - Sub-task checklist dan pelacak tanggal tenggat (*Due Date*).
- **Label UI**: `TaskFlow`, `Papan Tugas TaskFlow`, `TaskFlow (Papan Tugas)`.

### 2. CodeHub *(Pilar 2 - Repositori & Kode)*
- **Fungsi**: Integrasi alur kerja kode tim, cabang (*branch*), dan peninjauan kode (*code review*).
- **Komponen Utama**:
  - Ringkasan repositori tim (nama repo, status visibilitas publik/privat).
  - Manajemen Pull Request (PR) dan issue.
  - Penampil cuplikan perubahan kode (*Diff Inspector accordion*).
  - Pipeline status: *Issue Terbuka*, *PR Terbuka*, *Sedang Direview*, *Berhasil Digabung (Merged)*.
  - Penugasan developer reviewer dan perhitungan penambahan/penghapusan baris (`+` / `-`).
- **Label UI**: `CodeHub`, `Pusat Kode CodeHub`, `CodeHub (Kode & PR)`.

### 3. TeamSync *(Pilar 3 - Obrolan Tim)*
- **Fungsi**: Ruang komunikasi pesan instan tim yang terisolasi dan terorganisir.
- **Komponen Utama**:
  - Saluran teks (*Channels*), seperti `#umum-pengumuman`, `#diskusi-taskflow`, `#review-kode-codehub`, `#santai-ngobrol`.
  - Indikator kehadiran anggota tim (*Online*, *Idle*, *Offline*).
  - Reaksi pesan instan menggunakan emoji (🚀, 🔥, 👍, 🎉, ⚡, ❤️).
  - Kolom input pesan cepat terhubung langsung ke anggota tim yang aktif.
- **Label UI**: `TeamSync`, `Obrolan Tim TeamSync`, `TeamSync (Obrolan Tim)`.

---

## 3. Ketetapan Bahasa (Language Guidelines)

Untuk menjaga standar profesionalisme tampilan:

1. **Sidebar Navigasi Kiri & Header Atas**:
   - Wajib menggunakan label standar industri dalam **Bahasa Inggris**:
     - *Dashboards*
     - *TaskFlow* (sublabel: *Task Management*)
     - *CodeHub* (sublabel: *Code & Repos*)
     - *TeamSync* (sublabel: *Team Chat & Channels*)
     - *Core Workspace*
     - *Apps & Pages*
     - *New Task*
     - *Landing Page*
     - *Upgrade to Pro*
2. **Konten Halaman Utama, Formulir, & Modal**:
   - Wajib dominan menggunakan **Bahasa Indonesia** yang komunikatif, profesional, dan mudah dipahami:
     - Deskripsi tugas, pesan toast notifikasi, status kolom Kanban, panduan alur, serta teks informasi di Landing Page.

---

## 4. Ketetapan Alur & Navigasi Halaman

1. **Struktur Rute (Next.js App Router)**:
   - `/` &rarr; Halaman **Landing Page / Welcome** yang dapat di-scroll ke bawah, berisi pengenalan platform, cuplikan mockup fitur interaktif, perbandingan, dan tombol CTA utama: *"Get Started. It's FREE"*.
   - `/dashboard` &rarr; Halaman **Workspace Utama** yang memuat Sidebar WorkBranch, Header pencarian & notifikasi, serta view dinamis (*Dashboard*, *TaskFlow*, *CodeHub*, *TeamSync*).
2. **Kepatuhan Tombol Back Browser (`←`)**:
   - Navigasi antara `/` dan `/dashboard` wajib menggunakan *URL push* resmi (`<Link href="...">` atau `router.push(...)`).
   - Tombol **Kembali (`←`) pada browser** wajib dapat mengembalikan pengguna dari Dashboard kembali ke Landing Page tanpa error.
3. **Alur Pintar Pembuatan Tugas (*Smart Task Routing*)**:
   - Saat pengguna menekan tombol `+ New Task` / `Create Task`, modal menyediakan pilihan tujuan:
     - Memilih **Tugas TaskFlow** &rarr; Tugas otomatis masuk ke papan Kanban TaskFlow.
     - Memilih **Tugas Kode CodeHub** &rarr; Tugas otomatis masuk ke repository CodeHub lengkap dengan nomor PR dan branch.

---

## 5. Ketetapan Desain & Estetika (WorkBranch Purple Theme)

1. **Palet Warna Utama**:
   - Warna Primer (*Brand Purple*): `#8c57ff` (gradient: `#8c57ff` ke `#7e4ee6`).
   - Warna Latar Terang: `#f4f5fa` (aplikasi), `#ffffff` (kartu/konten).
   - Warna Latar Gelap (*Dark Mode*): `#28243d` (aplikasi), `#312d4b` (kartu/konten).
   - Warna Semantik:
     - Sukses / Merged / Online: `#56ca00`
     - Peringatan / Review / Sedang: `#ffb400`
     - Bahaya / Urgent: `#ff4c51`
     - Info / Branch: `#16b1ff`
2. **Gaya Komponen**:
   - Sudut kartu (*Border Radius*): `10px` - `16px`.
   - Bayangan kartu (*Shadow*): Halus dan elegan (`0 4px 18px rgba(0, 0, 0, 0.08)`).
   - Mode Gelap / Terang: Mendukung toggle dinamis dengan persistensi tema.

---

## 6. Ketetapan Data & State

1. **State Terpusat**: Seluruh data tim, task, channel, dan pesan dikelola melalui `AppContext` (`src/context/AppContext.tsx`).
2. **Persistensi Lokal**: Data disimpan di `localStorage` peramban pengguna agar penambahan tim, pembuatan task, dan obrolan tidak ter-reset saat pengguna me-refresh atau kembali ke Landing Page.
