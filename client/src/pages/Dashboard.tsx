import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Smartphone, Activity, Download, Upload } from 'lucide-react';

const networkTrafficData = [
    { name: '00:00', download: 45, upload: 12 },
    { name: '04:00', download: 20, upload: 5 },
    { name: '08:00', download: 120, upload: 45 },
    { name: '12:00', download: 250, upload: 80 },
    { name: '16:00', download: 180, upload: 60 },
    { name: '20:00', download: 300, upload: 100 },
    { name: '23:59', download: 150, upload: 40 },
];

const deviceUsageData = [
    { name: 'iPhone 13', usage: 4.5 },
    { name: 'MacBook Pro', usage: 12.2 },
    { name: 'Smart TV', usage: 8.5 },
    { name: 'Gaming PC', usage: 15.1 },
    { name: 'iPad', usage: 2.3 },
];

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
    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Download Speed"
                    value="245.5 Mbps"
                    subtext="Peak: 300 Mbps"
                    icon={Download}
                    color="bg-green-500/20 text-green-500"
                />
                <StatCard
                    title="Upload Speed"
                    value="85.2 Mbps"
                    subtext="Peak: 100 Mbps"
                    icon={Upload}
                    color="bg-blue-500/20 text-blue-500"
                />
                <StatCard
                    title="Connected Devices"
                    value="12"
                    subtext="3 Active Now"
                    icon={Smartphone}
                    color="bg-purple-500/20 text-purple-500"
                />
                <StatCard
                    title="System Load"
                    value="24%"
                    subtext="CPU Usage"
                    icon={Activity}
                    color="bg-orange-500/20 text-orange-500"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-6">Network Traffic (24h)</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={networkTrafficData}>
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
                    <h3 className="text-lg font-semibold text-white mb-6">Bandwidth Usage by Device (GB)</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={deviceUsageData} layout="vertical">
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
