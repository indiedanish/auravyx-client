'use client';

import React, { useState } from 'react';
import Container from './Container';
import Section from './Section';
import Button from './Button';
import PartnerModal from './PartnerModal';
import { Briefcase } from 'lucide-react';

export default function RetailersSection() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Section className="bg-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-primary-200 bg-gradient-to-br from-sage-50 via-cream-50 to-primary-50 p-12 lg:p-16 shadow-xl">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-30"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-8 h-8 text-primary-700" />
                <h2 className="text-3xl sm:text-4xl font-display font-medium text-gray-900">
                  For Retailers, Brands, and Professionals
                </h2>
              </div>

              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Auravyx Intelligence is available for private, NDA-only pilots and integrations with select partners. If you're building the next generation of inclusive skincare or wellness experiences, we'd love to talk.
              </p>

              <Button onClick={() => setShowModal(true)}>
                Enquire About Partnership
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {showModal && <PartnerModal onClose={() => setShowModal(false)} />}
    </Section>
  );
}

