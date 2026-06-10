Kamu adalah UI/UX designer. Buatkan wireframe halaman form buat sesi flash sale untuk admin internal platform eCommerce Indonesia bernama Jakmall.com.

=== DESIGN SYSTEM (WAJIB DIIKUTI, JANGAN DIUBAH) ===
- Font: Inter, 14px base
- Warna primary/aksen: #D44000 (oranye-merah Jakmall)
- Background halaman: #F5F5F5
- Background card/panel: #FFFFFF
- Border: 1px solid #E0E0E0, border-radius 8px (card), 6px (input/button)
- Sidebar width: 220px, background #FAFAFA, border-right 1px solid #E0E0E0
- Sidebar logo: teks "Jakmall Admin", warna merah #D44000
- Nav item aktif: background #FFF3EF, teks #D44000, border-left 3px solid #D44000
- Topbar: tinggi 56px, background #FFFFFF, border-bottom 1px solid #E0E0E0
- Tombol primary: background #D44000, teks putih, padding 8px 16px
- Tombol secondary: background #FFFFFF, border 1px solid #D0D0D0, teks #333333
- Badge Active: background #EAF3DE, teks #3B6D11
- Badge Scheduled: background #F1F1F1, teks #5F5E5A
- Badge Draft: background #FFF3CD, teks #7A5800
- Badge Ended: background #FCEBEB, teks #A32D2D
- Format mata uang: Rp 99.000 (titik sebagai pemisah ribuan, tanpa desimal)
- Format tanggal: DD MMM YYYY (contoh: 10 Jun 2026)
- Format jam: HH.mm WIB (contoh: 10.00 WIB)
- Bahasa antarmuka: Bahasa Indonesia
- Produk yang digunakan sebagai data contoh: produk umum eCommerce Indonesia (fashion, elektronik, kebutuhan rumah, makanan & minuman, kecantikan)
=== END DESIGN SYSTEM ===

=== HALAMAN 2: FORM BUAT SESI FLASH SALE (3-STEP WIZARD) ===

Buat TIGA frame/screen terpisah dalam satu file yang merepresentasikan step 1, step 2, dan step 3 dari wizard yang sama.

Layout semua step:
- Sidebar kiri (sama seperti design system, menu Flash Sale aktif)
- Topbar: breadcrumb "Beranda > Flash Sale > Buat Sesi Baru"
- Konten utama: stepper di bagian atas, form di bawahnya

STEPPER (tampil di semua step):
- Step 1: "Jadwal Sesi" | Step 2: "Input Produk" | Step 3: "Preview & Konfirmasi"
- Step aktif: lingkaran oranye #D44000 dengan nomor putih, teks bold
- Step selesai (done): lingkaran hijau #1D9E75 dengan ikon centang, teks abu-abu
- Step belum dikerjakan: lingkaran abu-abu outline, teks abu-abu redup
- Antar-step dihubungkan dengan garis horizontal; garis berwarna hijau jika step sebelumnya sudah done

---

SCREEN A — STEP 1: JADWAL SESI (step 1 aktif, step 2 & 3 pending)

Form fields dalam satu card putih:
- Nama Sesi* — text input, placeholder: "Contoh: Flash Sale Gadget Akhir Pekan", karakter counter "0/100"
- Tanggal Mulai* — date picker, nilai contoh: 12/06/2026
- Jam Mulai* — time picker, nilai contoh: 10.00 WIB
- Tanggal Berakhir* — date picker, nilai contoh: 12/06/2026
- Jam Berakhir* — time picker, nilai contoh: 12.00 WIB
- Durasi Sesi — read-only field (auto-hitung), nilai: "2 jam 0 menit"

Tunjukkan 1 contoh validasi error inline:
- Di bawah field Jam Berakhir: teks merah kecil "Waktu berakhir harus setelah waktu mulai"

Tunjukkan 1 contoh warning overlap:
- Banner kuning di bawah form: ikon warning + teks "Jadwal ini bertabrakan dengan sesi 'Flash Sale Fashion Siang' (10 Jun 2026, 14.00–16.00 WIB). Pilih slot waktu lain atau lanjutkan jika berbeda."

Footer aksi:
- Kiri: tombol secondary "Batal"
- Kanan: tombol primary "Lanjut ke Step 2 →" (disabled jika ada error)

---

SCREEN B — STEP 2: INPUT PRODUK (step 1 done, step 2 aktif, step 3 pending)

