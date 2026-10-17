# WorkBranch • Dev & Collaboration Suite

Platform terpadu untuk tim developer yang menggabungkan manajemen tugas sprint (**TaskFlow**), repositori kode & PR review (**CodeHub**), serta obrolan tim terorganisir (**TeamSync**) dalam satu workspace modern berbasis Next.js App Router & TypeScript.

> [!NOTE]
> - Panduan standar penamaan dan arsitektur fitur: **[ketetapan.md](file:///d:/WorkBranch/dev-hub/ketetapan.md)**.
> - Panduan langkah instalasi dan cara menjalankan aplikasi: **[panduan_instalasi.md](file:///d:/WorkBranch/dev-hub/panduan_instalasi.md)**.

---

## 🚀 Fitur Utama

- **📋 TaskFlow**: Papan Kanban 4 kolom interaktif, filter prioritas (Mendesak, Tinggi, Sedang, Rendah), checklist sprint, dan alur kerja tugas tim.
- **💻 CodeHub**: Pelacak branch, integrasi PR & issue, cuplikan diff kode (inspector), pipeline status (Open, In Review, Merged).
- **💬 TeamSync**: Obrolan tim instan berbasis channel (`#umum-pengumuman`, `#diskusi-taskflow`, `#review-kode-codehub`), presensi anggota online, dan reaksi emoji.
- **⚡ Smart Task Routing**: Otomatis mendistribusikan task yang dibuat melalui modal `+ New Task` ke TaskFlow atau CodeHub.
- **🎨 WorkBranch Purple Theme**: Palet warna ungu modern (`#8c57ff`), kartu rounded dengan bayangan halus, dan dukungan penuh Light/Dark mode.
- **🔙 Navigasi Browser Alami**: Rute terpisah antara Landing Page (`/`) dan Dashboard (`/dashboard`) sehingga tombol kembali (*back button* `←`) pada browser berfungsi mulus.

---

## 🛠️ Menjalankan Proyek Secara Lokal

1. **Jalankan development server**:
   ```bash
   npm run dev
   ```

2. **Buka di browser**:
   Akses [http://localhost:3000](http://localhost:3000) untuk melihat Landing Page dan [http://localhost:3000/dashboard](http://localhost:3000/dashboard) untuk masuk langsung ke workspace.

3. **Verifikasi Build**:
   ```bash
   npm run build
   ```
