const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const http = require('http');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Router API is running...');
});

// Mock Data
const mockStatus = {
    downloadSpeed: 245.5,
    uploadSpeed: 85.2,
    connectedDevices: 12,
    cpuLoad: 24,
    ramUsage: 45
};

const mockDevices = [
    { id: 1, name: 'iPhone 13', ip: '192.168.1.101', type: 'Mobile', status: 'Active' },
    { id: 2, name: 'MacBook Pro', ip: '192.168.1.102', type: 'Laptop', status: 'Active' },
    { id: 3, name: 'Smart TV', ip: '192.168.1.103', type: 'TV', status: 'Idle' },
    { id: 4, name: 'Gaming PC', ip: '192.168.1.104', type: 'Desktop', status: 'Active' },
];

const mockWifiSettings = {
    ssid: 'MySuperFastWifi',
    band: '5GHz',
    security: 'WPA3',
    channel: 36
};

// API Endpoints
app.get('/api/status', (req, res) => {
    res.json(mockStatus);
});

app.get('/api/devices', (req, res) => {
    res.json(mockDevices);
});

app.get('/api/wifi', (req, res) => {
    res.json(mockWifiSettings);
});

io.on('connection', (socket) => {
    console.log('Admin connected:', socket.id);

    // Simulate real-time traffic updates
    const interval = setInterval(() => {
        socket.emit('traffic_update', {
            download: Math.floor(Math.random() * 300),
            upload: Math.floor(Math.random() * 100)
        });
    }, 2000);

    socket.on('disconnect', () => {
        console.log('Admin disconnected:', socket.id);
        clearInterval(interval);
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
