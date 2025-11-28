import React from 'react';

export default function StatCard({ stat }) {
    return (
        <div className="p-4 border rounded-lg hover:shadow-md transition bg-slate-50">
            <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
                {stat.value}
            </h3>
            <p className="text-sm text-slate-600 uppercase tracking-wide font-semibold">
                {stat.label}
            </p>
        </div>
    );
}