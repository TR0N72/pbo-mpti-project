const BaseManager = require('./BaseManager');

// Kelas NetworkManager: Bertanggung jawab atas konfigurasi parameter jaringan.
// Menggunakan INHERITANCE dari BaseManager.
class NetworkManager extends BaseManager {
    constructor() {
        super('network.json', {
            lan: {
                ip: '192.168.1.1', // Alamat IP statis Router
                subnet: '255.255.255.0',
                gateway: '192.168.1.1',
                dns: '8.8.8.8' // Google DNS sebagai resolver utama
            },
            dhcp: {
                enabled: true, // Status aktif layanan DHCP
                startIp: '192.168.1.100', // Batas awal pool alamat IP dinamis
                endIp: '192.168.1.200',   // Batas akhir pool alamat IP dinamis
                leaseTime: 1440 // Durasi peminjaman IP dalam menit
            }
        });
    }

    // Method init() DIHAPUS karena inherited.

    getSettings() {
        return this.getData();
    }

    // Method updateSettings: Memperbarui konfigurasi jaringan.
    // Mengimplementasikan Deep Merge sederhana untuk memastikan integritas parsial data.
    async updateSettings(newSettings) {
        const current = await this.getData();
        // Logika Deep Merge: Menggabungkan properti 'lan' dan 'dhcp' secara independen
        const updated = {
            lan: { ...current.lan, ...(newSettings.lan || {}) },
            dhcp: { ...current.dhcp, ...(newSettings.dhcp || {}) }
        };
        return this.saveData(updated);
    }
}

module.exports = NetworkManager;
