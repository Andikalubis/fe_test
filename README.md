# ParkirModern - Sistem Pengelolaan Parkir Mobil

Aplikasi web responsif untuk pengelolaan dan reservasi tempat parkir. Dirancang dengan *UI/UX* modern bernuansa Biru dan Putih yang *"clean"* serta intuitif.

## Fitur Utama

- **Peta Parkiran Interaktif**: Menampilkan denah parkir menggunakan elemen grafis dari `Konva.js`. Membedakan dengan jelas (warna merah/biru) antara slot yang sedang terisi dan yang masih tersedia.
- **Pemesanan Mudah & Praktis**: Formulir modal pemesanan informatif untuk mengisi Nama, Nomor Kendaraan, serta pilihan durasi parkir. Peta pun menjadi penanda jika slot telah di-booking.
- **Kartu Pesanan *Expandable***: Halaman terpisah untuk melihat *Detail Pesanan* aktif. Tiap kartu ringkasan pesanan dapat diklik untuk *"expand"* (melebar) dan menampilkan info lebih mendalam seperti Waktu Parkir, serta penghitung waktu berjalan (sisa waktu normal maupun hitungan *Overtime*). Terdapat juga tombol untuk Mengakhiri Sesi.
- **Pencarian Real-time (Bonus)**: Membantu pencarian tempat parkir berdasarkan teks. Filter dapat menangkap ukuran (*Small, Medium, Large*) atau kode lokasi (*A1, A2*, dsb) secara langsung pada peta parkiran.
- **Persistensi Data via LocalStorage**: Data pemesanan atau posisi parkiran akan tetap aman (tidak direset) meskipun peramban web tertutup atau direfresh.

## Teknologi (Tech Stack)

Aplikasi dibangun *from scratch* (berbasiskan environment *Vite*) menggunakan tumpukan teknologi berikut:

1. **Vite + React 19** - Ekosistem utama pembangun antarmuka UI.
2. **TypeScript** - Penerapan *static typing* secara ekstensif demi kualitas dan kehandalan kode.
3. **Zustand** - Mekanisme *State Management* (Manajemen Data) global yang lebih ringkas dari Redux dan memungkinkan penyimpanan lokal (*persistence*).
4. **Tailwind CSS v4** - Kerangka dasar penataan desain tata letak UI, warna Biru/Putih, hingga ke animasi mulus saat modul *"expandable detail"* ditekan.
5. **Konva (`react-konva`)** - Digunakan sangat esensial sebagai fondasi utama menggambar peta/denah parkir berstruktur 2 Dimensi.
6. **React Router DOM** - Pengelola rute navigasi untuk mewujudkan *routing* multi-halaman antara Dashboard dan Detail Pesanan.

## Cara Menjalankan Program

Pastikan Anda memiliki instalasi [Node.js](https://nodejs.org/) (*versi LTS disarankan*) pada komputer Anda.

1. **Jalankan instalasi dependensi**
   Buka terminal di dalam folder direktori (`FE_TEST`) dan jalankan:
   ```bash
   npm install
   ```

2. **Mulai mode pengembangan (Development Server)**
   Setelah modul dipasang, jalankan web-server:
   ```bash
   npm run dev
   ```

3. **Membuka Aplikasi**
   Secara normal, aplikasi akan berjalan di server lokal. Klik tautan Terminal atau buka browser menuju:
   `http://localhost:5173`

4. *(Opsional)* **Validasi dan Proses Kompilasi Produksi**
   Anda juga bisa memvalidasi tidak ada _error_ tipe TypeScript pada aplikasi sembari membuatnya siap dirilis:
   ```bash
   npm run build
   ```

---
*Dibuat untuk kriteria test sistem manajemen parkir Equanimity.*
