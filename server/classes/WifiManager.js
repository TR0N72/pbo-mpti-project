const BaseManager = require('./BaseManager');

// Kelas WifiManager: Mengabstraksi konfigurasi Wi-Fi (SSID, Password, Channel).
// Menggunakan INHERITANCE dari BaseManager.
class WifiManager extends BaseManager {
    constructor() {
        super('wifi.json', {
            ssid: 'MySuperFastWifi',
            password: 'securepassword123',
            band: '5GHz',
            security: 'WPA3',
            channel: 36,
            isHidden: false
        });
    }

    // Method init() DIHAPUS karena inherited.

    // Method getSettings: Mengambil state konfigurasi Wi-Fi saat ini (Getter).
    getSettings() {
        return this.getData();
    }

    // Method updateSettings: Memperbarui konfigurasi Wi-Fi (Setter/Modifier).
    // Melakukan penggabungan (merge) antara pengaturan lama dan baru sebelum disimpan.
    async updateSettings(newSettings) {
        const current = await this.getData();
        const updated = { ...current, ...newSettings };
        return this.saveData(updated);
    }
}

module.exports = WifiManager;
