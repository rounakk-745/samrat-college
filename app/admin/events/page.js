'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, Save, X } from 'lucide-react';

export default function EventsManager() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingEvent, setEditingEvent] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        date: '',
        title: '',
        location: '',
        image: ''
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch('/api/admin/events');
            const data = await response.json();
            if (data.success) {
                setEvents(data.data);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = '/api/admin/events';
            const method = editingEvent ? 'PUT' : 'POST';
            const body = editingEvent
                ? { ...formData, id: editingEvent.id }
                : formData;

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const data = await response.json();

            if (data.success) {
                fetchEvents();
                resetForm();
                alert(editingEvent ? 'Event updated successfully!' : 'Event created successfully!');
            } else {
                alert('Error: ' + data.error);
            }
        } catch (error) {
            alert('An error occurred');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this event?')) return;

        try {
            const response = await fetch(`/api/admin/events?id=${id}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (data.success) {
                fetchEvents();
                alert('Event deleted successfully!');
            } else {
                alert('Error: ' + data.error);
            }
        } catch (error) {
            alert('An error occurred');
        }
    };

    const handleEdit = (event) => {
        setEditingEvent(event);
        setFormData({
            date: event.date,
            title: event.title,
            location: event.location,
            image: event.image || ''
        });
        setShowForm(true);
    };

    const resetForm = () => {
        setEditingEvent(null);
        setFormData({ date: '', title: '', location: '', image: '' });
        setShowForm(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-blue-900 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <Link href="/admin" className="flex items-center gap-2 text-blue-200 hover:text-white mb-2">
                        <ArrowLeft size={20} />
                        <span>Back to Dashboard</span>
                    </Link>
                    <h1 className="text-2xl font-bold">Manage Events</h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Add New Button */}
                <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">All Events</h2>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                    >
                        {showForm ? <X size={20} /> : <Plus size={20} />}
                        <span>{showForm ? 'Cancel' : 'Add New Event'}</span>
                    </button>
                </div>

                {/* Form */}
                {showForm && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                            {editingEvent ? 'Edit Event' : 'Create New Event'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Date *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="e.g., 25 DEC"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Location *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="e.g., Main Auditorium"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., Annual Tech Fest 'SAMRAT-TECH 2025'"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Image URL (optional)
                                </label>
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    <Save size={20} />
                                    <span>{editingEvent ? 'Update Event' : 'Create Event'}</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Events List */}
                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Loading events...</p>
                    </div>
                ) : events.length === 0 ? (
                    <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-200 text-center">
                        <p className="text-gray-500">No events found. Create your first event!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <div key={event.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-blue-900 text-white px-3 py-1 rounded font-bold text-sm">
                                        {event.date}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(event)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                            title="Edit"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(event.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                <h3 className="font-bold text-gray-800 mb-2">{event.title}</h3>
                                <p className="text-sm text-gray-600">{event.location}</p>
                                {event.image && (
                                    <div className="mt-4">
                                        <img src={event.image} alt={event.title} className="w-full h-32 object-cover rounded" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
