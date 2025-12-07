class DeviceManager {
    constructor(initialDevices = []) {
        this.devices = initialDevices;
    }

    getAllDevices() {
        return this.devices;
    }

    getDeviceById(id) {
        return this.devices.find(device => device.id === id);
    }

    addDevice(device) {
        const newDevice = {
            id: this.devices.length + 1,
            ...device,
            status: 'Active' // Default status
        };
        this.devices.push(newDevice);
        return newDevice;
    }

    removeDevice(id) {
        const index = this.devices.findIndex(device => device.id === id);
        if (index !== -1) {
            return this.devices.splice(index, 1)[0];
        }
        return null;
    }

    updateDeviceStatus(id, status) {
        const device = this.getDeviceById(id);
        if (device) {
            device.status = status;
            return device;
        }
        return null;
    }
}

module.exports = DeviceManager;
