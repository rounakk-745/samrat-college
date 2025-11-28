import React from 'react';
import { GraduationCap, ChevronRight, MapPin, Phone, Mail } from 'lucide-react';
import { CONTACT_INFO } from '@/constants';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t-4 border-yellow-500">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <GraduationCap size={28} className="text-yellow-500" />
                        <span className="text-xl font-bold text-white">SAMRAT GROUP</span>
                    </div>
                    <p className="text-sm leading-relaxed mb-6">
                        Empowering the youth of India with world-class education in Science, Commerce, and Technology.
                    </p>
                    <div className="flex gap-4">
                        <div className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center hover:bg-blue-600 cursor-pointer transition">
                            <span className="text-xs">f</span>
                        </div>
                        <div className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center hover:bg-blue-400 cursor-pointer transition">
                            <span className="text-xs">t</span>
                        </div>
                        <div className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center hover:bg-pink-600 cursor-pointer transition">
                            <span className="text-xs">i</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-white font-bold mb-6 uppercase tracking-wide">Quick Links</h3>
                    <ul className="space-y-3 text-sm">
                        {['Admissions 2025', 'Academic Calendar', 'Exam Results', 'Alumni Association', 'Grievance Cell', 'NIRF Ranking'].map((item, i) => (
                            <li key={i} className="hover:text-yellow-500 cursor-pointer flex items-center gap-2">
                                <ChevronRight size={14} /> {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-bold mb-6 uppercase tracking-wide">Departments</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="hover:text-yellow-500 cursor-pointer">Computer Applications (BCA)</li>
                        <li className="hover:text-yellow-500 cursor-pointer">Science (BSc - Phys, Chem, Math)</li>
                        <li className="hover:text-yellow-500 cursor-pointer">Commerce (BCom Hons)</li>
                        <li className="hover:text-yellow-500 cursor-pointer">Research & Innovation</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-bold mb-6 uppercase tracking-wide">Contact Us</h3>
                    <div className="space-y-4 text-sm">
                        <p className="flex gap-3 items-start">
                            <MapPin size={18} className="text-yellow-500 mt-1 shrink-0" />
                            {CONTACT_INFO.address}
                        </p>
                        <p className="flex gap-3 items-center">
                            <Phone size={18} className="text-yellow-500 shrink-0" />
                            {CONTACT_INFO.phone.join(' / ')}
                        </p>
                        <p className="flex gap-3 items-center">
                            <Mail size={18} className="text-yellow-500 shrink-0" />
                            {CONTACT_INFO.email[1]}
                        </p>
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
                <p>&copy; 2025 SAMRAT Group of Institutions. All Rights Reserved.</p>
                <div className="mt-2 space-x-4">
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                    <a href="#" className="hover:text-white">Terms of Use</a>
                    <a href="#" className="hover:text-white text-red-400 font-semibold">Anti-Ragging Policy</a>
                </div>
            </div>
        </footer>
    );
}