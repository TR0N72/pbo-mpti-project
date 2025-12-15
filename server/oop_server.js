const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const http = require('http');
const path = require('path');

// Import Kelas-kelas OOP (Modul Manager)
const DeviceManager = require('./classes/DeviceManager');
const WifiManager = require('./classes/WifiManager');
const TrafficMonitor = require('./classes/TrafficMonitor');
const AuthManager = require('./classes/AuthManager');
const NetworkManager = require('./classes/NetworkManager');
const SecurityManager = require('./classes/SecurityManager');

dotenv.config();

// Kelas RouterServer: Kelas utama (Main Class) yang mengorkestrasi seluruh sistem.
// Menerapkan pola Composition dengan menggabungkan berbagai Manager untuk kerjanya.
class RouterServer {
    constructor() {
        // 1. Inisialisasi Infrastruktur (Server Express & WebSocket)
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new Server(this.server, {
            cors: {
                origin: "http://localhost:5173", // Konfigurasi CORS untuk mengizinkan akses frontend
                methods: ["GET", "POST", "DELETE", "PUT"]
            }
        });

        // 2. Instansiasi Manager (Object Initialization)
        // Setiap instance manager bertanggung jawab atas domain spesifik (Separation of Concerns).
        this.authManager = new AuthManager();
        this.deviceManager = new DeviceManager();
        this.wifiManager = new WifiManager();
        this.networkManager = new NetworkManager();
        this.securityManager = new SecurityManager();
        this.trafficMonitor = new TrafficMonitor(this.io); // Dependency Injection: Menyuntikkan instance socket.io

        // 3. Konfigurasi Sistem
        this.configureMiddleware();
        this.setupRoutes();
    }

    // Method init: Menginisialisasi seluruh subsistem secara asinkron.
    // Memastikan semua komponen siap sebelum server mulai menerima request.
    async init() {
        await this.deviceManager.init();
        await this.wifiManager.init();
        await this.networkManager.init();
        await this.securityManager.init();
    }

    // Method configureMiddleware: Mengatur pipeline pemrosesan request HTTP.
    // Menerapkan middleware untuk CORS, parsing JSON, dan penyajian file statis.
    configureMiddleware() {
        this.app.use(cors()); // Middleware untuk Cross-Origin Resource Sharing
        this.app.use(express.json()); // Middleware untuk mem-parsing body request bertipe JSON

        // Menyajikan file statis dari hasil build frontend (Static File Serving)
        // Memungkinkan aplikasi berjalan sebagai Monolithic Deployment (Frontend + Backend).
        this.app.use(express.static(path.join(__dirname, '../client/dist')));
    }

    // Method setupRoutes: Mendefinisikan endpoint API dan memetakan request ke handler yang sesuai (Routing).
    // Menerapkan pola Delegasi dengan meneruskan logika bisnis ke Manager terkait.
    setupRoutes() {
        // --- Rute Auth (Otentikasi) ---
        this.app.post('/api/login', (req, res) => {
            const { username, password } = req.body;
            // Delegasi ke AuthManager
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

        // --- Rute Network (LAN & DCHP Configuration) ---
        this.app.get('/api/network', async (req, res) => {
            res.json(await this.networkManager.getSettings());
        });

        this.app.post('/api/network', async (req, res) => {
            const updated = await this.networkManager.updateSettings(req.body);
            res.json(updated);
        });

        // --- Rute Security (Firewall & Port Rules Management) ---
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

        // --- Rute Devices (Device Management) ---
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

        // --- Rute WiFi (Wireless Configuration) ---
        this.app.get('/api/wifi', async (req, res) => {
            res.json(await this.wifiManager.getSettings());
        });

        this.app.post('/api/wifi', async (req, res) => {
            const updated = await this.wifiManager.updateSettings(req.body);
            res.json(updated);
        });

        // --- Rute Status (System Monitoring) ---
        this.app.get('/api/status', (req, res) => {
            res.json(this.trafficMonitor.getStatus());
        });

        // Fallback Route: Menangani rute yang tidak dikenali dengan menyajikan aplikasi Single Page Application (SPA).
        this.app.use((req, res) => {
            res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        });
    }

    // Method start: Memulai layanan server.
    async start(port = 5000) {
        await this.init(); // Menunggu inisialisasi selesai (Await Async Initialization)

        // Mengaktifkan monitoring trafik
        this.trafficMonitor.startMonitoring();

        this.server.listen(port, () => {
            console.log(`OOP Server running on port ${port}`);
        });
    }
}

// Entry Point: Memeriksa apakah modul dijalankan secara langsung atau diimpor.
// Jika dijalankan langsung (standalone), instansiasi dan jalankan server.
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    const routerServer = new RouterServer();
    routerServer.start(PORT);
}

module.exports = RouterServer;
//meow :3