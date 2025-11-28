import React, { useState } from 'react';
import { DEPARTMENT_DETAILS, FACULTY } from '@/constants';
import { BookOpen, Users, Monitor, FileText, CheckCircle } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';

export default function DepartmentDetails () {
  const { deptId } = useParams<{ deptId: string }>("");
  const [activeTab, setActiveTab] = useState<'overview' | 'faculty' | 'facilities'>('overview');

  const dept = DEPARTMENT_DETAILS[deptId || ''];

  if (!dept) {
    return <Navigate to="/academics" replace />;
  }

  const deptFaculty = FACULTY; 

  return (
    <div className="animate-fadeIn bg-white min-h-screen pb-20">
      <PageHeader title={dept.name} subtitle="Academic Excellence & Innovation" image={dept.image} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
            
            <div className="lg:w-1/4">
                <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100 sticky top-24">
                    <div className="bg-primary p-4 text-white font-bold text-lg">
                        Department Menu
                    </div>
                    <div className="flex flex-col">
                        <button 
                            onClick={() => setActiveTab('overview')}
                            className={`p-4 text-left font-medium border-b transition ${activeTab === 'overview' ? 'bg-secondary text-white' : 'hover:bg-gray-50 text-gray-700'}`}
                        >
                            Overview
                        </button>
                        <button 
                            onClick={() => setActiveTab('faculty')}
                            className={`p-4 text-left font-medium border-b transition ${activeTab === 'faculty' ? 'bg-secondary text-white' : 'hover:bg-gray-50 text-gray-700'}`}
                        >
                            Faculty Members
                        </button>
                        <button 
                            onClick={() => setActiveTab('facilities')}
                            className={`p-4 text-left font-medium transition ${activeTab === 'facilities' ? 'bg-secondary text-white' : 'hover:bg-gray-50 text-gray-700'}`}
                        >
                            Facilities & Labs
                        </button>
                    </div>
                </div>

                <div className="bg-accent text-white p-6 rounded-lg shadow-md mt-8">
                    <h4 className="font-bold text-lg mb-2">Admissions Open</h4>
                    <p className="text-sm mb-4 text-yellow-100">Applications for the upcoming academic year are now being accepted.</p>
                    <button className="w-full bg-white text-accent font-bold py-2 rounded hover:bg-gray-100 transition">
                        Apply Now
                    </button>
                </div>
            </div>

            <div className="lg:w-3/4">
                {activeTab === 'overview' && (
                    <div className="animate-fadeIn">
                        <SectionTitle title="About the Department" />
                        <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                            {dept.about}
                        </p>

                        <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-secondary mb-8">
                            <h3 className="text-xl font-bold text-primary mb-2">Vision</h3>
                            <p className="text-gray-700 italic">"{dept.vision}"</p>
                        </div>

                        <h3 className="text-2xl font-bold text-primary mb-6">Programs Offered</h3>
                        <div className="grid gap-4">
                            {dept.courses.map((course, idx) => (
                                <div key={idx} className="flex items-center p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition">
                                    <div className="p-2 bg-accent/10 rounded-full mr-4 text-accent">
                                        <BookOpen size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-800">{course}</h4>
                                        <a href="#" className="text-sm text-secondary hover:underline flex items-center gap-1 mt-1">
                                            <FileText size={14} /> Download Syllabus
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-6 border border-gray-200 rounded-xl">
                            <h3 className="font-bold text-gray-800 mb-2">Head of Department</h3>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                                <div>
                                    <p className="text-lg font-bold text-primary">{dept.hod}</p>
                                    <p className="text-sm text-gray-500">Contact: hod.{deptId}@samrat.edu.in</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'faculty' && (
                    <div className="animate-fadeIn">
                        <SectionTitle title="Faculty Members" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {deptFaculty.map((f) => (
                                <Card key={f.id} className="p-6 flex items-start gap-4">
                                    <img src={f.image} alt={f.name} className="w-20 h-20 rounded-full object-cover" />
                                    <div>
                                        <h4 className="text-lg font-bold text-primary">{f.name}</h4>
                                        <p className="text-secondary font-medium text-sm">{f.role}</p>
                                        <p className="text-gray-500 text-xs mt-1">{f.qualification}</p>
                                        <p className="text-gray-400 text-xs mt-2">Exp: 10+ Years</p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'facilities' && (
                    <div className="animate-fadeIn">
                        <SectionTitle title="Infrastructure & Labs" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {dept.facilities.map((facility, idx) => (
                                <div key={idx} className="group relative overflow-hidden rounded-xl shadow-md h-48">
                                    <img src={`https://picsum.photos/400/300?random=${200+idx}`} alt={facility} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex items-end p-6">
                                        <span className="text-white font-bold text-lg flex items-center gap-2">
                                            <Monitor className="text-accent" size={20} /> {facility}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-8 bg-gray-50 p-6 rounded-xl">
                            <h4 className="font-bold text-lg mb-4">Department Library</h4>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2 text-gray-700"><CheckCircle size={16} className="text-green-500" /> 2000+ Textbooks & Reference Books</li>
                                <li className="flex items-center gap-2 text-gray-700"><CheckCircle size={16} className="text-green-500" /> Subscription to IEEE & ACM Journals</li>
                                <li className="flex items-center gap-2 text-gray-700"><CheckCircle size={16} className="text-green-500" /> Digital Reading Room</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};