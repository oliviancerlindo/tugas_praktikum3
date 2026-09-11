# Expense Tracker (Jejak Pengeluaran)

Website sederhana untuk mencatat pengeluaran, dibuat untuk Tugas Praktikum 3 (HTML, CSS, JS). Semua data dikelola di sisi client (browser) tanpa backend/database - sesuai ketentuan tugas.

## Struktur File

├── index.html   -> struktur halaman utama (form input dan tabel pengeluaran)
├── style.css    -> semua styling, variabel warna, & background gambar alam
└── script.js    -> logika aplikasi (tambah data, hapus data, dan local storage)

## Fungsionalitas

Sesuai instruksi tugas, website ini punya fungsi utama:

1. **Tambah data pengeluaran** - lewat form (keterangan + nominal).
2. **Tampilkan semua data** - muncul otomatis di dalam tabel di bawah form.
3. **Format Mata Uang** - nominal otomatis diformat menjadi Rupiah (Rp) bergaya Indonesia.
4. **Hapus data** - tombol "✕" di tiap baris item untuk menghapus catatan.
5. **Penyimpanan Permanen (Local Storage)** - data otomatis tersimpan di memori browser sehingga tidak hilang saat halaman di-refresh.

## Cara Kerja Kode

### `index.html`
Struktur halaman dibungkus di dalam `<main class="page">` dan terbagi menjadi dua area kotak (card) utama[cite: 4]:
- `#expense-form` - form input yang berisi elemen `#expense-name` dan `#expense-amount` untuk memasukkan data[cite: 4].
- `#table-wrap` - area tabel `.trail-table` tempat data ditampilkan. Isinya dimasukkan secara dinamis ke dalam elemen `<tbody id="trail-body">` melalui JavaScript[cite: 4].
- Terdapat teks `#empty-state` ("# Jejak Pengeluaran Masih Kosong #") yang akan tampil secara default jika tidak ada data[cite: 4].

### `style.css`
- Menggunakan pendekatan *CSS Variables* di dalam `:root` untuk menyimpan palet warna seperti `--forest-mid` dan `--moss` agar mudah dikelola[cite: 6].
- Background diambil dari URL eksternal (Pexels) dan diatur menggunakan properti `background-attachment: fixed` agar gambar tetap diam saat halaman di-scroll[cite: 6].
- Tabel didesain dengan efek transisi saat kursor diarahkan ke baris data (hover) dan animasi `settle` saat data baru ditambahkan[cite: 6].

### `script.js`
Seluruh logika JavaScript dibungkus dalam *Immediately Invoked Function Expression* (IIFE) untuk mencegah variabel bocor ke *global scope*[cite: 5].
- Data disimpan dalam bentuk array, kemudian dikonversi menjadi *string* menggunakan `JSON.stringify` untuk disimpan di dalam `localStorage` browser menggunakan kunci (key) `"jejak-pengeluaran-data"`[cite: 5].
- Fungsi `makeRow(exp)` bertugas merakit elemen HTML (`<tr>` dan `<td>`) menggunakan DOM manipulation, lalu memasukkannya ke dalam tabel setiap kali form disubmit[cite: 5].
- Fungsi `Intl.NumberFormat("id-ID")` digunakan untuk memformat angka inputan menjadi format standar mata uang Rupiah[cite: 5].