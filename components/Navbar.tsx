'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from './Button';
import PartnerModal from './PartnerModal';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPartnerModal, setShowPartnerModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Benefits', id: 'benefits' },
    { label: 'For Retailers', id: 'retailers' },
    { label: 'Join Waitlist', id: 'waitlist' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-lg shadow-lg shadow-sage-100/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary-400 to-sage-400 rounded-full opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500"></div>
                <h1 className="relative text-2xl sm:text-3xl font-display font-semibold bg-gradient-to-r from-primary-700 via-sage-600 to-primary-700 bg-clip-text text-transparent transition-all duration-300">
                  Auravyx
                </h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-700 transition-colors duration-300 group"
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute inset-0 bg-primary-50 rounded-lg opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300"></span>
                </button>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={() => setShowPartnerModal(true)}
                className="px-4 py-2 text-sm font-medium text-primary-700 hover:text-primary-800 transition-colors duration-300"
              >
                For Partners
              </button>
              <Button onClick={() => scrollToSection('waitlist')} size="sm">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center text-gray-700 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-full bg-current transform transition-all duration-300 ease-out ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-full bg-current transition-all duration-300 ease-out ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-full bg-current transform transition-all duration-300 ease-out ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

      </nav>

      {/* Mobile Menu - Outside nav for proper layering */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div className="lg:hidden fixed inset-0 top-20 z-40 bg-white" />
          
          {/* Menu Content */}
          <div className="lg:hidden fixed inset-0 top-20 z-40 overflow-y-auto">
            <div className="flex flex-col min-h-full px-4 py-8 space-y-2">
            {/* Mobile Navigation Links */}
            {navLinks.map((link, index) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="w-full text-left px-6 py-4 text-lg font-medium text-gray-700 hover:text-primary-700 hover:bg-primary-50 rounded-xl transition-all duration-300 animate-slide-in"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animationFillMode: 'backwards'
                }}
              >
                {link.label}
              </button>
            ))}

            {/* Mobile CTA Buttons */}
            <div className="pt-8 space-y-3 px-6">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setShowPartnerModal(true);
                }}
                className="w-full px-6 py-3 text-base font-medium text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-xl transition-all duration-300"
              >
                For Partners
              </button>
              <Button
                onClick={() => scrollToSection('waitlist')}
                className="w-full justify-center"
              >
                Get Started
              </Button>
            </div>

              {/* Decorative gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sage-50/50 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </>
      )}

      {/* Partner Modal */}
      {showPartnerModal && (
        <PartnerModal onClose={() => setShowPartnerModal(false)} />
      )}

      {/* Add custom animation styles */}
      <style jsx global>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in {
          animation: slide-in 0.4s ease-out;
        }
      `}</style>
    </>
  );
}

