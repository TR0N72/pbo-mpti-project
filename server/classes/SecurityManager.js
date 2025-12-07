const JsonStore = require('./JsonStore');

class SecurityManager {
    constructor() {
        this.store = new JsonStore('security.json', {
            firewallResponse: true,
            vpnEnabled: false,
            parentalControl: false,
            portRules: [
                { id: 1, name: 'Minecraft Server', port: '25565', ip: '192.168.1.104', protocol: 'TCP/UDP' },
                { id: 2, name: 'Web Server', port: '80', ip: '192.168.1.102', protocol: 'TCP' }
            ]
        });
    }

    async init() {
        await this.store.init();
    }

    getSettings() {
        return this.store.read();
    }

    async updateSettings(settings) {
        const current = await this.store.read();
        const updated = { ...current, ...settings };
        return this.store.write(updated);
    }

    async addPortRule(rule) {
        const current = await this.store.read();
        const newRule = { id: Date.now(), ...rule };
        current.portRules.push(newRule);
        await this.store.write(current);
        return newRule;
    }

    async deletePortRule(id) {
        const current = await this.store.read();
        current.portRules = current.portRules.filter(r => r.id !== id);
        return this.store.write(current);
    }
}

module.exports = SecurityManager;
