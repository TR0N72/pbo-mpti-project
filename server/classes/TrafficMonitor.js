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
