# 💚 Dompet — Budgeting Pribadi

Aplikasi pencatat keuangan & anggaran per kategori yang bisa dipakai di **HP (Android/iOS)**, **browser**, dan **desktop Windows** — lengkap dengan *Dynamic Island* ala NUSA di atas layar.

> Contoh: batas **Bensin** Rp300.000 → keluar Rp30.000 untuk bensin → yang berkurang hanya anggaran Bensin, sisa **Rp270.000**. Kategori lain tidak tersentuh.

## ✨ Fitur

- **Catat transaksi** pemasukan & pengeluaran — edit/hapus dengan sekali klik
- **Anggaran per kategori** dengan bar sisa (hijau → kuning 80% → merah saat lewat)
- **Ringkasan bulanan**: saldo, pemasukan, pengeluaran, pengeluaran per kategori; pindah bulan ‹ ›
- **Kategori kustom** lengkap dengan emoji
- **Sinkron online** (Supabase) — login email & password, data sama di HP dan laptop
- **Offline-first** — tetap jalan tanpa internet, sinkron saat online lagi
- **Ekspor / impor backup** `.json`
- **PWA** — bisa di-install ke layar utama HP
- **Tampilan desktop** dengan sidebar & animasi halus

### 🏝️ Desktop: Dynamic Island

| Aksi | Cara |
|---|---|
| Lihat saldo & sisa anggaran | Arahkan kursor ke kapsul **Dompet** di atas layar |
| Catat cepat | Klik **+ Catat** atau tekan **Ctrl+Alt+D** · Enter simpan · Esc tutup |
| Buka aplikasi lengkap | Tombol **↗** di island, atau klik ikon tray |
| Keluar | **Ctrl+Alt+Q**, tombol **⏻** di island, klik kanan island → Keluar, atau tray → Keluar |
| Jalan otomatis saat Windows menyala | Klik kanan ikon tray → centang opsinya |

## 🚀 Cara pakai

### Di HP / browser
Buka web app-nya (GitHub Pages), lalu:
- **Android (Chrome):** menu ⋮ → *Instal aplikasi*
- **iPhone (Safari):** Share → *Add to Home Screen*

### Di Windows
Install dari `Dompet Setup 1.0.0.exe` (hasil build, lihat di bawah). Jika muncul peringatan SmartScreen: *More info → Run anyway*.

### Sinkron antar perangkat
Menu **Atur → Akun & Sinkron** → **Daftar** (konfirmasi lewat email) → **Masuk** dengan akun yang sama di semua perangkat.

## 🛠️ Pengembangan

```bash
npm install
npm run desktop   # jalankan versi desktop (Electron)
npm run dist      # build installer Windows ke folder dist/
```

Versi web cukup dibuka lewat `index.html` atau di-host sebagai situs statis.

### Struktur

```
index.html        aplikasi utama (web/PWA + jendela desktop)
island.html       Dynamic Island desktop
manifest.json     konfigurasi PWA
sw.js             service worker (offline)
desktop/main.js   proses utama Electron (island, tray, shortcut)
desktop/preload.js jembatan island ↔ Electron
```

### Teknologi
HTML/CSS/JS murni · [Supabase](https://supabase.com) (Auth + Postgres dengan Row Level Security) · [Electron](https://electronjs.org) + electron-builder

## 🔒 Privasi
Setiap akun hanya bisa membaca & mengubah datanya sendiri (RLS di database). Tanpa login, data hanya tersimpan di perangkat.

---
Dibuat oleh **Naufal Ghani**
