const JsonStore = require('./JsonStore');

class DeviceManager {
    constructor() {
        this.store = new JsonStore('devices.json', [
            { id: 1, name: 'iPhone 13', ip: '192.168.1.101', type: 'Mobile', status: 'Active' },
            { id: 2, name: 'MacBook Pro', ip: '192.168.1.102', type: 'Laptop', status: 'Active' },
            { id: 3, name: 'Smart TV', ip: '192.168.1.103', type: 'TV', status: 'Idle' },
            { id: 4, name: 'Gaming PC', ip: '192.168.1.104', type: 'Desktop', status: 'Active' },
        ]);
    }

    async init() {
        await this.store.init();
    }

    async getAllDevices() {
        return this.store.read();
    }

    async addDevice(device) {
        const current = await this.store.read();
        const newDevice = {
            id: current.length > 0 ? Math.max(...current.map(d => d.id)) + 1 : 1,
            ...device,
            status: 'Active' // Default status
        };
        current.push(newDevice);
        await this.store.write(current);
        return newDevice;
    }

    async removeDevice(id) {
        const current = await this.store.read();
        const newDevices = current.filter(d => d.id !== id);
        // Only return something if we actually deleted
        if (newDevices.length !== current.length) {
            await this.store.write(newDevices);
            return { success: true };
        }
        return { success: false };
    }
}

module.exports = DeviceManager;
