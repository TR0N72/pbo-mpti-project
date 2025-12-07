const JsonStore = require('./JsonStore');

class NetworkManager {
    constructor() {
        this.store = new JsonStore('network.json', {
            lan: {
                ip: '192.168.1.1',
                subnet: '255.255.255.0',
                gateway: '192.168.1.1',
                dns: '8.8.8.8'
            },
            dhcp: {
                enabled: true,
                startIp: '192.168.1.100',
                endIp: '192.168.1.200',
                leaseTime: 1440 // minutes
            }
        });
    }

    async init() {
        await this.store.init();
    }

    getSettings() {
        return this.store.read();
    }

    async updateSettings(newSettings) {
        const current = await this.store.read();
        // Deep merge or simple replace depending on structure.
        // Here we did a simple replace for specific sections if provided.
        const updated = {
            lan: { ...current.lan, ...(newSettings.lan || {}) },
            dhcp: { ...current.dhcp, ...(newSettings.dhcp || {}) }
        };
        return this.store.write(updated);
    }
}

module.exports = NetworkManager;
