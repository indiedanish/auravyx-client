import React from 'react';
import Container from './Container';
import { Shield, Users, Award } from 'lucide-react';

export default function ProofStrip() {
  const proofPoints = [
    {
      icon: Shield,
      text: 'Patent-pending AI engine'
    },
    {
      icon: Users,
      text: 'Built for diverse tones and types'
    },
    {
      icon: Award,
      text: 'Informed by real specialists'
    }
  ];

  return (
    <section className="py-12 bg-sage-50 border-y border-sage-100">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {proofPoints.map((point, index) => (
            <div key={index} className="flex items-center justify-center gap-3 text-center md:text-left">
              <point.icon className="w-6 h-6 text-primary-600 flex-shrink-0" />
              <p className="text-gray-700 font-medium">{point.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

