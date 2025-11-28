'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    Calendar, Bell, Newspaper, BarChart3, Briefcase, FileText,
    Upload, LogOut, Home
} from 'lucide-react';

export default function AdminDashboard() {
    const router = useRouter();
    const [stats, setStats] = useState({
        events: 0,
        notices: 0,
        news: 0,
        recruiters: 0
    });

    useEffect(() => {
        // Fetch counts
        async function fetchStats() {
            try {
                const [events, notices, news, recruiters] = await Promise.all([
                    fetch('/api/admin/events').then(r => r.json()),
                    fetch('/api/admin/notices').then(r => r.json()),
                    fetch('/api/admin/news').then(r => r.json()),
                    fetch('/api/admin/recruiters').then(r => r.json())
                ]);

                setStats({
                    events: events.data?.length || 0,
                    notices: notices.data?.length || 0,
                    news: news.data?.length || 0,
                    recruiters: recruiters.data?.length || 0
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        }

        fetchStats();
    }, [router]);

    const handleLogout = async () => {
        try {
            await fetch('/api/admin/auth', { method: 'DELETE' });
            router.push('/admin/login');
        } catch (error) {
            console.error('Logout error:', error);
            router.push('/admin/login');
        }
    };

    const menuItems = [
        { icon: Calendar, label: 'Events', href: '/admin/events', count: stats.events },
        { icon: Bell, label: 'Notices', href: '/admin/notices', count: stats.notices },
        { icon: Newspaper, label: 'News Ticker', href: '/admin/news', count: stats.news },
        { icon: BarChart3, label: 'Statistics', href: '/admin/stats' },
        { icon: Briefcase, label: 'Recruiters', href: '/admin/recruiters', count: stats.recruiters },
        { icon: FileText, label: 'Content', href: '/admin/content' },
        { icon: Upload, label: 'Media Upload', href: '/admin/media' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-blue-900 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Admin Portal</h1>
                        <p className="text-sm text-blue-200">Samrat Group of Institutions</p>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            href="/"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-800 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Home size={20} />
                            <span>View Website</span>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                        >
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h2>
                    <p className="text-gray-600">Manage your website content</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Total Events</p>
                                <p className="text-3xl font-bold text-blue-900">{stats.events}</p>
                            </div>
                            <Calendar className="text-blue-500" size={40} />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Total Notices</p>
                                <p className="text-3xl font-bold text-blue-900">{stats.notices}</p>
                            </div>
                            <Bell className="text-red-500" size={40} />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">News Items</p>
                                <p className="text-3xl font-bold text-blue-900">{stats.news}</p>
                            </div>
                            <Newspaper className="text-green-500" size={40} />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Recruiters</p>
                                <p className="text-3xl font-bold text-blue-900">{stats.recruiters}</p>
                            </div>
                            <Briefcase className="text-purple-500" size={40} />
                        </div>
                    </div>
                </div>

                {/* Menu Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <item.icon className="text-blue-900 group-hover:text-blue-600 transition-colors" size={32} />
                                {item.count !== undefined && (
                                    <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-semibold">
                                        {item.count}
                                    </span>
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-900 transition-colors">
                                {item.label}
                            </h3>
                            <p className="text-sm text-gray-500 mt-2">
                                Manage {item.label.toLowerCase()}
                            </p>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
