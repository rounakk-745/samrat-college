'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useData } from '@/hooks/useData';
import SectionTitle from './ui/SectionTitle';
import Button from './ui/Button';

export default function Placements() {
    const { data: recruiters, loading } = useData('recruiters');

    const recruitersList = recruiters || [];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <SectionTitle title="Placements & Careers" subtitle="Launching Careers in Top Global Firms" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-linear-to-br from-blue-900 to-blue-800 text-white p-8 rounded-xl text-center shadow-lg">
                    <h3 className="text-5xl font-bold text-yellow-400 mb-2">12 LPA</h3>
                    <p className="uppercase tracking-widest text-sm font-medium">Highest Package 2024</p>
                </div>
                <div className="bg-white border p-8 rounded-xl text-center shadow-sm">
                    <h3 className="text-5xl font-bold text-blue-900 mb-2">4.5 LPA</h3>
                    <p className="uppercase tracking-widest text-sm font-medium text-gray-500">Average Package</p>
                </div>
                <div className="bg-white border p-8 rounded-xl text-center shadow-sm">
                    <h3 className="text-5xl font-bold text-green-600 mb-2">120+</h3>
                    <p className="uppercase tracking-widest text-sm font-medium text-gray-500">Recruiters Visited</p>
                </div>
            </div>

            <div className="mb-16">
                <h3 className="text-2xl font-bold text-center mb-8 text-slate-800">Our Top Recruiters</h3>
                {loading ? (
                    <div className="text-center text-gray-500">Loading recruiters...</div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {recruitersList.map((recruiter, i) => (
                            <div key={recruiter.id || i} className="bg-white border rounded h-24 flex items-center justify-center grayscale hover:grayscale-0 transition duration-300 shadow-sm hover:shadow-md">
                                <span className="font-bold text-xl text-slate-600">{recruiter.name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center bg-slate-50 p-8 rounded-xl">
                <div>
                    <h3 className="text-2xl font-bold text-blue-900 mb-4">Placement Training Cell</h3>
                    <p className="text-slate-700 mb-4">
                        Our dedicated Training & Placement Cell ensures every student is industry-ready. We conduct:
                    </p>
                    <ul className="space-y-2 mb-6">
                        {["Aptitude Training", "Mock Interviews with HRs", "Resume Building Workshops", "Technical Bootcamps"].map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-slate-700">
                                <ArrowRight size={14} className="text-yellow-500" /> {item}
                            </li>
                        ))}
                    </ul>
                    <Button primary>Recruiter Registration</Button>
                </div>
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                        alt="Students Discussion"
                        className="rounded-lg shadow-md"
                    />
                </div>
            </div>
        </div>
    );
}
