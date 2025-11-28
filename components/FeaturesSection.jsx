import React from 'react';
import { BookOpen, TrendingUp, Globe, ArrowRight } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';

export default function FeaturesSection({ setActivePage }) {
    return (
        <div className="py-16 max-w-7xl mx-auto px-4">
            <SectionTitle
                title="Why Choose Samrat?"
                subtitle="We provide an environment that fosters intellectual curiosity and professional growth."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition border-l-4 border-blue-500 group">
                    <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 transition duration-300">
                        <BookOpen className="text-blue-600 group-hover:text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-800">Academic Excellence</h3>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        Curriculum designed by industry experts. Focus on practical learning, projects, and continuous assessment.
                    </p>
                    <button
                        onClick={() => setActivePage('academics')}
                        className="text-blue-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                    >
                        Learn More <ArrowRight size={14} />
                    </button>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition border-l-4 border-yellow-500 group">
                    <div className="bg-yellow-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:bg-yellow-500 transition duration-300">
                        <TrendingUp className="text-yellow-600 group-hover:text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-800">Placement Support</h3>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        Dedicated placement cell with 100+ recruiters. Soft skills training, mock interviews, and internship support.
                    </p>
                    <button
                        onClick={() => setActivePage('placements')}
                        className="text-yellow-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                    >
                        See Records <ArrowRight size={14} />
                    </button>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition border-l-4 border-green-500 group">
                    <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-600 transition duration-300">
                        <Globe className="text-green-600 group-hover:text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-800">Vibrant Campus Life</h3>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        15+ Student clubs, annual fests, modern sports complex, and a lush green WiFi-enabled campus.
                    </p>
                    <button className="text-green-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                        View Gallery <ArrowRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}