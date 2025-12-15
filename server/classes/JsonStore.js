// Mengimpor modul file system untuk operasi I/O asinkron
const fs = require('fs').promises;
const path = require('path');

// Kelas JsonStore: Mengimplementasikan pola Data Access Object (DAO) sederhana.
// Bertanggung jawab untuk persistensi data ke dalam format JSON, memastikan data 
// tetap persisten (tersimpan) meskipun layanan server dihentikan.
class JsonStore {
    // Constructor: Menginisialisasi state awal objek.
    // Menetapkan path file target dan struktur data default sebagai fallback 
    // jika file persistensi belum tersedia.
    constructor(filename, defaultData) {
        this.filepath = path.join(__dirname, '../data', filename);
        this.defaultData = defaultData;
        this.data = null; // Inisialisasi properti data sebagai null sebelum dimuat
    }

    // Method init: Mengorkestrasi persiapan awal penyimpanan data.
    // Melakukan pengecekan keberadaan file. Jika file ada, konten akan divalidasi dan dimuat.
    // Jika tidak, instansiasi file baru dilakukan menggunakan data default.
    async init() {
        try {
            await fs.access(this.filepath);
            // Membaca konten file dari disk
            const content = await fs.readFile(this.filepath, 'utf8');
            this.data = JSON.parse(content);
        } catch (error) {
            // Mekanisme fail-safe: Membuat file baru jika tidak ditemukan
            this.data = this.defaultData;
            await this.save();
        }
        return this.data;
    }

    // Method read: Mengambil data dari memori.
    // Menerapkan pola Lazy Loading: memuat data dari disk hanya jika properti data masih kosong.
    async read() {
        if (!this.data) {
            await this.init();
        }
        return this.data;
    }

    // Method write: Memperbarui state data dan memicu persistensi.
    // Memastikan sinkronisasi data antara memori volatile dan penyimpanan permanen (disk).
    async write(newData) {
        this.data = newData;
        await this.save();
        return this.data;
    }

    // Method save: Menangani operasi I/O tingkat rendah.
    // Melakukan serialisasi objek JavaScript ke format string JSON dan menulisnya ke file sistem.
    async save() {
        await fs.writeFile(this.filepath, JSON.stringify(this.data, null, 2));
    }
}

module.exports = JsonStore;
