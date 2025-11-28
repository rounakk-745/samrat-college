import React from 'react';
import { Wifi, Coffee, Book, Monitor, Activity } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';

const GalleryImage = ({ src, label }) => (
    <div className="relative group overflow-hidden rounded-lg shadow-lg h-64 cursor-pointer">
        <img src={src} alt={label} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-6">
            <span className="text-white font-bold text-lg">{label}</span>
        </div>
    </div>
);

export const CampusLife = () => {
  const facilities = [
      { icon: Monitor, title: 'Computer Labs', desc: 'High-performance systems with latest software' },
      { icon: Book, title: 'Library', desc: '50,000+ Books and Digital Resources' },
      { icon: Wifi, title: 'WiFi Campus', desc: 'High-speed internet connectivity across campus' },
      { icon: Activity, title: 'Sports', desc: 'Indoor stadium, Cricket ground, Gym' },
      { icon: Coffee, title: 'Cafeteria', desc: 'Hygienic and nutritious food court' },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
        <div className="bg-blue-900 text-white py-16 mt-10 mb-12">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl font-bold font-serif mb-4">Campus Life</h1>
                <p className="text-gray-300">Vibrant, Inclusive, and Inspiring.</p>
            </div>
        </div>

        <div className="container mx-auto px-4">
            
            <SectionTitle title="World Class Facilities" center />
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-20">
                {facilities.map((fac, i) => (
                    <div key={i} className="text-center p-6 border rounded-xl hover:shadow-xl hover:border-accent transition bg-white group">
                        <div className="w-12 h-12 mx-auto bg-blue-50 text-secondary rounded-full flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-white transition">
                            <fac.icon size={24} />
                        </div>
                        <h3 className="font-bold text-gray-800 mb-2">{fac.title}</h3>
                        <p className="text-xs text-gray-500">{fac.desc}</p>
                    </div>
                ))}
            </div>

            <SectionTitle title="Photo Gallery" subtitle="Glimpses of life at SAMRAT" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <GalleryImage src="https://picsum.photos/600/400?random=50" label="Main Building" />
                <GalleryImage src="https://picsum.photos/600/400?random=51" label="Auditorium" />
                <GalleryImage src="https://picsum.photos/600/400?random=52" label="Computer Lab" />
                <GalleryImage src="https://picsum.photos/600/400?random=53" label="Cultural Fest" />
                <GalleryImage src="https://picsum.photos/600/400?random=54" label="Sports Day" />
                <GalleryImage src="https://picsum.photos/600/400?random=55" label="Library" />
            </div>
        </div>
    </div>
  );
};