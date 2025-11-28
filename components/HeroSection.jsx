'use client';

import React from 'react';
import NoticeBoard from "./ui/notice/NoticeBoard"
import Button from './ui/Button';
import { useData } from '@/hooks/useData';

export const HeroSection = ({ setActivePage }) => {
    const { data: content } = useData('content');
    const hero = content?.hero || {};

    return (
        <div className="relative bg-slate-900 h-[500px] overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src={hero.image || "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"}
                    alt="College Campus"
                    className="w-full h-full object-cover opacity-40"
                />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
                <div className="w-full md:w-2/3 lg:w-1/2 pt-10">
                    <div className="bg-yellow-500 text-blue-900 text-xs font-bold inline-block px-3 py-1 rounded mb-4 uppercase tracking-widest">
                        {hero.badge || "Admissions Open 2025-26"}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                        {hero.title ? (
                            <span dangerouslySetInnerHTML={{ __html: hero.title.replace('SAMRAT', '<span class="text-yellow-400">SAMRAT</span>') }} />
                        ) : (
                            <>Shape Your Future at <span className="text-yellow-400">SAMRAT</span></>
                        )}
                    </h1>
                    <p className="text-lg text-gray-200 mb-8 border-l-4 border-yellow-500 pl-4">
                        {hero.subtitle || "Premier Institute for Science, Management & Technology. Join a community of innovators and leaders."}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Button primary onClick={() => setActivePage('admissions')}>
                            Apply Online
                        </Button>
                        <Button onClick={() => setActivePage('academics')}>
                            Explore Courses
                        </Button>
                    </div>
                </div>

                <NoticeBoard />
            </div>
        </div>
    );
};
