'use client';

import React from 'react';
import { useData } from '@/hooks/useData';

export default function NewsTicker() {
    const { data: newsItems, loading } = useData('news');

    if (loading) {
        return (
            <div className="bg-blue-800 text-white py-2 overflow-hidden flex items-center">
                <div className="bg-red-600 px-4 py-1 font-bold text-xs uppercase tracking-wider mx-2 z-10 whitespace-nowrap">
                    Breaking News
                </div>
                <div className="text-sm font-medium">Loading...</div>
            </div>
        );
    }

    const items = newsItems || [];

    return (
        <div className="bg-blue-800 text-white py-2 overflow-hidden flex items-center">
            <div className="bg-red-600 px-4 py-1 font-bold text-xs uppercase tracking-wider mx-2 z-10 whitespace-nowrap">
                Breaking News
            </div>
            <div className="whitespace-nowrap animate-marquee flex gap-8 text-sm font-medium">
                {items.map((item, idx) => (
                    <span key={item.id || idx}>{item.text}</span>
                ))}
            </div>
        </div>
    );
}