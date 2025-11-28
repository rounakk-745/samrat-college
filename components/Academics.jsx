import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { DEPARTMENTS } from '@/constants';
import SectionTitle from './ui/SectionTitle';
import DepartmentCard from './DepartmentCard';
import DepartmentDetail from './DepartmentDetail';

export default function Academics () {
  const [activeTab, setActiveTab] = useState('bca');
  const course = DEPARTMENTS.find(d => d.id === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <SectionTitle title="Academics" subtitle="Undergraduate Programs Designed for the Future" />
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4 space-y-2">
          {DEPARTMENTS.map(dept => (
            <DepartmentCard
              key={dept.id}
              course={dept}
              isActive={activeTab === dept.id}
              onSelect={() => setActiveTab(dept.id)}
            />
          ))}
          
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <h4 className="font-bold text-yellow-800 mb-2 text-sm">Academic Calendar</h4>
            <p className="text-xs text-yellow-900 mb-3">Check important dates for exams and holidays.</p>
            <button className="text-xs bg-yellow-500 text-blue-900 px-3 py-1 rounded font-bold flex items-center gap-1">
              Download PDF <Download size={12} />
            </button>
          </div>
        </div>

        <DepartmentDetail course={course} />
      </div>
    </div>
  );
};