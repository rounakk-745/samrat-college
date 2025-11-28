import React from 'react';

export default function NoticeItem({ notice }) {
    return (
        <li className="p-3 hover:bg-blue-50 cursor-pointer transition">
            <p className="text-sm font-medium text-slate-800 mb-1 hover:text-blue-700 hover:underline">
                {notice.text}
                {notice.new && (
                    <span className="ml-2 text-[10px] bg-red-100 text-red-600 px-1 rounded animate-pulse">
                        NEW
                    </span>
                )}
            </p>
            <span className="text-xs text-gray-400 block">{notice.date}</span>
        </li>
    );
}
