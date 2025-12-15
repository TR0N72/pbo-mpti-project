const BaseManager = require('./BaseManager');

// Kelas DeviceManager: Mengelola state perangkat yang terhubung (Connected Devices Management).
// Menggunakan INHERITANCE dari BaseManager.
class DeviceManager extends BaseManager {
    constructor() {
        // Super() memanggil constructor parent (BaseManager)
        super('devices.json', [
            { id: 1, name: 'iPhone 13', ip: '192.168.1.101', type: 'Mobile', status: 'Active' },
            { id: 2, name: 'MacBook Pro', ip: '192.168.1.102', type: 'Laptop', status: 'Active' },
            { id: 3, name: 'Smart TV', ip: '192.168.1.103', type: 'TV', status: 'Idle' },
            { id: 4, name: 'Gaming PC', ip: '192.168.1.104', type: 'Desktop', status: 'Active' },
        ]);
    }

    // Method init() DIHAPUS karena sudah diwarisi dari BaseManager.

    // Method getAllDevices: Mengambil seluruh koleksi objek perangkat dari penyimpanan.
    async getAllDevices() {
        return this.getData(); // Menggunakan method dari BaseManager
    }

    // Method addDevice: Menambahkan entitas perangkat baru ke dalam koleksi.
    async addDevice(device) {
        const current = await this.getData();
        // Algoritma pembuatan ID: ID terbesar + 1
        const newDevice = {
            id: current.length > 0 ? Math.max(...current.map(d => d.id)) + 1 : 1,
            ...device,
            status: 'Active' // Menetapkan state awal perangkat sebagai 'Active'
        };
        current.push(newDevice);
        await this.saveData(current); // Menggunakan method dari BaseManager
        return newDevice;
    }

    // Method removeDevice: Menghapus entitas perangkat berdasarkan ID.
    async removeDevice(id) {
        const current = await this.getData();
        // Operasi filter: Menghasilkan array baru tanpa perangkat dengan ID yang ditentukan
        const newDevices = current.filter(d => d.id !== id);

        // Validasi: Memeriksa apakah ada perubahan jumlah data (berarti penghapusan berhasil)
        if (newDevices.length !== current.length) {
            await this.saveData(newDevices);
            return { success: true };
        }
        return { success: false };
    }
}
// Ekspor biar bisa dipake sama server utama.
module.exports = DeviceManager;
