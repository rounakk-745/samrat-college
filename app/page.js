'use client';

import React from 'react';
import About from "@/components/About"
import Academics from "@/components/Academics"
import Admissions from "@/components/Admissions"
import Placements from "@/components/Placements"
import Contact from "@/components/Contact"
import { Phone } from 'lucide-react';
import TopBar from '@/components/TopBar';
import Navigation from '@/components/Navigation';
import { useScrollEffect } from '@/hooks/useScrollEffect';
import { usePageNavigation } from '@/hooks/usePageNavigation';
import { Home } from '@/components/Home';
import Footer from '@/components/Footer';
import { CampusLife } from '@/components/CampusLife';

export default function App() {
  const scrolled = useScrollEffect(50);
  const { activePage, setActivePage, isMenuOpen, setIsMenuOpen } = usePageNavigation('home');

  const renderContent = () => {
    switch (activePage) {
      case 'home': return <Home setActivePage={setActivePage} />;
      case 'about': return <About />;
      case 'academics': return <Academics />;
      case 'admissions': return <Admissions />;
      case 'campuslife': return <CampusLife />;
      case 'placements': return <Placements />;
      case 'contact': return <Contact />;
      default: return <Home setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="font-sans text-slate-800 bg-gray-50 min-h-screen flex flex-col">
      <TopBar />
      <Navigation activePage={activePage} setActivePage={setActivePage} scrolled={scrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main className="grow">
        {renderContent()}
      </main>

      <Footer />

      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            // WhatsApp number (replace with actual college number)
            const phoneNumber = '919876543210'; // Format: country code + number (no + or spaces)
            const message = encodeURIComponent('Hello! I would like to inquire about admissions at Samrat Group of Institutions.');
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
          }}
          className="bg-green-600 text-white p-4 rounded-full shadow-2xl hover:bg-green-500 transition-transform hover:scale-110 flex items-center gap-2"
        >
          <span className="font-bold text-sm hidden md:inline">WhatsApp Inquiry</span>
          <Phone size={24} />
        </button>
      </div>
    </div>
  );
}
