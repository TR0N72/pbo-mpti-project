import React, { useState, useEffect } from 'react';
import { Wifi, Save, RefreshCw } from 'lucide-react';

export const WifiSettings = () => {
    const [settings, setSettings] = useState({
        ssid: '',
        password: '',
        security: '',
        band: '',
        isHidden: false,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/wifi');
            const data = await res.json();
            setSettings(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch wifi settings');
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetch('/api/wifi', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });
            alert('WiFi Settings Saved!');
        } catch (error) {
            console.error('Failed to save settings');
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Wifi className="text-blue-500" />
                    WiFi Configuration
                </h2>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Network Name (SSID)</label>
                            <input
                                type="text"
                                name="ssid"
                                value={settings.ssid}
                                onChange={handleChange}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={settings.password}
                                onChange={handleChange}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Security Mode</label>
                            <select
                                name="security"
                                value={settings.security}
                                onChange={handleChange}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            >
                                <option value="WPA2">WPA2-Personal</option>
                                <option value="WPA3">WPA3-Personal</option>
                                <option value="WEP">WEP (Not Recommended)</option>
                                <option value="OPEN">Open (No Security)</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Frequency Band</label>
                            <select
                                name="band"
                                value={settings.band}
                                onChange={handleChange}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            >
                                <option value="2.4GHz">2.4 GHz</option>
                                <option value="5GHz">5 GHz</option>
                                <option value="Dual">Dual Band (Smart Connect)</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                        <input
                            type="checkbox"
                            id="isHidden"
                            name="isHidden"
                            checked={settings.isHidden}
                            onChange={handleChange}
                            className="w-4 h-4 rounded border-gray-700 bg-gray-900 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="isHidden" className="text-sm text-gray-300">Hide Network Name (SSID)</label>
                    </div>

                    <div className="pt-4 flex items-center gap-4 border-t border-gray-700">
                        <button
                            type="submit"
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                        >
                            <Save size={18} />
                            Save Changes
                        </button>
                        <button
                            type="button"
                            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-200 px-6 py-2.5 rounded-lg font-medium transition-colors"
                            onClick={fetchSettings}
                        >
                            <RefreshCw size={18} />
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
