'use client';

import React from 'react';
import { Calendar, Award, MapPin } from 'lucide-react';
import { useData } from '@/hooks/useData';
import EventCard from './EventCard';

export default function EventsSection() {
    const { data: events, loading } = useData('events');
    const { data: content } = useData('content');

    const principal = content?.principal || {};

    return (
        <div className="bg-slate-100 py-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    <div className="lg:col-span-1">
                        <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <Calendar className="text-yellow-500" /> Upcoming Events
                        </h3>
                        <div className="space-y-4">
                            {loading ? (
                                <div className="text-gray-500">Loading events...</div>
                            ) : events && events.length > 0 ? (
                                events.map((event, i) => (
                                    <EventCard key={event.id || i} event={event} />
                                ))
                            ) : (
                                <div className="text-gray-500">No upcoming events</div>
                            )}
                        </div>
                        <button className="mt-6 text-blue-700 font-bold text-sm hover:underline">
                            View Full Calendar
                        </button>
                    </div>

                    <div className="lg:col-span-2 bg-white p-8 rounded shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 text-gray-100 -mr-8 -mt-8">
                            <Award size={150} />
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
                            <img
                                src={principal.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"}
                                alt="Principal"
                                className="w-32 h-32 rounded-full object-cover border-4 border-gray-100 shadow-md"
                            />
                            <div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">Principal's Message</h3>
                                <blockquote className="text-slate-600 italic mb-4 text-sm md:text-base">
                                    "{principal.message || "At SAMRAT, we don't just create graduates; we sculpt the leaders of tomorrow."}"
                                </blockquote>
                                <p className="font-bold text-blue-900">{principal.name || "Dr. Rajesh Kumar Verma"}</p>
                                <p className="text-xs text-slate-500 uppercase tracking-wide">{principal.designation || "Principal, Samrat Group of Institutions"}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}