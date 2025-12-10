import React from 'react';
import Container from './Container';
import Section from './Section';
import { CheckCircle2 } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    'Smoother texture and more even tone over time',
    'Products filtered for your tone, sensitivities, and lifestyle',
    'Fewer guesswork purchases and wasted money',
    'Routines that adapt to stress, sleep, and habits',
    'Inclusive by design – not an afterthought'
  ];

  return (
    <Section className="bg-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-gray-900 mb-4">
              Benefits to You
            </h2>
            <p className="text-xl text-gray-600">
              Real results, tailored to your reality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 p-6 bg-gradient-to-br from-sage-50 to-cream-50 rounded-2xl border border-sage-100 hover:border-primary-300 hover:shadow-lg transition-all duration-300"
              >
                <CheckCircle2 className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                <p className="text-gray-700 text-lg">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

