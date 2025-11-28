import React from 'react';
import { Users } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';

export default function About () {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <SectionTitle title="About Us" subtitle="A Legacy of Education Since 1999" />

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                        alt="College Building"
                        className="rounded-lg shadow-xl w-full"
                    />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-blue-900 mb-4">Vision & Mission</h3>
                    <p className="text-slate-700 mb-4 leading-relaxed">
                        <strong>Vision:</strong> To become a global center of learning that fosters innovation, leadership, and human values.
                    </p>
                    <p className="text-slate-700 mb-6 leading-relaxed">
                        <strong>Mission:</strong> To provide affordable quality education, promote research and development, and create a conducive environment for the holistic growth of students.
                    </p>
                    <ul className="space-y-2">
                        {["UGC Recognized", "NAAC 'A' Grade Accredited", "ISO 9001:2015 Certified", "Best Science College Award 2023"].map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-slate-800 font-medium">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">Administration</h3>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                    {[
                        { name: "Sri. A.K. Samrat", role: "Founder Chairman" },
                        { name: "Dr. R.K. Verma", role: "Principal" },
                        { name: "Mrs. S. Devi", role: "Dean of Academics" }
                    ].map((person, idx) => (
                        <div key={idx} className="bg-white p-6 rounded shadow hover:-translate-y-1 transition">
                            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-400">
                                <Users size={40} />
                            </div>
                            <h4 className="font-bold text-lg text-blue-900">{person.name}</h4>
                            <p className="text-sm text-slate-500">{person.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}