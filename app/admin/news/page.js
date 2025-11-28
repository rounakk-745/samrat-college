'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, Save, X } from 'lucide-react';

export default function NewsManager() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingNews, setEditingNews] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ text: '' });

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await fetch('/api/admin/news');
            const data = await response.json();
            if (data.success) setNews(data.data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = editingNews ? 'PUT' : 'POST';
            const body = editingNews ? { ...formData, id: editingNews.id } : formData;

            const response = await fetch('/api/admin/news', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const data = await response.json();
            if (data.success) {
                fetchNews();
                resetForm();
                alert(editingNews ? 'News updated!' : 'News created!');
            }
        } catch (error) {
            alert('An error occurred');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this news item?')) return;
        try {
            const response = await fetch(`/api/admin/news?id=${id}`, { method: 'DELETE' });
            const data = await response.json();
            if (data.success) {
                fetchNews();
                alert('News deleted!');
            }
        } catch (error) {
            alert('An error occurred');
        }
    };

    const handleEdit = (newsItem) => {
        setEditingNews(newsItem);
        setFormData({ text: newsItem.text });
        setShowForm(true);
    };

    const resetForm = () => {
        setEditingNews(null);
        setFormData({ text: '' });
        setShowForm(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-blue-900 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <Link href="/admin" className="flex items-center gap-2 text-blue-200 hover:text-white mb-2">
                        <ArrowLeft size={20} /> Back to Dashboard
                    </Link>
                    <h1 className="text-2xl font-bold">Manage News Ticker</h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">All News Items</h2>
                    <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800">
                        {showForm ? <X size={20} /> : <Plus size={20} />}
                        <span>{showForm ? 'Cancel' : 'Add News Item'}</span>
                    </button>
                </div>

                {showForm && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border mb-6">
                        <h3 className="text-xl font-bold mb-4">{editingNews ? 'Edit News Item' : 'Create News Item'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">News Text *</label>
                                <input
                                    type="text"
                                    value={formData.text}
                                    onChange={(e) => setFormData({ text: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., ★ Admissions for BSc/BCA 2025 batch are closing soon."
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">Tip: Start with ★ for visual consistency</p>
                            </div>
                            <div className="flex gap-4">
                                <button type="submit" className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                                    <Save size={20} /> {editingNews ? 'Update' : 'Create'}
                                </button>
                                <button type="button" onClick={resetForm} className="px-6 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                            </div>
                        </form>
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-12"><p className="text-gray-500">Loading...</p></div>
                ) : (
                    <div className="space-y-4">
                        {news.map((item) => (
                            <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border flex justify-between items-center">
                                <p className="text-gray-800 flex-1">{item.text}</p>
                                <div className="flex gap-2 ml-4">
                                    <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                                        <Edit size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
