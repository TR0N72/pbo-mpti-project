import { LayoutDashboard, Wifi, Smartphone, Shield, Settings, LogOut, Network } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

// Komponen Helper: SidebarItem
// Merupakan komponen kecil untuk me-render setiap link di sidebar agar kode lebih rapi (DRY Principle).
const SidebarItem = ({ icon: Icon, label, to }: { icon: any, label: string, to: string }) => {
    const location = useLocation();
    // Mengecek apakah URL saat ini sama dengan link ini untuk ngasih highlight aktif.
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                isActive
                    ? "bg-blue-600 text-white" // Style saat aktif
                    : "text-gray-400 hover:text-white hover:bg-gray-800" // Style default
            )}
        >
            <Icon size={20} />
            <span>{label}</span>
        </Link>
    );
};

// Layout Utama App:
// Menerapkan pola "Shell" atau "Master Page".
// Komponen ini membungkus semua halaman (children) dengan Sidebar dan Header yang konsisten.
export const Layout = ({ children }: { children: React.ReactNode }) => {
    const { logout } = useAuth();
    const location = useLocation();

    // Helper function untuk menentukan judul halaman berdasarkan URL (Dynamic Title).
    const getPageTitle = () => {
        switch (location.pathname) {
            case '/': return 'Dashboard';
            case '/wifi': return 'WiFi Configuration';
            case '/devices': return 'Device Manager';
            case '/security': return 'Security Settings';
            case '/system': return 'System Status';
            case '/network': return 'Network Configuration';
            default: return 'Router Admin';
        }
    };

    return (
        <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
            {/* Sidebar: Navigasi Kiri */}
            <div className="w-64 flex-shrink-0 border-r border-gray-800 bg-gray-900 flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        RouterAdmin
                    </h1>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <SidebarItem icon={LayoutDashboard} label="Overview" to="/" />
                    <SidebarItem icon={Network} label="Network" to="/network" />
                    <SidebarItem icon={Wifi} label="WiFi Settings" to="/wifi" />
                    <SidebarItem icon={Smartphone} label="Devices" to="/devices" />
                    <SidebarItem icon={Shield} label="Security" to="/security" />
                    <SidebarItem icon={Settings} label="System" to="/system" />
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium text-red-400 hover:text-red-300 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content Area: Tempat konten halaman berubah-ubah */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 border-b border-gray-800 bg-gray-900 flex items-center justify-between px-8">
                    <h2 className="text-lg font-semibold text-gray-200">{getPageTitle()}</h2>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-medium">
                            AD
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-8">
                    {/* 'children' adalah konten halaman spesifik yang dirender oleh Router */}
                    {children}
                </main>
            </div>
        </div>
    );
};
