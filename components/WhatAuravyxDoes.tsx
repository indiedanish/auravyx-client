import React from 'react';
import Container from './Container';
import Section from './Section';
import { Scan, GitMerge, TrendingUp } from 'lucide-react';

export default function WhatAuravyxDoes() {
  const steps = [
    {
      icon: Scan,
      title: 'Scan',
      description: 'You answer a few questions and, in future, Auravyx will also learn from your scans and routines.'
    },
    {
      icon: GitMerge,
      title: 'Match',
      description: 'Our intelligence engine filters products by tone safety, sensitivities, ingredients, and lifestyle fit.'
    },
    {
      icon: TrendingUp,
      title: 'Improve',
      description: 'You receive simple, evolving routines and guidance that adjust as your life and skin change.'
    }
  ];

  return (
    <Section id="what-we-do" className="bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-gray-900 mb-4">
            What Auravyx Does
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A simple, intelligent approach to understanding your wellness
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative p-8 bg-gradient-to-br from-cream-50 to-sage-50 rounded-3xl border border-sage-100 hover:border-primary-300 hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center mb-4">
                  <step.icon className="w-7 h-7 text-primary-700" />
                </div>
                <h3 className="text-2xl font-display font-medium text-gray-900 mb-3">
                  {step.title}
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

