import React from 'react';
import Container from './Container';
import Section from './Section';
import { MessageSquare, Brain, Sparkles } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: MessageSquare,
      title: 'Tell us about your skin, goals, and lifestyle',
      description: 'Share what matters to you – your skin type, concerns, sensitivities, and daily routines.'
    },
    {
      icon: Brain,
      title: 'Auravyx intelligence engine analyses patterns',
      description: 'Our engine considers tone considerations, sensitivities, ingredients, and lifestyle factors unique to you.'
    },
    {
      icon: Sparkles,
      title: 'Receive clear, step-by-step guidance',
      description: 'Get personalized routines and product suggestions that evolve with your changing needs.'
    }
  ];

  return (
    <Section className="bg-gradient-to-br from-cream-50 via-white to-sage-50">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple, intelligent, and built for you
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-200 to-transparent -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-3xl border border-sage-100 p-8 hover:border-primary-300 hover:shadow-xl transition-all duration-300 h-full">
                    {/* Step number */}
                    <div className="absolute -top-4 left-8 w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium shadow-lg">
                      {index + 1}
                    </div>
                    
                    <div className="mb-6 mt-4">
                      <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center mb-4">
                        <step.icon className="w-7 h-7 text-primary-700" />
                      </div>
                      <h3 className="text-xl font-display font-medium text-gray-900 mb-3">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

