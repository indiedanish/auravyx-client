import React from 'react';
import Container from './Container';
import Section from './Section';
import { AlertCircle } from 'lucide-react';

export default function WhyThisMatters() {
  const problems = [
    'Tone and texture often misread on darker or mixed skin',
    'Irritation from stacked actives and hidden allergens',
    'Nutrition, stress, and sleep rarely linked to your routine',
    'One-size-fits-all product advice that doesn\'t reflect reality'
  ];

  return (
    <Section className="bg-gradient-to-br from-sage-50 to-cream-50">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-gray-900 mb-6">
              Why This Matters
            </h2>
          </div>

          <div className="bg-white rounded-3xl border border-sage-100 p-8 lg:p-12 shadow-lg">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Most skin and wellness tools were never built with darker tones, complex sensitivities, or real-life stress in mind. They over-simplify routines, ignore allergies, and rarely adapt to your actual lifestyle. Auravyx was built to change that.
            </p>

            <div className="space-y-4">
              {problems.map((problem, index) => (
                <div key={index} className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-peach-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">{problem}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

