const JsonStore = require('./JsonStore');

class WifiManager {
    constructor() {
        this.store = new JsonStore('wifi.json', {
            ssid: 'MySuperFastWifi',
            password: 'securepassword123',
            band: '5GHz',
            security: 'WPA3',
            channel: 36,
            isHidden: false
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
        const updated = { ...current, ...newSettings };
        return this.store.write(updated);
    }
}

module.exports = WifiManager;
