// Kelas TrafficMonitor: Mengimplementasikan pemantauan trafik jaringan secara real-time.
// Menggunakan pola Observer (via Socket.IO) untuk menyiarkan pembaruan state ke klien yang terhubung.
class TrafficMonitor {
    constructor(io) {
        this.io = io; // Dependency Injection: Instance Socket.IO disuntikkan untuk komunikasi real-time
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

    // Method getStatus: Mengembalikan snapshot state trafik saat ini.
    getStatus() {
        return this.status;
    }

    // Method startMonitoring: Memulai siklus pemantauan berkala.
    // Menetapkan interval waktu untuk pembaruan data (Polling/Heartbeat mechanism).
    startMonitoring(intervalMs = 2000) {
        if (this.intervalId) return; // Mencegah multiple instance interval berjalan bersamaan (Idempotency)

        console.log('Starting traffic monitoring...');
        // Menjadwalkan eksekusi fungsi broadcast secara periodik
        this.intervalId = setInterval(() => {
            this.broadcastTrafficUpdate();
        }, intervalMs);
    }

    // Method stopMonitoring: Menghentikan siklus pemantauan.
    // Membersihkan interval timer untuk mencegah kebocoran memori (Memory Leak prevention).
    stopMonitoring() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            console.log('Stopped traffic monitoring.');
        }
    }

    // Method broadcastTrafficUpdate: Menyiarkan state terbaru ke seluruh klien (Broadcasting).
    broadcastTrafficUpdate() {
        const update = this.generateTrafficStats();
        // Memperbarui state internal dengan data baru
        this.status.downloadSpeed = update.download;
        this.status.uploadSpeed = update.upload;

        // Emit event via Socket.IO untuk notifikasi push ke klien (Publish-Subscribe Pattern)
        this.io.emit('traffic_update', update);
    }

    // Method generateTrafficStats: Menghasilkan data simulasi (Mocking).
    // Dalam implementasi produksi, fungsi ini akan berinteraksi dengan interface jaringan sistem operasi.
    generateTrafficStats() {
        return {
            download: Math.floor(Math.random() * 300),
            upload: Math.floor(Math.random() * 100)
        };
    }

    // Method setupSocketListeners: Mengonfigurasi event listener untuk koneksi WebSocket baru.
    setupSocketListeners() {
        this.io.on('connection', (socket) => {
            console.log('TrafficMonitor: Admin connected:', socket.id);

            // Mengirim state inisial segera setelah handshaking berhasil
            socket.emit('initial_status', this.getStatus());

            // Memastikan monitoring berjalan saat ada klien yang terhubung (Lazy Activation)
            this.startMonitoring();

            socket.on('disconnect', () => {
                console.log('TrafficMonitor: Admin disconnected:', socket.id);
                // Opsional: Logika pembersihan saat klien terputus
            });
        });
    }
}

module.exports = TrafficMonitor;
