import { useState, useEffect } from 'react';
import { Smartphone, Laptop, Tv, Monitor, Wifi, Trash2 } from 'lucide-react';

const DeviceIcon = ({ type }: { type: string }) => {
    switch (type.toLowerCase()) {
        case 'mobile': return <Smartphone className="text-blue-400" />;
        case 'laptop': return <Laptop className="text-purple-400" />;
        case 'tv': return <Tv className="text-green-400" />;
        case 'desktop': return <Monitor className="text-orange-400" />;
        default: return <Wifi className="text-gray-400" />;
    }
};

export const Devices = () => {
    const [devices, setDevices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDevices();
    }, []);

    const fetchDevices = async () => {
        try {
            const res = await fetch('/api/devices');
            const data = await res.json();
            setDevices(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch devices');
            setLoading(false);
        }
    };

    const deleteDevice = async (id: number) => {
        try {
            await fetch(`/api/devices/${id}`, { method: 'DELETE' });
            setDevices(devices.filter(d => d.id !== id));
        } catch (error) {
            console.error('Failed to delete device');
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Smartphone className="text-purple-500" />
                    Connected Devices
                </h2>
                <div className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
                    <span className="text-gray-400 text-sm">Total Devices: </span>
                    <span className="text-white font-bold">{devices.length}</span>
                </div>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-900/50 border-b border-gray-700">
                                <th className="px-6 py-4 text-sm font-medium text-gray-400">Device Name</th>
                                <th className="px-6 py-4 text-sm font-medium text-gray-400">IP Address</th>
                                <th className="px-6 py-4 text-sm font-medium text-gray-400">Type</th>
                                <th className="px-6 py-4 text-sm font-medium text-gray-400">Status</th>
                                <th className="px-6 py-4 text-sm font-medium text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {devices.map((device) => (
                                <tr key={device.id} className="hover:bg-gray-700/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-gray-700 rounded-lg">
                                                <DeviceIcon type={device.type || 'other'} />
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">{device.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-300 font-mono text-sm">{device.ip}</td>
                                    <td className="px-6 py-4 text-gray-400 text-sm capitalize">{device.type}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${device.status === 'Active'
                                            ? 'bg-green-500/10 text-green-400'
                                            : 'bg-gray-500/10 text-gray-400'
                                            }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${device.status === 'Active' ? 'bg-green-400' : 'bg-gray-400'}`} />
                                            {device.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => deleteDevice(device.id)}
                                            className="text-red-400 hover:text-red-300 p-2 hover:bg-red-400/10 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
