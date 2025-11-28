'use client';

import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import NoticeItem from './NoticeItem';
import { useData } from '@/hooks/useData';

export default function NoticeBoard() {
    const [isPaused, setIsPaused] = useState(false);
    const { data: notices, loading } = useData('notices');

    const noticeList = notices || [];

    return (
        <div className="hidden lg:block absolute right-4 top-20 w-80 bg-white rounded shadow-2xl overflow-hidden border-t-4 border-red-600">
            <div className="bg-gray-100 p-3 border-b flex justify-between items-center">
                <h3 className="font-bold text-red-600 flex items-center gap-2">
                    <Bell size={16} /> Latest Updates
                </h3>
                <span className="text-xs text-gray-500">Live</span>
            </div>
            <div className="h-64 overflow-hidden p-0 relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
                {loading ? (
                    <div className="p-4 text-center text-gray-500">Loading notices...</div>
                ) : noticeList.length > 0 ? (
                    <ul className={`divide-y ${isPaused ? 'notice-scroll-paused' : 'notice-scroll-animate'}`} >
                        {[...noticeList, ...noticeList].map((notice, index) => (
                            <NoticeItem key={`${notice.id}-${index}`} notice={notice} />
                        ))}
                    </ul>
                ) : (
                    <div className="p-4 text-center text-gray-500">No notices available</div>
                )}
            </div>
            <div className="bg-gray-50 p-2 text-center border-t">
                <button className="text-xs font-bold text-blue-700 hover:underline">
                    View All Notices
                </button>
            </div>
        </div>
    );
}