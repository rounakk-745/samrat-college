import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { CONTACT_INFO, SOCIAL_LINKS } from '@/constants';

export default function TopBar() {
    return (
        <div className="bg-blue-950 text-gray-300 py-2 text-xs hidden md:block text-center">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                <div className="flex gap-6">
                    <span className="flex items-center gap-2 hover:text-white cursor-pointer">
                        <Phone size={14} /> {CONTACT_INFO.phone[0]}
                    </span>
                    <span className="flex items-center gap-2 hover:text-white cursor-pointer">
                        <Mail size={14} /> {CONTACT_INFO.email[0]}
                    </span>
                    <span className="flex items-center gap-2 hover:text-white cursor-pointer">
                        <MapPin size={14} /> Knowledge City, Odisha, India
                    </span>
                </div>
                <div className="flex space-x-4 text-center">
                    {/* /notices */}
                    <a href="#" className="hover:text-accent-light transition">Notice Board</a>
                    {/* /alumni */}
                    <a href="#" className="hover:text-accent-light transition">Alumni</a>
                    {/* /careers */}
                    <a href="#" className="hover:text-accent-light transition">Careers</a>
                    {/* /login */}
                    <a href="#" className="bg-accent hover:bg-accent-light text-white px-3 py-0.5 rounded font-medium transition text-xs">
                        Student Portal
                    </a>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="h-4 w-px bg-gray-600"></div>
                    <div className="flex gap-3">
                        <Facebook size={14} className="cursor-pointer hover:text-blue-500" />
                        <Twitter size={14} className="cursor-pointer hover:text-blue-400" />
                        <Linkedin size={14} className="cursor-pointer hover:text-blue-600" />
                        <Instagram size={14} className="cursor-pointer hover:text-pink-500" />
                    </div>
                </div>
            </div>
        </div>
    );
}