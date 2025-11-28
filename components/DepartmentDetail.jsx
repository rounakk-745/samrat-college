import { ArrowRight, Download } from "lucide-react";

export default function DepartmentDetail({ course }) {
    const IconComponent = course.icon;

    return (
        <div className="md:w-3/4 bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-6 border-b pb-4">
                <div className="p-3 bg-blue-50 rounded-full">
                    <IconComponent size={32} className="text-blue-600" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">{course.name}</h2>
                    <p className="text-slate-500">Head of Department: {course.hod}</p>
                </div>
            </div>

            <div className="prose max-w-none text-slate-600">
                <p className="text-lg mb-6">{course.desc}</p>

                <h4 className="text-lg font-bold text-blue-900 mb-3">Key Highlights</h4>
                <ul className="grid md:grid-cols-2 gap-3 mb-8">
                    {course.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                            <ArrowRight size={14} className="text-yellow-500" /> {feat}
                        </li>
                    ))}
                </ul>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="border p-4 rounded hover:border-blue-500 transition cursor-pointer group">
                        <div className="flex justify-between items-center mb-2">
                            <h5 className="font-bold text-slate-800">Syllabus Structure</h5>
                            <Download size={18} className="text-gray-400 group-hover:text-blue-500" />
                        </div>
                        <p className="text-xs text-gray-500">PDF - 2.4 MB (Updated 2025)</p>
                    </div>
                    <div className="border p-4 rounded hover:border-blue-500 transition cursor-pointer group">
                        <div className="flex justify-between items-center mb-2">
                            <h5 className="font-bold text-slate-800">Lab Manuals</h5>
                            <Download size={18} className="text-gray-400 group-hover:text-blue-500" />
                        </div>
                        <p className="text-xs text-gray-500">Access experimental guides</p>
                    </div>
                </div>
            </div>
        </div>
    );
};