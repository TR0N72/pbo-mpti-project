const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const http = require('http');

// Import OOP Classes
const DeviceManager = require('./classes/DeviceManager');
const WifiManager = require('./classes/WifiManager');
const TrafficMonitor = require('./classes/TrafficMonitor');
const AuthManager = require('./classes/AuthManager');
const NetworkManager = require('./classes/NetworkManager');
const SecurityManager = require('./classes/SecurityManager');

dotenv.config();

class RouterServer {
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new Server(this.server, {
            cors: {
                origin: "http://localhost:5173",
                methods: ["GET", "POST", "DELETE", "PUT"]
            }
        });

        // Initialize Managers
        this.authManager = new AuthManager();
        this.deviceManager = new DeviceManager();
        this.wifiManager = new WifiManager();
        this.networkManager = new NetworkManager();
        this.securityManager = new SecurityManager();
        this.trafficMonitor = new TrafficMonitor(this.io);

        this.configureMiddleware();
        this.setupRoutes();
    }

    async init() {
        // Initialize async stores
        await this.deviceManager.init();
        await this.wifiManager.init();
        await this.networkManager.init();
        await this.securityManager.init();
    }

    configureMiddleware() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    setupRoutes() {
        this.app.get('/', (req, res) => {
            res.send('Router API (OOP Version with Persistence) is running...');
        });

        // --- Auth Routes ---
        this.app.post('/api/login', (req, res) => {
            const { username, password } = req.body;
            const result = this.authManager.login(username, password);
            if (result.success) {
                res.json(result);
            } else {
                res.status(401).json(result);
            }
        });

        this.app.post('/api/logout', (req, res) => {
            res.json(this.authManager.logout());
        });

        // --- Network Routes ---
        this.app.get('/api/network', async (req, res) => {
            res.json(await this.networkManager.getSettings());
        });

        this.app.post('/api/network', async (req, res) => {
            const updated = await this.networkManager.updateSettings(req.body);
            res.json(updated);
        });

        // --- Security Routes ---
        this.app.get('/api/security', async (req, res) => {
            res.json(await this.securityManager.getSettings());
        });

        this.app.post('/api/security', async (req, res) => {
            const updated = await this.securityManager.updateSettings(req.body);
            res.json(updated);
        });

        this.app.post('/api/security/rules', async (req, res) => {
            const rule = await this.securityManager.addPortRule(req.body);
            res.status(201).json(rule);
        });

        this.app.delete('/api/security/rules/:id', async (req, res) => {
            await this.securityManager.deletePortRule(parseInt(req.params.id));
            res.json({ success: true });
        });

        // --- Device Routes ---
        this.app.get('/api/devices', async (req, res) => {
            res.json(await this.deviceManager.getAllDevices());
        });

        this.app.post('/api/devices', async (req, res) => {
            const newDevice = await this.deviceManager.addDevice(req.body);
            res.status(201).json(newDevice);
        });

        this.app.delete('/api/devices/:id', async (req, res) => {
            const result = await this.deviceManager.removeDevice(parseInt(req.params.id));
            res.json(result);
        });

        // --- Wifi Routes ---
        this.app.get('/api/wifi', async (req, res) => {
            res.json(await this.wifiManager.getSettings());
        });

        this.app.post('/api/wifi', async (req, res) => {
            const updated = await this.wifiManager.updateSettings(req.body);
            res.json(updated);
        });

        // --- Status Routes ---
        this.app.get('/api/status', (req, res) => {
            res.json(this.trafficMonitor.getStatus());
        });
    }

    async start(port = 5000) {
        await this.init();

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
//meow :3