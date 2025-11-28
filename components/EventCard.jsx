import React from 'react';
import { MapPin } from 'lucide-react';

export default function EventCard({ event }) {
    return (
        <div className="bg-white p-4 rounded shadow flex gap-4 items-center border-l-4 border-blue-900 hover:translate-x-2 transition duration-300 cursor-pointer">
            <div className="bg-blue-50 text-blue-900 p-2 rounded text-center min-w-[60px]">
                <span className="block text-lg font-bold">{event.date.split(" ")[0]}</span>
                <span className="block text-xs font-bold uppercase">{event.date.split(" ")[1]}</span>
            </div>
            <div>
                <h4 className="font-bold text-slate-800 text-sm">{event.title}</h4>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin size={10} /> {event.location}
                </p>
            </div>
        </div>
    );
} 