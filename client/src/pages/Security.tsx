import { useState } from 'react';
import { Shield, Lock, Globe, Plus, Trash2 } from 'lucide-react';

export const Security = () => {
    const [firewallEnabled, setFirewallEnabled] = useState(true);
    const [vpnEnabled, setVpnEnabled] = useState(false);
    const [parentalControl, setParentalControl] = useState(false);

    const [ports, setPorts] = useState([
        { id: 1, name: 'Minecraft Server', port: '25565', ip: '192.168.1.104', protocol: 'TCP/UDP' },
        { id: 2, name: 'Web Server', port: '80', ip: '192.168.1.102', protocol: 'TCP' },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [newRule, setNewRule] = useState({ name: '', port: '', ip: '', protocol: 'TCP' });

    const addRule = (e: React.FormEvent) => {
        e.preventDefault();
        setPorts([...ports, { id: Date.now(), ...newRule }]);
        setShowModal(false);
        setNewRule({ name: '', port: '', ip: '', protocol: 'TCP' });
    };

    const deletePort = (id: number) => {
        setPorts(ports.filter(p => p.id !== id));
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 relative">
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 w-full max-w-md">
                        <h3 className="text-xl font-bold text-white mb-4">Add Port Forwarding Rule</h3>
                        <form onSubmit={addRule} className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-400">Service Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white mt-1"
                                    value={newRule.name}
                                    onChange={e => setNewRule({ ...newRule, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-gray-400">Port</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white mt-1"
                                        value={newRule.port}
                                        onChange={e => setNewRule({ ...newRule, port: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-400">Protocol</label>
                                    <select
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white mt-1"
                                        value={newRule.protocol}
                                        onChange={e => setNewRule({ ...newRule, protocol: e.target.value })}
                                    >
                                        <option>TCP</option>
                                        <option>UDP</option>
                                        <option>TCP/UDP</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm text-gray-400">Local IP</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white mt-1"
                                    value={newRule.ip}
                                    onChange={e => setNewRule({ ...newRule, ip: e.target.value })}
                                />
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Add Rule
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Shield className="text-green-500" />
                    Security Settings
                </h2>
            </div>

            {/* Toggles Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex flex-col justify-between h-40">
                    <div className="flex justify-between items-start">
                        <div className="p-3 bg-green-500/10 rounded-lg">
                            <Shield className="text-green-500" size={24} />
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={firewallEnabled} onChange={() => setFirewallEnabled(!firewallEnabled)} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white">Firewall</h3>
                        <p className="text-sm text-gray-400">Protect network from intrusion</p>
                    </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex flex-col justify-between h-40">
                    <div className="flex justify-between items-start">
                        <div className="p-3 bg-blue-500/10 rounded-lg">
                            <Globe className="text-blue-500" size={24} />
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={vpnEnabled} onChange={() => setVpnEnabled(!vpnEnabled)} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white">VPN Service</h3>
                        <p className="text-sm text-gray-400">Encrypt internet traffic</p>
                    </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex flex-col justify-between h-40">
                    <div className="flex justify-between items-start">
                        <div className="p-3 bg-purple-500/10 rounded-lg">
                            <Lock className="text-purple-500" size={24} />
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={parentalControl} onChange={() => setParentalControl(!parentalControl)} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white">Parental Control</h3>
                        <p className="text-sm text-gray-400">Restrict content access</p>
                    </div>
                </div>
            </div>

            {/* Port Forwarding Section */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white">Port Forwarding</h3>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        <Plus size={16} />
                        Add Rule
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-900/50 border-b border-gray-700">
                                <th className="px-6 py-4 text-sm font-medium text-gray-400">Service Name</th>
                                <th className="px-6 py-4 text-sm font-medium text-gray-400">Port Range</th>
                                <th className="px-6 py-4 text-sm font-medium text-gray-400">Local IP</th>
                                <th className="px-6 py-4 text-sm font-medium text-gray-400">Protocol</th>
                                <th className="px-6 py-4 text-sm font-medium text-gray-400 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {ports.map((port) => (
                                <tr key={port.id} className="hover:bg-gray-700/30 transition-colors">
                                    <td className="px-6 py-4 text-white font-medium">{port.name}</td>
                                    <td className="px-6 py-4 text-gray-300 font-mono text-sm">{port.port}</td>
                                    <td className="px-6 py-4 text-gray-300 font-mono text-sm">{port.ip}</td>
                                    <td className="px-6 py-4 text-gray-400 text-sm">{port.protocol}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => deletePort(port.id)}
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
