'use client';

import React from 'react';
import StatCard from './StatCard';
import { useData } from '@/hooks/useData';

export default function StatsGrid() {
    const { data: stats, loading } = useData('stats');

    if (loading) {
        return (
            <div className="bg-white py-12 border-b">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center text-gray-500">Loading statistics...</div>
                </div>
            </div>
        );
    }

    const statsList = stats || [];

    return (
        <div className="bg-white py-12 border-b">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {statsList.map((stat, idx) => (
                        <StatCard key={stat.id || idx} stat={stat} />
                    ))}
                </div>
            </div>
        </div>
    );
}