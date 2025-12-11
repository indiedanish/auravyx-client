'use client';

import React, { useState, useEffect } from 'react';
import Button from './Button';
import { X } from 'lucide-react';

interface PartnerModalProps {
  onClose: () => void;
}

export default function PartnerModal({ onClose }: PartnerModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    role: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState('');

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setResponseMessage('');

    try {
      const response = await fetch('/api/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setResponseMessage('Thank you for your interest! We\'ll be in touch within 2-3 business days.');
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        setStatus('error');
        setResponseMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setResponseMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl border border-sage-100 shadow-2xl flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-sage-50 transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        {/* Sticky header section */}
        <div className="border-b border-sage-100 bg-white p-8 pt-8 pb-6 rounded-t-3xl">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Partnership Enquiry
          </h2>
          <p className="text-gray-600">
            Tell us about your organization and how you'd like to work with Auravyx
          </p>
        </div>

        {/* Scrollable content area */}
        <div className="overflow-y-auto flex-1 p-8 pt-6">
          <form onSubmit={handleSubmit} className="space-y-6 pb-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Your name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-cream-50 border border-sage-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                Company/Organization *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-cream-50 border border-sage-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-cream-50 border border-sage-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Your role *
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                placeholder="e.g. CEO, Product Manager, Buyer"
                className="w-full px-4 py-3 bg-cream-50 border border-sage-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Tell us about your interest *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="How would you like to work with Auravyx?"
                className="w-full px-4 py-3 bg-cream-50 border border-sage-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all resize-none"
              />
            </div>

            {responseMessage && (
              <div className={`p-4 rounded-xl ${
                status === 'success' 
                  ? 'bg-primary-50 border border-primary-200 text-primary-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                {responseMessage}
              </div>
            )}
          </form>
        </div>

        {/* Sticky button bar at the bottom */}
        <div className="border-t border-sage-100 bg-white p-6 rounded-b-3xl">
          <div className="flex gap-4">
            <Button 
              type="submit"
              onClick={handleSubmit}
              disabled={status === 'loading'}
              className="flex-1"
            >
              {status === 'loading' ? 'Sending...' : 'Send Enquiry'}
            </Button>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

