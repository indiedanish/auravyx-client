'use client';

import React, { useState } from 'react';
import Container from './Container';
import Section from './Section';
import Button from './Button';
import BeamsBackground from './BeamsBackground';
import { Mail, Sparkles, Heart, User, Apple, Layers } from 'lucide-react';

export default function WaitlistSection() {
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, interest })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Thank you! You\'re on the waitlist. We\'ll be in touch soon.');
        setEmail('');
        setInterest('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <BeamsBackground 
      className=""
      intensity="strong"
      colorScheme="sage"
    >
      <Section id="waitlist">
        <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="w-8 h-8 text-primary-600" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-gray-900">
                Join the Waitlist
              </h2>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed">
              Be the first to know when Auravyx opens early access. Join the waitlist for updates, early testing opportunities, and specialist-backed insights.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-sage-100 p-8 lg:p-12 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-4 bg-cream-50 border border-sage-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  What are you most interested in?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { value: 'skin', label: 'Skin', Icon: Heart },
                    { value: 'hair', label: 'Hair', Icon: User },
                    { value: 'nutrition', label: 'Nutrition', Icon: Apple },
                    { value: 'all', label: 'All of the above', Icon: Layers }
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`relative flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        interest === option.value
                          ? 'border-primary-500 bg-primary-50 shadow-md'
                          : 'border-sage-200 bg-cream-50 hover:border-primary-300 hover:bg-primary-50/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="interest"
                        value={option.value}
                        checked={interest === option.value}
                        onChange={(e) => setInterest(e.target.value)}
                        className="sr-only"
                      />
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        interest === option.value ? 'bg-primary-100' : 'bg-sage-100'
                      }`}>
                        <option.Icon className={`w-5 h-5 ${
                          interest === option.value ? 'text-primary-600' : 'text-sage-600'
                        }`} />
                      </div>
                      <span className={`font-medium flex-1 ${
                        interest === option.value ? 'text-primary-700' : 'text-gray-700'
                      }`}>
                        {option.label}
                      </span>
                      {interest === option.value && (
                        <svg
                          className="w-5 h-5 text-primary-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full"
              >
                {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
              </Button>

              {message && (
                <div className={`p-4 rounded-xl ${
                  status === 'success' 
                    ? 'bg-primary-50 border border-primary-200 text-primary-800' 
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      </Container>
      </Section>
    </BeamsBackground>
  );
}

