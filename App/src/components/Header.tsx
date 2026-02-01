'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0E0716]/90 backdrop-blur-xl border-b border-[#2d2548]/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex h-20 items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl overflow-hidden transform group-hover:scale-105 transition-transform duration-300 shadow-lg">
                <img 
                  src="/perkos-logo.jpg" 
                  alt="PerkOS" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-[#EB1B69] to-[#EF5B57] opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span 
                className="text-lg font-bold tracking-tight gradient-text"
                style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
              >
                PERKY NEWS
              </span>
              <span className="text-[10px] text-[#a3a3a3] tracking-widest uppercase">
                Agent Economy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/articles">Articles</NavLink>
            <NavLink href="/about">About</NavLink>
            <div className="w-px h-6 bg-[#2d2548] mx-4" />
            <Link 
              href="/subscribe" 
              className="relative group px-6 py-2.5 rounded-full overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#EB1B69] via-[#EF5B57] to-[#FD8F50] opacity-100 group-hover:opacity-90 transition-opacity" />
              <span 
                className="relative text-sm font-semibold text-white flex items-center gap-2"
                style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
              >
                <span>Subscribe</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-5 flex flex-col justify-between">
              <span 
                className={`block h-0.5 bg-white rounded-full transform transition-all duration-300 origin-center ${
                  mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`} 
              />
              <span 
                className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0 scale-0' : ''
                }`} 
              />
              <span 
                className={`block h-0.5 bg-white rounded-full transform transition-all duration-300 origin-center ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`} 
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-[#0E0716]/98 backdrop-blur-xl border-b border-[#2d2548]/50 overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container mx-auto px-6 py-6 flex flex-col gap-2">
          <MobileNavLink href="/articles" onClick={() => setMobileMenuOpen(false)}>
            Articles
          </MobileNavLink>
          <MobileNavLink href="/about" onClick={() => setMobileMenuOpen(false)}>
            About
          </MobileNavLink>
          <div className="h-px bg-[#2d2548] my-2" />
          <Link 
            href="/subscribe" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-gradient-to-r from-[#EB1B69] via-[#EF5B57] to-[#FD8F50] text-white font-semibold"
            style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
          >
            Subscribe Now
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href}
      className="relative px-4 py-2 text-sm font-medium text-[#a3a3a3] hover:text-white transition-colors group"
      style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
    >
      {children}
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#EB1B69] to-[#FD8F50] group-hover:w-full transition-all duration-300" />
    </Link>
  );
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link 
      href={href}
      onClick={onClick}
      className="flex items-center justify-between py-3 px-4 rounded-xl text-lg font-medium text-white hover:bg-[#1B1833] transition-colors"
      style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
    >
      {children}
      <svg className="w-5 h-5 text-[#a3a3a3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
