const JsonStore = require('./JsonStore');

// Kelas BaseManager: Kelas induk (Parent Class) untuk semua manager.
// Menerapkan konsep INHERITANCE untuk mengurangi duplikasi kode (DRY Principle).
class BaseManager {
    constructor(filename, defaultData) {
        // Semua child class akan menggunakan JsonStore yang diinisialisasi di sini
        this.store = new JsonStore(filename, defaultData);
    }

    // Method init: Diwariskan ke semua child class.
    // Child class tidak perlu menulis ulang method ini kecuali butuh logika tambahan (Overriding).
    async init() {
        await this.store.init();
    }

    // Method generik untuk mengambil data
    async getData() {
        return this.store.read();
    }

    // Method generik untuk menyimpan data
    async saveData(data) {
        return this.store.write(data);
    }
}

module.exports = BaseManager;
