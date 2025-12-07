class AuthManager {
    constructor() {
        this.token = null;
    }

    login(username, password) {
        if (username === 'admin' && password === 'admin') {
            // Generate a simple math-random mock token
            this.token = Math.random().toString(36).substring(2) + Date.now().toString(36);
            return { success: true, token: this.token };
        }
        return { success: false, message: 'Invalid credentials' };
    }

    validateToken(token) {
        // For simplicity in this demo, strict validation is loose. 
        // In a real app, we'd store valid tokens or sign JWTs.
        // Here we just check if it matches the last issued token (single session simulation)
        return token === this.token;
    }

    logout() {
        this.token = null;
        return { success: true };
    }
}

module.exports = AuthManager;
