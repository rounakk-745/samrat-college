'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, Save, X } from 'lucide-react';

export default function NoticesManager() {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingNotice, setEditingNotice] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ date: '', text: '', isNew: false });

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const response = await fetch('/api/admin/notices');
            const data = await response.json();
            if (data.success) setNotices(data.data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = editingNotice ? 'PUT' : 'POST';
            const body = editingNotice ? { ...formData, id: editingNotice.id } : formData;

            const response = await fetch('/api/admin/notices', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const data = await response.json();
            if (data.success) {
                fetchNotices();
                resetForm();
                alert(editingNotice ? 'Notice updated!' : 'Notice created!');
            }
        } catch (error) {
            alert('An error occurred');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this notice?')) return;
        try {
            const response = await fetch(`/api/admin/notices?id=${id}`, { method: 'DELETE' });
            const data = await response.json();
            if (data.success) {
                fetchNotices();
                alert('Notice deleted!');
            }
        } catch (error) {
            alert('An error occurred');
        }
    };

    const handleEdit = (notice) => {
        setEditingNotice(notice);
        setFormData({ date: notice.date, text: notice.text, isNew: notice.new });
        setShowForm(true);
    };

    const resetForm = () => {
        setEditingNotice(null);
        setFormData({ date: '', text: '', isNew: false });
        setShowForm(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-blue-900 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <Link href="/admin" className="flex items-center gap-2 text-blue-200 hover:text-white mb-2">
                        <ArrowLeft size={20} /> Back to Dashboard
                    </Link>
                    <h1 className="text-2xl font-bold">Manage Notices</h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">All Notices</h2>
                    <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800">
                        {showForm ? <X size={20} /> : <Plus size={20} />}
                        <span>{showForm ? 'Cancel' : 'Add New Notice'}</span>
                    </button>
                </div>

                {showForm && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border mb-6">
                        <h3 className="text-xl font-bold mb-4">{editingNotice ? 'Edit Notice' : 'Create New Notice'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Date *</label>
                                <input
                                    type="text"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., 20 Nov 2025"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Notice Text *</label>
                                <textarea
                                    value={formData.text}
                                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    rows="3"
                                    placeholder="Enter notice text"
                                    required
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isNew"
                                    checked={formData.isNew}
                                    onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                                    className="w-4 h-4"
                                />
                                <label htmlFor="isNew" className="text-sm font-medium">Mark as "New"</label>
                            </div>
                            <div className="flex gap-4">
                                <button type="submit" className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                                    <Save size={20} /> {editingNotice ? 'Update' : 'Create'}
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
                        {notices.map((notice) => (
                            <div key={notice.id} className="bg-white p-6 rounded-xl shadow-sm border flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-sm text-gray-500">{notice.date}</span>
                                        {notice.new && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">NEW</span>}
                                    </div>
                                    <p className="text-gray-800">{notice.text}</p>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <button onClick={() => handleEdit(notice)} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                                        <Edit size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(notice.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
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
