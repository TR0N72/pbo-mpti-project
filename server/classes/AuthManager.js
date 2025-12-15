// Kelas AuthManager: Mengenkapsulasi logika otentikasi dan manajemen sesi pengguna.
class AuthManager {
    constructor() {
        this.data = null; // Menyimpan token sesi yang valid
    }

    // Method login: Memvalidasi kredensial pengguna.
    // Jika valid, menghasilkan token sisi (session token) baru sebagai bukti otorisasi.
    login(username, password) {
        // Implementasi sederhana: Hardcoded credentials untuk tujuan demonstrasi
        if (username === 'admin' && password === 'admin') {
            // Menghasilkan token sesi unik menggunakan timestamp dan random string
            this.token = Math.random().toString(36).substring(2) + Date.now().toString(36);
            return { success: true, token: this.token };
        }
        return { success: false, message: 'Invalid credentials' };
    }

    // Method validateToken: Memverifikasi keabsahan token sesi.
    // Memastikan token yang dikirim client sesuai dengan state token saat ini di server.
    validateToken(token) {
        // Validasi kesesuaian token (State Validation)
        return token === this.token;
    }

    // Method logout: Mengakhiri sesi pengguna.
    // Menghapus state token otentikasi untuk membatalkan akses.
    logout() {
        this.token = null;
        return { success: true };
    }
}

module.exports = AuthManager;
