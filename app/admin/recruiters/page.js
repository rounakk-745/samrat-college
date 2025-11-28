'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, Save, X } from 'lucide-react';

export default function RecruitersManager() {
    const [recruiters, setRecruiters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingRecruiter, setEditingRecruiter] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '' });

    useEffect(() => {
        fetchRecruiters();
    }, []);

    const fetchRecruiters = async () => {
        try {
            const response = await fetch('/api/admin/recruiters');
            const data = await response.json();
            if (data.success) setRecruiters(data.data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = editingRecruiter ? 'PUT' : 'POST';
            const body = editingRecruiter ? { ...formData, id: editingRecruiter.id } : formData;

            const response = await fetch('/api/admin/recruiters', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const data = await response.json();
            if (data.success) {
                fetchRecruiters();
                resetForm();
                alert(editingRecruiter ? 'Recruiter updated!' : 'Recruiter added!');
            }
        } catch (error) {
            alert('An error occurred');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this recruiter?')) return;
        try {
            const response = await fetch(`/api/admin/recruiters?id=${id}`, { method: 'DELETE' });
            const data = await response.json();
            if (data.success) {
                fetchRecruiters();
                alert('Recruiter deleted!');
            }
        } catch (error) {
            alert('An error occurred');
        }
    };

    const handleEdit = (recruiter) => {
        setEditingRecruiter(recruiter);
        setFormData({ name: recruiter.name });
        setShowForm(true);
    };

    const resetForm = () => {
        setEditingRecruiter(null);
        setFormData({ name: '' });
        setShowForm(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-blue-900 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <Link href="/admin" className="flex items-center gap-2 text-blue-200 hover:text-white mb-2">
                        <ArrowLeft size={20} /> Back to Dashboard
                    </Link>
                    <h1 className="text-2xl font-bold">Manage Recruiters</h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">All Recruiters</h2>
                    <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800">
                        {showForm ? <X size={20} /> : <Plus size={20} />}
                        <span>{showForm ? 'Cancel' : 'Add Recruiter'}</span>
                    </button>
                </div>

                {showForm && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border mb-6">
                        <h3 className="text-xl font-bold mb-4">{editingRecruiter ? 'Edit Recruiter' : 'Add New Recruiter'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Company Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ name: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., TCS, Infosys, Wipro"
                                    required
                                />
                            </div>
                            <div className="flex gap-4">
                                <button type="submit" className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                                    <Save size={20} /> {editingRecruiter ? 'Update' : 'Add'}
                                </button>
                                <button type="button" onClick={resetForm} className="px-6 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                            </div>
                        </form>
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-12"><p className="text-gray-500">Loading...</p></div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {recruiters.map((recruiter) => (
                            <div key={recruiter.id} className="bg-white p-6 rounded-xl shadow-sm border">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-lg text-gray-800">{recruiter.name}</h3>
                                    <div className="flex gap-1">
                                        <button onClick={() => handleEdit(recruiter)} className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                                            <Edit size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(recruiter.id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
