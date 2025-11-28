import React from 'react';

export default function SectionTitle({ title, subtitle }) {
    return (
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 uppercase tracking-wider border-b-4 border-yellow-500 inline-block pb-2 mb-4">
                {title}
            </h2>
            {subtitle && <p className="text-slate-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>
    )
}