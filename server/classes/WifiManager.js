class WifiManager {
    constructor(initialSettings) {
        this.settings = initialSettings || {
            ssid: 'MySuperFastWifi',
            band: '5GHz',
            security: 'WPA3',
            channel: 36
        };
    }

    getSettings() {
        return this.settings;
    }

    updateSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
        return this.settings;
    }
}

module.exports = WifiManager;
