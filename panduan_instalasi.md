# Panduan Lengkap Instalasi & Menjalankan Proyek WorkBranch

Panduan ini ditujukan bagi siapa saja (anggota tim, penguji, atau pengembang baru) yang ingin memasang dan menjalankan proyek **WorkBranch** di komputer lokal dari awal sampai website bisa dibuka dan digunakan di browser.

---

## 📋 Daftar Isi
1. [Prasyarat Sistem (System Requirements)](#1-prasyarat-sistem-system-requirements)
2. [Langkah 1: Mengunduh / Clone Proyek](#langkah-1-mengunduh--clone-proyek)
3. [Langkah 2: Membuka Terminal & Masuk ke Folder Proyek](#langkah-2-membuka-terminal--masuk-ke-folder-proyek)
4. [Langkah 3: Menginstal Seluruh Dependensi (Dependencies)](#langkah-3-menginstal-seluruh-dependensi-dependencies)
5. [Langkah 4: Menjalankan Server Development](#langkah-4-menjalankan-server-development)
6. [Langkah 5: Mengakses Website di Browser](#langkah-5-mengakses-website-di-browser)
7. [Perintah Tambahan (Build & Production)](#perintah-tambahan-build--production)
8. [Solusi Masalah Umum (Troubleshooting)](#solusi-masalah-umum-troubleshooting)

---

## 1. Prasyarat Sistem (System Requirements)

Sebelum memulai, pastikan komputer Anda telah terpasang software berikut:

### A. Node.js (Wajib)
- **Versi yang disarankan**: Node.js **v18.17.0+** atau versi **LTS terbaru (v20+)**.
- **Cara Cek di Terminal**:
  ```bash
  node -v
  npm -v
  ```
  *(Jika belum terpasang atau versi terlalu rendah, unduh dari situs resmi: [nodejs.org](https://nodejs.org/)).*

### B. Git (Opsional tapi Direkomendasikan)
- Digunakan untuk clone repository dari GitHub.
- **Cara Cek**:
  ```bash
  git --version
  ```
  *(Jika belum ada, unduh dari: [git-scm.com](https://git-scm.com/)).*

---

## Langkah 1: Mengunduh / Clone Proyek

Pilih salah satu cara berikut untuk mendapatkan file proyek:

### Opsi A: Menggunakan Git Clone (Direkomendasikan)
Buka Command Prompt / PowerShell / Terminal, lalu jalankan:
```bash
git clone https://github.com/username-anda/workbranch.git
```
*(Ganti URL dengan link repository GitHub proyek Anda).*

### Opsi B: Unduh File ZIP Manual dari GitHub
1. Buka halaman repository di GitHub.
2. Klik tombol hijau **`<> Code`**.
3. Pilih **Download ZIP**.
4. Ekstrak file ZIP tersebut ke folder kerja di komputer Anda (misalnya di drive `D:\WorkBranch\dev-hub`).

---

## Langkah 2: Membuka Terminal & Masuk ke Folder Proyek

Buka terminal (bisa melalui VS Code atau terminal bawaan Windows/Mac), lalu arahkan ke lokasi folder proyek:

```bash
cd dev-hub
```
*(Pastikan Anda berada di direktori yang berisi file `package.json`).*

---

## Langkah 3: Menginstal Seluruh Dependensi (Dependencies)

Jalankan perintah instalasi berikut untuk mengunduh semua paket yang dibutuhkan aplikasi:

```bash
npm install
```

### 📦 Apa Saja yang Diinstal oleh Perintah Ini?
Sistem akan membaca file `package.json` dan secara otomatis menginstal paket-paket resmi berikut ke dalam folder `node_modules/`:
1. **Next.js (`next@16.x`)**: Framework React modern untuk routing cepat, SSR, dan App Router.
2. **React & React DOM (`react@19.x`)**: Library UI untuk membangun antarmuka komponen yang dinamis dan responsif.
3. **Lucide React (`lucide-react`)**: Kumpulan ikon modern beresolusi tinggi (ikon papan Kanban, PR Git, saluran chat, search bar, dll).
4. **TypeScript & Type Definitions**: Pengendali tipe data statis agar kode aman dan terhindar dari bug runtime.
5. **ESLint**: Alat analisis kode untuk menjaga kerapian penulisan skrip.

> [!NOTE]
> Proses instalasi memerlukan koneksi internet aktif. Tunggu hingga terminal menampilkan pesan sukses (biasanya sekitar 1–2 menit).

---

## Langkah 4: Menjalankan Server Development

Setelah semua dependensi terinstal, jalankan server lokal dengan perintah:

```bash
npm run dev
```

Output di terminal akan tampak seperti ini:
```text
▲ Next.js 16.4.2 (Turbopack)
- Local:        http://localhost:3000
- Environments: .env
✓ Starting...
✓ Ready in 1.8s
```

---

## Langkah 5: Mengakses Website di Browser

Buka peramban web (Google Chrome, Microsoft Edge, atau Mozilla Firefox), kemudian buka URL berikut:

1. **Halaman Welcome / Landing Page**:
   ```text
   http://localhost:3000
   ```
   *Di sini Anda dapat melihat pengenalan fitur, review ringkasan, cuplikan interaktif, dan tombol CTA utama.*

2. **Halaman Workspace Dashboard**:
   ```text
   http://localhost:3000/dashboard
   ```
   *Masuk langsung ke ruang kerja tim yang memuat modul **TaskFlow**, **CodeHub**, dan **TeamSync**.*

---

## Perintah Tambahan (Build & Production)

| Perintah | Deskripsi |
| :--- | :--- |
| `npm run dev` | Menjalankan aplikasi dalam mode pengembangan (*hot reload aktif saat kode diedit*). |
| `npm run build` | Melakukan kompilasi produksi yang dioptimalkan serta memeriksa kesalahan TypeScript. |
| `npm run start` | Menjalankan server dalam mode produksi setelah perintah `build` selesai. |
| `npm run lint` | Menjalankan pengecekan format dan sintaks kode menggunakan ESLint. |

---

## Solusi Masalah Umum (Troubleshooting)

### 1. Port 3000 Sudah Terpakai (`Port 3000 is in use`)
- **Penyebab**: Ada aplikasi lain atau sesi server sebelumnya yang masih aktif.
- **Solusi**: Next.js akan secara otomatis menawarkan port alternatif (misalnya `http://localhost:3001`). Perhatikan link yang tercantum di terminal.

### 2. Terjadi Error saat `npm install`
- **Solusi**: Bersihkan cache npm terlebih dahulu, lalu coba lagi:
  ```bash
  npm cache clean --force
  npm install
  ```

### 3. Halaman Terlihat Kosong / Data Tidak Berubah
- **Solusi**: Lakukan hard-refresh di browser dengan menekan kombinasi tombol:
  - Windows: `Ctrl + F5` atau `Ctrl + Shift + R`
  - Mac: `Cmd + Shift + R`

---

## 📌 Ringkasan Singkat Perintah Cepat

```bash
# 1. Masuk folder proyek
cd dev-hub

# 2. Instal dependensi
npm install

# 3. Jalankan aplikasi
npm run dev

# 4. Buka di browser
# http://localhost:3000
```
