'use client';

import React, { useState } from 'react';
import Container from './Container';
import Button from './Button';
import PartnerModal from './PartnerModal';
import BeamsBackground from './BeamsBackground';

export default function Hero() {
  const [showPartnerModal, setShowPartnerModal] = useState(false);

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BeamsBackground 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 via-white to-sage-50"
      intensity="medium"
      colorScheme="green"
    >
      <Container>
        <div className="text-center max-w-5xl mx-auto py-20">
          {/* Logo/Brand */}
          <div className="mb-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-medium mb-6 bg-gradient-to-r from-primary-700 via-sage-600 to-primary-700 bg-clip-text text-transparent leading-tight">
              Auravyx
            </h1>
          </div>

          {/* Hero Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light mb-6 text-gray-900 leading-tight">
            AI that finally understands your skin, biology, and lived experience.
          </h2>

          {/* Sub-copy */}
          <p className="text-lg sm:text-xl text-gray-700 font-light mb-12 max-w-3xl mx-auto leading-relaxed">
            Auravyx is an inclusive wellness intelligence system for skin, nutrition, and daily life. Patent-pending. Created for real people, real tones, real conditions.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={scrollToWaitlist}>
              Join Waitlist
            </Button>
            <Button variant="secondary" onClick={() => setShowPartnerModal(true)}>
              For Retail & Pro Partners
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="mt-20 animate-bounce">
            <svg
              className="w-6 h-6 mx-auto text-primary-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </Container>

      {/* Partner Modal */}
      {showPartnerModal && (
        <PartnerModal onClose={() => setShowPartnerModal(false)} />
      )}
    </BeamsBackground>
  );
}

