import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// ProtectedRoute: Komponen "Satpam" (Guard).
// Tugasnya mengecek apakah pengguna boleh mengakses halaman tertentu.
export const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
    const { isAuthenticated } = useAuth(); // Ambil status login dari Context
    const location = useLocation(); // Simpan lokasi saat ini untuk redirect balik nanti

    // Logika Proteksi: Jika belum login, tendang ke halaman /login.
    if (!isAuthenticated) {
        // 'receive' state 'from' agar setelah login user dikembalikan ke halaman yang tadi mau dibuka.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Jika sudah login, izinkan render komponen halaman yang diminta.
    return children;
};
