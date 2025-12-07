import React, { useState, useEffect } from 'react';
import { Network as NetworkIcon, Save, RefreshCw } from 'lucide-react';

interface NetworkState {
    lan: { [key: string]: string };
    dhcp: { [key: string]: any };
    [key: string]: any;
}

export const Network = () => {
    const [settings, setSettings] = useState<NetworkState>({
        lan: { ip: '', subnet: '', gateway: '', dns: '' },
        dhcp: { enabled: true, startIp: '', endIp: '', leaseTime: 0 }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/network');
            const data = await res.json();
            setSettings(data);
        } catch (error) {
            console.error('Failed to fetch network settings');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (section: string, field: string, value: any) => {
        setSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:5000/api/network', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });
            alert('Network Settings Saved!');
        } catch (error) {
            console.error('Failed to save settings');
        }
    };

    if (loading) return <div className="text-white p-8">Loading settings...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <NetworkIcon className="text-green-500" />
                    Network Configuration
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* LAN Settings */}
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">LAN Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">IP Address</label>
                            <input
                                type="text"
                                value={settings.lan.ip}
                                onChange={(e) => handleChange('lan', 'ip', e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Subnet Mask</label>
                            <input
                                type="text"
                                value={settings.lan.subnet}
                                onChange={(e) => handleChange('lan', 'subnet', e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Default Gateway</label>
                            <input
                                type="text"
                                value={settings.lan.gateway}
                                onChange={(e) => handleChange('lan', 'gateway', e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">DNS Server</label>
                            <input
                                type="text"
                                value={settings.lan.dns}
                                onChange={(e) => handleChange('lan', 'dns', e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                            />
                        </div>
                    </div>
                </div>

                {/* DHCP Settings */}
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-white">DHCP Server</h3>
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={settings.dhcp.enabled}
                                onChange={(e) => handleChange('dhcp', 'enabled', e.target.checked)}
                                className="w-5 h-5 rounded border-gray-700 bg-gray-900 text-blue-600"
                            />
                            <span className="text-gray-300">Enable DHCP</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Start IP Address</label>
                            <input
                                type="text"
                                value={settings.dhcp.startIp}
                                onChange={(e) => handleChange('dhcp', 'startIp', e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">End IP Address</label>
                            <input
                                type="text"
                                value={settings.dhcp.endIp}
                                onChange={(e) => handleChange('dhcp', 'endIp', e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Lease Time (minutes)</label>
                            <input
                                type="number"
                                value={settings.dhcp.leaseTime}
                                onChange={(e) => handleChange('dhcp', 'leaseTime', parseInt(e.target.value))}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex items-center gap-4">
                    <button
                        type="submit"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                    >
                        <Save size={18} />
                        Save Changes
                    </button>
                    <button
                        type="button"
                        onClick={fetchSettings}
                        className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-200 px-6 py-2.5 rounded-lg font-medium transition-colors"
                    >
                        <RefreshCw size={18} />
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};