Info sesi di bagian atas (read-only banner kecil):
- "Sesi: Flash Sale Gadget Akhir Pekan | 12 Jun 2026, 10.00–12.00 WIB"

Tabel input produk:
Kolom: No | SKU | Nama Produk (auto-fill) | Harga Normal | Diskon (%) | Harga Flash Sale | Qty Flash Sale | Aksi (hapus)

Data 4 baris (dari 6 maksimal):
- Baris 1: SKU PROD0001 | "Kaos Polos Oversize Pria" | Rp 120.000 | 20% | Rp 96.000 | qty 20 | — normal, tidak ada error
- Baris 2: SKU PROD7718 | "Kemeja Batik Pria Premium" | Rp 250.000 | 0% | Rp 250.000 | qty 10 | Warning kuning di sel diskon: "Diskon 0%, pastikan nilai benar" + checkbox "Saya konfirmasi" (belum dicentang)
- Baris 3: SKU PROD9999 | — (kosong) | — | — | — | — | Error merah di sel SKU: "SKU tidak ditemukan atau tidak aktif", baris dikunci (field lain disabled)
- Baris 4: SKU PROD3386 | "Rice Cooker Miyabi 1.8L" | Rp 450.000 | 10% | Rp 405.000 | qty 50 | Warning kuning di sel Qty: "Melebihi stok tersedia (30 unit)"

Di bawah tabel:
- Tombol "+ Tambah SKU" (enabled, karena baru 4 dari 6)
- Counter: "4 / 6 SKU ditambahkan"
- Tombol "Import dari Excel/CSV" (secondary, dengan ikon upload) — di kanan atas tabel

Import modal (tampilkan sebagai state terpisah / overlay):
- Judul modal: "Import Produk dari Excel / CSV"
- Area drag & drop: "Seret file ke sini atau klik untuk memilih" + ikon file
- Catatan: "Format yang diterima: .xlsx, .xls, .csv | Maks. 1 MB"
- Tombol: "Batal" dan "Upload & Parsing dengan AI"

Footer aksi:
- Kiri: tombol secondary "← Kembali ke Step 1"
- Kanan: tombol primary "Lanjut ke Step 3 →" (disabled jika ada error hard block)

---

SCREEN C — STEP 3: PREVIEW & KONFIRMASI (step 1 & 2 done, step 3 aktif)

Bagian atas — PREVIEW TAMPILAN HOMEPAGE:
- Label section: "Pratinjau tampilan di halaman Home Jakmall"
- Tampilkan simulasi card flash sale seperti yang akan muncul di homepage:
  - Header section: "Flash Sale" + countdown "Berakhir dalam: 01:45:22" (gaya mirip UI Jakmall)
  - Grid 6 product card (3 produk dari baris yang valid; 2 baris grid):
    - Setiap card: area gambar placeholder (abu-abu), nama produk, harga normal (teks coret abu), harga flash sale (teks merah bold, format Rp), badge diskon "–20%", tombol "Beli Sekarang"
    - Produk contoh: Kaos Polos Oversize Pria (Rp 96.000), Kemeja Batik Pria Premium (Rp 250.000 — tanpa diskon karena 0%), Rice Cooker Miyabi 1.8L (Rp 405.000), 3 produk placeholder lain dengan harga Rp ???.???

Bagian bawah — RINGKASAN & KONFIRMASI:
- Card putih berisi tabel ringkasan:
  - Nama Sesi: Flash Sale Gadget Akhir Pekan
  - Jadwal: 12 Jun 2026, 10.00–12.00 WIB (durasi 2 jam)
  - Jumlah SKU Valid: 3 dari 4 (1 SKU error diabaikan)
  - Status setelah publish: Scheduled
  - Dibuat oleh: Rina Marlina (Marketing)

- Checklist konfirmasi:
  [ ] "Saya telah memeriksa seluruh data produk, harga, dan jadwal sesi"

- Catatan akses:
  Ikon info + teks abu: "Tombol Publish hanya aktif untuk Marketing Manager dan Admin"

Footer aksi:
- Kiri: tombol secondary "← Kembali ke Step 2"
- Tengah: tombol secondary "Simpan sebagai Draft"
- Kanan: tombol primary "Publish Sesi" (disabled jika checklist belum dicentang, atau user bukan Marketing Manager/Admin)

Wireframe harus:
- Bukan sketsa abstrak atau kotak kosong — semua elemen memiliki label, placeholder, dan data contoh
- Layout desktop 1280px
- Sesuai design system di atas tanpa pengecualian