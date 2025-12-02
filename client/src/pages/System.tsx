import { Settings, Cpu, HardDrive, Clock, RefreshCw, Download, FileText } from 'lucide-react';

const logs = [
    { id: 1, time: '2023-10-27 14:30:22', level: 'INFO', message: 'Admin user logged in from 192.168.1.102' },
    { id: 2, time: '2023-10-27 12:15:05', level: 'WARN', message: 'High CPU usage detected (85%)' },
    { id: 3, time: '2023-10-27 10:00:00', level: 'INFO', message: 'System scheduled reboot completed' },
    { id: 4, time: '2023-10-26 23:45:11', level: 'ERROR', message: 'Failed to obtain IP address from ISP' },
    { id: 5, time: '2023-10-26 23:44:30', level: 'INFO', message: 'WAN interface link down' },
];

const SystemCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex items-center gap-4">
        <div className={`p-3 rounded-lg ${color}`}>
            <Icon className="text-white" size={24} />
        </div>
        <div>
            <p className="text-gray-400 text-sm font-medium">{title}</p>
            <h3 className="text-xl font-bold text-white">{value}</h3>
        </div>
    </div>
);

export const System = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Settings className="text-gray-400" />
                    System Status
                </h2>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                        <RefreshCw size={16} />
                        Reboot
                    </button>
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                        <Download size={16} />
                        Check Update
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <SystemCard title="Model Name" value="RT-AX88U" icon={Settings} color="bg-blue-500/20" />
                <SystemCard title="Firmware Version" value="3.0.0.4.388" icon={FileText} color="bg-purple-500/20" />
                <SystemCard title="CPU Load" value="12%" icon={Cpu} color="bg-green-500/20" />
                <SystemCard title="RAM Usage" value="456MB / 1GB" icon={HardDrive} color="bg-orange-500/20" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                    <div className="p-6 border-b border-gray-700">
                        <h3 className="text-lg font-semibold text-white">System Logs</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-900/50 border-b border-gray-700">
                                    <th className="px-6 py-4 text-sm font-medium text-gray-400">Time</th>
                                    <th className="px-6 py-4 text-sm font-medium text-gray-400">Level</th>
                                    <th className="px-6 py-4 text-sm font-medium text-gray-400">Message</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {logs.map((log) => (
                                    <tr key={log.id} className="hover:bg-gray-700/30 transition-colors">
                                        <td className="px-6 py-4 text-gray-400 text-sm font-mono">{log.time}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2 py-1 rounded text-xs font-bold ${log.level === 'INFO' ? 'bg-blue-500/10 text-blue-400' :
                                                log.level === 'WARN' ? 'bg-yellow-500/10 text-yellow-400' :
                                                    'bg-red-500/10 text-red-400'
                                                }`}>
                                                {log.level}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-300 text-sm">{log.message}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 space-y-6">
                    <h3 className="text-lg font-semibold text-white">System Uptime</h3>
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-gray-700/50 rounded-full">
                            <Clock className="text-blue-400" size={32} />
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white">14d 2h 15m</p>
                            <p className="text-sm text-gray-400">Since last reboot</p>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 pt-6 space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-400">CPU Temperature</span>
                                <span className="text-white">45°C</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-400">Memory Usage</span>
                                <span className="text-white">45%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
