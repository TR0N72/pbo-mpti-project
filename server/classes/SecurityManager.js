const BaseManager = require('./BaseManager');

// Kelas SecurityManager: Mengelola kebijakan keamanan jaringan.
// Menggunakan INHERITANCE dari BaseManager.
class SecurityManager extends BaseManager {
    constructor() {
        super('security.json', {
            firewallResponse: true, // Kebijakan respon ICMP (Ping)
            vpnEnabled: false, // Status layanan VPN server
            parentalControl: false, // Fitur pembatasan akses konten
            portRules: [
                { id: 1, name: 'Minecraft Server', port: '25565', ip: '192.168.1.104', protocol: 'TCP/UDP' },
                { id: 2, name: 'Web Server', port: '80', ip: '192.168.1.102', protocol: 'TCP' }
            ]
        });
    }

    // Method init() DIHAPUS karena inherited.

    getSettings() {
        return this.getData();
    }

    // Method updateSettings: Memperbarui konfigurasi keamanan global.
    async updateSettings(settings) {
        const current = await this.getData();
        const updated = { ...current, ...settings };
        return this.saveData(updated);
    }

    // Method addPortRule: Menambahkan aturan Port Forwarding baru.
    async addPortRule(rule) {
        const current = await this.getData();
        const newRule = { id: Date.now(), ...rule }; // Menggunakan Timestamp sebagai Unique Identifier
        current.portRules.push(newRule);
        await this.saveData(current);
        return newRule;
    }

    // Method deletePortRule: Menghapus aturan Port Forwarding berdasarkan ID.
    async deletePortRule(id) {
        const current = await this.getData();
        current.portRules = current.portRules.filter(r => r.id !== id);
        return this.saveData(current);
    }
}

module.exports = SecurityManager;
