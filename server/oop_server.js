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
