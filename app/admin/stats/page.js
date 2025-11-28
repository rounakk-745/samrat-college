'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

export default function StatsManager() {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/admin/stats');
            const data = await response.json();
            if (data.success) setStats(data.data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (id, field, value) => {
        const updatedStats = stats.map(stat =>
            stat.id === id ? { ...stat, [field]: value } : stat
        );
        setStats(updatedStats);
    };

    const handleSave = async (stat) => {
        setSaving(true);
        try {
            const response = await fetch('/api/admin/stats', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(stat)
            });

            const data = await response.json();
            if (data.success) {
                alert('Statistic updated successfully!');
            }
        } catch (error) {
            alert('An error occurred');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-blue-900 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <Link href="/admin" className="flex items-center gap-2 text-blue-200 hover:text-white mb-2">
                        <ArrowLeft size={20} /> Back to Dashboard
                    </Link>
                    <h1 className="text-2xl font-bold">Manage Statistics</h1>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Homepage Statistics</h2>
                    <p className="text-gray-600">Update the statistics displayed on the homepage</p>
                </div>

                <div className="space-y-6">
                    {stats.map((stat) => (
                        <div key={stat.id} className="bg-white p-6 rounded-xl shadow-sm border">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Label</label>
                                    <input
                                        type="text"
                                        value={stat.label}
                                        onChange={(e) => handleUpdate(stat.id, 'label', e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g., Years of Excellence"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Value</label>
                                    <input
                                        type="text"
                                        value={stat.value}
                                        onChange={(e) => handleUpdate(stat.id, 'value', e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g., 25+"
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <button
                                    onClick={() => handleSave(stat)}
                                    disabled={saving}
                                    className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                                >
                                    <Save size={20} /> Save Changes
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
