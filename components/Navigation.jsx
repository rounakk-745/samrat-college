import React from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';
import { NAV_ITEMS } from '@/constants';

export default function Navigation ({ activePage, setActivePage, scrolled, isMenuOpen, setIsMenuOpen }) {
  const NavLink = ({ page, label, mobile }) => (
    <button
      onClick={() => {
        setActivePage(page);
        setIsMenuOpen(false);
        window.scrollTo(0, 0);
      }}
      className={`${
        mobile 
          ? "block w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-blue-50 text-slate-700" 
          : `text-sm font-bold uppercase tracking-wide hover:text-yellow-500 transition-colors ${
              activePage === page ? 'text-yellow-500' : 'text-white'
            }`
      }`}
    >
      {label}
    </button>
  );

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-blue-900 shadow-xl py-2' : 'bg-blue-900 py-4'
    }`}>
      <div className="max-w-screen mx-auto px-4 flex justify-around items-center">
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => setActivePage('home')}
        >
          <div className="bg-yellow-500 p-2 rounded-full">
            <GraduationCap size={32} className="text-blue-900" />
          </div>
          <div className="text-white">
            <h1 className="text-xl md:text-2xl font-bold leading-tight">SAMRAT GROUP</h1>
            <p className="text-xs text-blue-200 tracking-widest uppercase">Of Institutions</p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-6 text-sm">
          {NAV_ITEMS.map(item => (
            <NavLink key={item.page} page={item.page} label={item.label}/>
          ))}
          <button 
            onClick={() => setActivePage('admissions')} 
            className="ml-4 bg-yellow-500 text-blue-900 px-5 py-2 rounded font-bold hover:bg-yellow-400 transition-colors animate-pulse"
          >
            Apply Now
          </button>
        </nav>

        <button 
          className="lg:hidden text-white" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white absolute top-full left-0 w-full shadow-2xl border-t border-gray-200">
          <div className="flex flex-col">
            {NAV_ITEMS.map(item => (
              <NavLink key={item.page} page={item.page} label={item.label} mobile />
            ))}
            <div className="p-4 bg-blue-50">
              <button 
                onClick={() => {setActivePage('admissions'); setIsMenuOpen(false)}} 
                className="w-full bg-blue-900 text-white py-3 rounded font-bold"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};