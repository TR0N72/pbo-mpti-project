import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Smartphone, Activity, Download, Globe } from 'lucide-react';
import io from 'socket.io-client';

const StatCard = ({ title, value, subtext, icon: Icon, color }: any) => (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-gray-400 text-sm font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-white mt-2">{value}</h3>
            </div>
            <div className={`p-3 rounded-lg ${color}`}>
                <Icon className="text-white" size={24} />
            </div>
        </div>
        <div className="mt-4">
            <span className="text-gray-500 text-sm">{subtext}</span>
        </div>
    </div>
);

export const Dashboard = () => {
    const [trafficData, setTrafficData] = useState<any[]>([]);
    const [deviceCount, setDeviceCount] = useState(0);
    const [wanIp, setWanIp] = useState('Checking...');
    const [networkStats, setNetworkStats] = useState({
        download: 0,
        upload: 0,
        cpu: 0,
        ram: 0
    });

    useEffect(() => {
        // Fetch WAN IP from network settings (simulated via LAN/WAN config)
        fetch('/api/network')
            .then(res => res.json())
            .then(data => {
                setWanIp(data.lan?.ip || '192.168.1.1'); // Using LAN IP as "Router IP" for now
            })
            .catch(() => setWanIp('Unknown'));

        // Fetch connected devices
        fetch('/api/devices')
            .then(res => res.json())
            .then(data => setDeviceCount(data.length))
            .catch(() => setDeviceCount(0));

        // Socket for real-time traffic
        const socket = io();

        socket.on('traffic_update', (data: any) => {
            setNetworkStats(prev => ({
                ...prev,
                download: data.download,
                upload: data.upload
            }));

            setTrafficData(prev => {
                const newData = [...prev, {
                    name: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    download: data.download,
                    upload: data.upload
                }];
                if (newData.length > 20) newData.shift(); // Keep last 20 points
                return newData;
            });
        });

        socket.on('initial_status', (status: any) => {
            setNetworkStats({
                download: status.downloadSpeed,
                upload: status.uploadSpeed,
                cpu: status.cpuLoad,
                ram: status.ramUsage
            });
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Router IP"
                    value={wanIp}
                    subtext="Local LAN Address"
                    icon={Globe}
                    color="bg-blue-500/20 text-blue-500"
                />
                <StatCard
                    title="Internet Speed"
                    value={`${networkStats.download} Mbps`}
                    subtext={`Upload: ${networkStats.upload} Mbps`}
                    icon={Download}
                    color="bg-green-500/20 text-green-500"
                />
                <StatCard
                    title="Connected Devices"
                    value={deviceCount}
                    subtext="Active clients"
                    icon={Smartphone}
                    color="bg-purple-500/20 text-purple-500"
                />
                <StatCard
                    title="System Load"
                    value={`${networkStats.cpu || 24}%`}
                    subtext="CPU Usage"
                    icon={Activity}
                    color="bg-orange-500/20 text-orange-500"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 text-white">
                    <h3 className="text-lg font-semibold text-white mb-6">Real-time Traffic</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                            <AreaChart data={trafficData}>
                                <defs>
                                    <linearGradient id="colorDownload" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorUpload" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                                <XAxis dataKey="name" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="download" stroke="#22c55e" fillOpacity={1} fill="url(#colorDownload)" name="Download" />
                                <Area type="monotone" dataKey="upload" stroke="#3b82f6" fillOpacity={1} fill="url(#colorUpload)" name="Upload" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-6">Bandwidth Usage (Mock)</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                            <BarChart data={[
                                { name: 'iPhone 13', usage: 4.5 },
                                { name: 'MacBook Pro', usage: 12.2 },
                                { name: 'Smart TV', usage: 8.5 },
                                { name: 'Gaming PC', usage: 15.1 }
                            ]} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
                                <XAxis type="number" stroke="#9CA3AF" />
                                <YAxis dataKey="name" type="category" stroke="#9CA3AF" width={100} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff' }}
                                    cursor={{ fill: '#374151' }}
                                />
                                <Bar dataKey="usage" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};
