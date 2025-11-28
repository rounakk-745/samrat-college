'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

export default function ContentManager() {
    const [content, setContent] = useState({ hero: {}, principal: {} });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await fetch('/api/admin/content');
            const data = await response.json();
            if (data.success) setContent(data.data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (section) => {
        try {
            const response = await fetch('/api/admin/content', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ section, data: content[section] })
            });

            const data = await response.json();
            if (data.success) {
                alert(`${section === 'hero' ? 'Hero Section' : "Principal's Message"} updated successfully!`);
            }
        } catch (error) {
            alert('An error occurred');
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
                    <h1 className="text-2xl font-bold">Manage Content</h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
                {/* Hero Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h2 className="text-2xl font-bold mb-6">Hero Section</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Badge Text</label>
                            <input
                                type="text"
                                value={content.hero.badge || ''}
                                onChange={(e) => setContent({ ...content, hero: { ...content.hero, badge: e.target.value } })}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="e.g., Admissions Open 2025-26"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Title</label>
                            <input
                                type="text"
                                value={content.hero.title || ''}
                                onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="e.g., Shape Your Future at SAMRAT"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Subtitle</label>
                            <textarea
                                value={content.hero.subtitle || ''}
                                onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })}
                                className="w-full px-4 py-2 border rounded-lg"
                                rows="3"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Background Image URL</label>
                            <input
                                type="text"
                                value={content.hero.image || ''}
                                onChange={(e) => setContent({ ...content, hero: { ...content.hero, image: e.target.value } })}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>
                        <button
                            onClick={() => handleUpdate('hero')}
                            className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                        >
                            <Save size={20} /> Update Hero Section
                        </button>
                    </div>
                </div>

                {/* Principal's Message */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h2 className="text-2xl font-bold mb-6">Principal's Message</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Name</label>
                            <input
                                type="text"
                                value={content.principal.name || ''}
                                onChange={(e) => setContent({ ...content, principal: { ...content.principal, name: e.target.value } })}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Designation</label>
                            <input
                                type="text"
                                value={content.principal.designation || ''}
                                onChange={(e) => setContent({ ...content, principal: { ...content.principal, designation: e.target.value } })}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Message</label>
                            <textarea
                                value={content.principal.message || ''}
                                onChange={(e) => setContent({ ...content, principal: { ...content.principal, message: e.target.value } })}
                                className="w-full px-4 py-2 border rounded-lg"
                                rows="4"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Photo URL</label>
                            <input
                                type="text"
                                value={content.principal.image || ''}
                                onChange={(e) => setContent({ ...content, principal: { ...content.principal, image: e.target.value } })}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>
                        <button
                            onClick={() => handleUpdate('principal')}
                            className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                        >
                            <Save size={20} /> Update Principal's Message
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
