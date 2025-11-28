import React from 'react';
import { ArrowRight, Download } from 'lucide-react';

export default function DepartmentCard({ course, isActive, onSelect }) {
    const IconComponent = course.icon;
    return (
        <div>
            <button
                onClick={onSelect}
                className={`w-full text-left px-6 py-4 rounded-lg font-semibold flex items-center gap-3 transition-all ${isActive
                    ? "bg-blue-900 text-white shadow-md transform scale-105"
                    : "bg-white text-slate-600 hover:bg-gray-50 border border-gray-100"
                    }`}
            >
                <IconComponent size={20} />
                {course.name}
            </button>
        </div>
    );
};