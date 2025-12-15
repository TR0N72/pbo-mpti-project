import React, { createContext, useContext, useState } from 'react';

// Definisi tipe data untuk Context Auth
// TypeScript Interface membantu memastikan tipe data yang konsisten.
interface AuthContextType {
    isAuthenticated: boolean;
    login: (u: string, p: string) => Promise<boolean>;
    logout: () => void;
    token: string | null;
}

// Membuat Context: Wadah untuk data global yang bisa diakses di mana saja dalam provider.
// 'null!' digunakan untuk menghindari pengecekan null yang berlebihan (non-null assertion).
const AuthContext = createContext<AuthContextType>(null!);

// AuthProvider: Komponen pembungkus (Wrapper) yang mengelola logika otentikasi.
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    // State Management: Menggunakan useState untuk menyimpan token.
    // Inisialisasi awal mengambil dari localStorage agar login tetap persisten saat refresh.
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    // Derived State: Status 'isAuthenticated' otomatis true jika ada token.
    const isAuthenticated = !!token;

    // Fungsi Login: Menangani komunikasi dengan API Backend.
    const login = async (username: string, password: string) => {
        try {
            // Melakukan HTTP Request ke server
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();

            // Jika login sukses, simpan token ke state dan localStorage
            if (data.success) {
                setToken(data.token);
                localStorage.setItem('token', data.token);
                return true;
            }
        } catch (e) {
            console.error(e);
        }
        return false;
    };

    // Fungsi Logout: Membersihkan sesi pengguna
    const logout = () => {
        setToken(null);
        localStorage.removeItem('token'); // Hapus persistensi login
    };

    // Mengekspos value (nilai dan fungsi) ke seluruh children components
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook: Mempermudah penggunaan context di komponen lain.
// Contoh penggunaan: const { login } = useAuth();
export const useAuth = () => useContext(AuthContext);
