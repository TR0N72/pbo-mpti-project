import { useState } from 'react';
import { Smartphone, Laptop, Tv, Monitor, Ban, CheckCircle, Wifi } from 'lucide-react';

const initialDevices = [
    { id: 1, name: 'iPhone 13 Pro', ip: '192.168.1.101', mac: 'A1:B2:C3:D4:E5:F6', type: 'mobile', status: 'online', blocked: false },
    { id: 2, name: 'MacBook Pro M1', ip: '192.168.1.102', mac: '11:22:33:44:55:66', type: 'laptop', status: 'online', blocked: false },
    { id: 3, name: 'Samsung Smart TV', ip: '192.168.1.103', mac: 'AA:BB:CC:DD:EE:FF', type: 'tv', status: 'offline', blocked: false },
    { id: 4, name: 'Gaming Desktop', ip: '192.168.1.104', mac: '99:88:77:66:55:44', type: 'desktop', status: 'online', blocked: false },
    { id: 5, name: 'Unknown Device', ip: '192.168.1.105', mac: '12:34:56:78:90:AB', type: 'other', status: 'online', blocked: true },
];

const DeviceIcon = ({ type }: { type: string }) => {
    switch (type) {
        case 'mobile': return <Smartphone className="text-blue-400" />;
        case 'laptop': return <Laptop className="text-purple-400" />;
        case 'tv': return <Tv className="text-green-400" />;
        case 'desktop': return <Monitor className="text-orange-400" />;
        default: return <Wifi className="text-gray-400" />;
    }
};

export const Devices = () => {
    const [devices, setDevices] = useState(initialDevices);

    const toggleBlock = (id: number) => {
        setDevices(devices.map(device =>
            device.id === id ? { ...device, blocked: !device.blocked } : device
        ));
    };

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
                                <th className="px-6 py-4 text-sm font-medium text-gray-400">MAC Address</th>
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
                                                <DeviceIcon type={device.type} />
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">{device.name}</p>
                                                <p className="text-xs text-gray-500 capitalize">{device.type}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-300 font-mono text-sm">{device.ip}</td>
                                    <td className="px-6 py-4 text-gray-400 font-mono text-sm">{device.mac}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${device.blocked
                                            ? 'bg-red-500/10 text-red-400'
                                            : device.status === 'online'
                                                ? 'bg-green-500/10 text-green-400'
                                                : 'bg-gray-500/10 text-gray-400'
                                            }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${device.blocked ? 'bg-red-400' : device.status === 'online' ? 'bg-green-400' : 'bg-gray-400'
                                                }`} />
                                            {device.blocked ? 'Blocked' : device.status === 'online' ? 'Online' : 'Offline'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => toggleBlock(device.id)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${device.blocked
                                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                                : 'bg-red-600/10 hover:bg-red-600/20 text-red-400'
                                                }`}
                                        >
                                            {device.blocked ? (
                                                <span className="flex items-center gap-1"><CheckCircle size={14} /> Unblock</span>
                                            ) : (
                                                <span className="flex items-center gap-1"><Ban size={14} /> Block</span>
                                            )}
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
