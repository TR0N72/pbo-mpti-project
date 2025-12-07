# Object-Oriented Programming (OOP) Implementation

This document contains the source code for the OOP-based implementation of the server side logic.

## 1. Device Manager Class
**Path:** `server/classes/DeviceManager.js`

This class encapsulates all logic related to managing connected devices (CRUD operations).

```javascript
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
```

## 2. WiFi Manager Class
**Path:** `server/classes/WifiManager.js`

This class manages the WiFi configuration settings.

```javascript
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
```

## 3. Traffic Monitor Class
**Path:** `server/classes/TrafficMonitor.js`

This class handles real-time traffic monitoring and Socket.IO communication.

```javascript
class TrafficMonitor {
    constructor(io) {
        this.io = io;
        this.intervalId = null;
        this.status = {
            downloadSpeed: 245.5,
            uploadSpeed: 85.2,
            connectedDevices: 12,
            cpuLoad: 24,
            ramUsage: 45
        };
        this.setupSocketListeners();
    }

    getStatus() {
        return this.status;
    }

    startMonitoring(intervalMs = 2000) {
        if (this.intervalId) return;

        console.log('Starting traffic monitoring...');
        this.intervalId = setInterval(() => {
            this.broadcastTrafficUpdate();
        }, intervalMs);
    }

    stopMonitoring() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            console.log('Stopped traffic monitoring.');
        }
    }

    broadcastTrafficUpdate() {
        const update = this.generateTrafficStats();
        // Update internal state
        this.status.downloadSpeed = update.download;
        this.status.uploadSpeed = update.upload;
        
        // Broadcast to all connected clients
        this.io.emit('traffic_update', update);
    }

    generateTrafficStats() {
        return {
            download: Math.floor(Math.random() * 300),
            upload: Math.floor(Math.random() * 100)
        };
    }

    setupSocketListeners() {
        this.io.on('connection', (socket) => {
            console.log('TrafficMonitor: Admin connected:', socket.id);
            
            // Send initial status
            socket.emit('initial_status', this.getStatus());

            // Start monitoring if not already running (or logic to handle per-connection)
            // For now, we assume global monitoring
            this.startMonitoring();

            socket.on('disconnect', () => {
                console.log('TrafficMonitor: Admin disconnected:', socket.id);
                // Optionally stop if no clients, but let's keep it simple
            });
        });
    }
}

module.exports = TrafficMonitor;
```

## 4. Main Server (OOP Entry Point)
**Path:** `server/oop_server.js`

This file serves as the entry point, composing the classes together to run the server.

```javascript
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const http = require('http');

// Import OOP Classes
const DeviceManager = require('./classes/DeviceManager');
const WifiManager = require('./classes/WifiManager');
const TrafficMonitor = require('./classes/TrafficMonitor');

dotenv.config();

class RouterServer {
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new Server(this.server, {
            cors: {
                origin: "http://localhost:5173",
                methods: ["GET", "POST"]
            }
        });

        // Initialize Managers
        this.deviceManager = new DeviceManager([
            { id: 1, name: 'iPhone 13', ip: '192.168.1.101', type: 'Mobile', status: 'Active' },
            { id: 2, name: 'MacBook Pro', ip: '192.168.1.102', type: 'Laptop', status: 'Active' },
            { id: 3, name: 'Smart TV', ip: '192.168.1.103', type: 'TV', status: 'Idle' },
            { id: 4, name: 'Gaming PC', ip: '192.168.1.104', type: 'Desktop', status: 'Active' },
        ]);

        this.wifiManager = new WifiManager();
        this.trafficMonitor = new TrafficMonitor(this.io);

        this.configureMiddleware();
        this.setupRoutes();
    }

    configureMiddleware() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    setupRoutes() {
        this.app.get('/', (req, res) => {
            res.send('Router API (OOP Version) is running...');
        });

        // Device Routes
        this.app.get('/api/devices', (req, res) => {
            res.json(this.deviceManager.getAllDevices());
        });

        this.app.post('/api/devices', (req, res) => {
            const newDevice = this.deviceManager.addDevice(req.body);
            res.status(201).json(newDevice);
        });

        // Wifi Routes
        this.app.get('/api/wifi', (req, res) => {
            res.json(this.wifiManager.getSettings());
        });

        this.app.post('/api/wifi', (req, res) => {
            const updated = this.wifiManager.updateSettings(req.body);
            res.json(updated);
        });

        // Status Routes
        this.app.get('/api/status', (req, res) => {
            res.json(this.trafficMonitor.getStatus());
        });
    }

    start(port = 5000) {
        // Start Traffic Monitor
        this.trafficMonitor.startMonitoring();

        this.server.listen(port, () => {
            console.log(`OOP Server running on port ${port}`);
        });
    }
}

// Run the server if this file is run directly
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    const routerServer = new RouterServer();
    routerServer.start(PORT);
}

module.exports = RouterServer;
```
