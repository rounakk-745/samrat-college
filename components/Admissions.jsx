import React from 'react';
import { CheckCircle, Download, FileText, HelpCircle } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';
import Button from './ui/Button';

export default function Admissions () {
  return (
    <div className="py-12 bg-white min-h-screen">
        
        {/* Hero for Admissions */}
        <div className="bg-blue-900 text-white py-16 mb-12">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Admissions 2024-25</h1>
                <p className="text-xl text-gray-300">Your journey to excellence begins here.</p>
            </div>
        </div>

        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">
                    
                    {/* Steps */}
                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-6">Admission Process</h2>
                        <div className="space-y-6">
                            {[
                                { title: 'Online Registration', desc: 'Fill the application form available on this portal with basic details.' },
                                { title: 'Document Verification', desc: 'Upload scanned copies of marksheets (10th, 12th), ID proof, and photo.' },
                                { title: 'Entrance / Merit List', desc: 'Selection based on merit in qualifying exam or entrance test score (if applicable).' },
                                { title: 'Fee Payment', desc: 'Pay admission fees online to confirm your seat.' }
                            ].map((step, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="shrink-0 w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                                        <p className="text-gray-600">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Fee Structure */}
                    <section className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                        <h2 className="text-2xl font-bold text-primary mb-6">Fee Structure (Per Year)</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b-2 border-gray-200">
                                        <th className="py-3 text-gray-600 font-semibold">Course</th>
                                        <th className="py-3 text-gray-600 font-semibold">Tuition Fee</th>
                                        <th className="py-3 text-gray-600 font-semibold">Development Fee</th>
                                        <th className="py-3 text-gray-600 font-semibold">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {[
                                        { c: 'B.Sc (Gen)', t: '₹ 25,000', d: '₹ 5,000', tot: '₹ 30,000' },
                                        { c: 'B.Sc (Comp Sci)', t: '₹ 35,000', d: '₹ 7,000', tot: '₹ 42,000' },
                                        { c: 'BCA', t: '₹ 45,000', d: '₹ 10,000', tot: '₹ 55,000' },
                                        { c: 'B.Com (Hons)', t: '₹ 30,000', d: '₹ 6,000', tot: '₹ 36,000' },
                                    ].map((row, i) => (
                                        <tr key={i}>
                                            <td className="py-3 font-medium">{row.c}</td>
                                            <td className="py-3">{row.t}</td>
                                            <td className="py-3">{row.d}</td>
                                            <td className="py-3 font-bold text-secondary">{row.tot}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-gray-500 mt-4">* Exam fees and hostel fees are charged separately.</p>
                    </section>

                    {/* Application Form Preview (Mock) */}
                    <section id="apply-form">
                        <h2 className="text-2xl font-bold text-primary mb-6">Enquiry / Pre-Registration</h2>
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" placeholder="Student Name" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary" />
                                <input type="text" placeholder="Mobile Number" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary" />
                            </div>
                            <input type="email" placeholder="Email Address" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary" />
                            <select className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary bg-white">
                                <option>Select Course Interested In</option>
                                <option>B.Sc</option>
                                <option>BCA</option>
                                <option>B.Com</option>
                            </select>
                            <Button className="w-full justify-center">Submit Enquiry</Button>
                        </form>
                    </section>

                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <div className="bg-orange-500 text-white p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Download /> Downloads</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="block p-2 bg-white/10 rounded hover:bg-white/20 transition">Admission Brochure 2024</a></li>
                            <li><a href="#" className="block p-2 bg-white/10 rounded hover:bg-white/20 transition">Fee Structure PDF</a></li>
                            <li><a href="#" className="block p-2 bg-white/10 rounded hover:bg-white/20 transition">Scholarship Form</a></li>
                        </ul>
                    </div>

                    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                        <h3 className="text-xl font-bold mb-4 text-primary flex items-center gap-2"><HelpCircle size={20}/> Admission Helpline</h3>
                        <p className="text-gray-600 mb-4">For any queries regarding admissions, please contact our dedicated cell.</p>
                        <div className="space-y-2 text-sm font-medium">
                            <p>Phone: +91 98765 43210</p>
                            <p>Email: admissions@samrat.edu.in</p>
                            <p>Timings: Mon-Sat, 9 AM - 5 PM</p>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <h3 className="text-xl font-bold mb-4 text-secondary">Scholarships</h3>
                        <p className="text-sm text-gray-600 mb-4">We offer scholarships for meritorious students and those from economically weaker sections.</p>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2"><CheckCircle size={16} className="text-green-500 mt-0.5"/> Merit Scholarship (&gt;90% in 12th)</li>
                            <li className="flex items-start gap-2"><CheckCircle size={16} className="text-green-500 mt-0.5"/> Sports Quota</li>
                            <li className="flex items-start gap-2"><CheckCircle size={16} className="text-green-500 mt-0.5"/> Single Girl Child Scheme</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};