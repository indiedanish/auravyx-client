'use client';

import React from 'react';
import Button from '../Button';
import Tooltip from './Tooltip';
import { QuizData } from './types';
import { fitzpatrickScale } from './constants';

interface Screen5Props {
  quizData: QuizData;
  closeQuiz: () => void;
  prevScreen: () => void;
  showTooltip: string | null;
  onShowTooltip: (id: string) => void;
  onHideTooltip: () => void;
}

export default function Screen5({ 
  quizData, 
  closeQuiz,
  prevScreen,
  showTooltip,
  onShowTooltip,
  onHideTooltip
}: Screen5Props) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
          ✨ Your Profile is Ready!
        </div>
        <h3 className="text-2xl font-display font-medium text-gray-900 mb-4">
          Your Unique Skin Profile
        </h3>
        <p className="text-gray-600 mb-8">
          Based on your responses, here's what we learned about your skin
        </p>
      </div>

      <div className="bg-gradient-to-br from-primary-50 to-sage-50 rounded-xl p-6 border border-primary-200">
        <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Your Profile Summary
        </h4>
        
        <div className="space-y-3 text-sm">
          {quizData.skinTone && (
            <div className="flex justify-between">
              <span className="text-gray-600">Skin Tone:</span>
              <span className="font-medium text-gray-900">
                {fitzpatrickScale[quizData.skinTone - 1].label}
              </span>
            </div>
          )}
          {quizData.skinType && (
            <div className="flex justify-between">
              <span className="text-gray-600">Skin Type:</span>
              <span className="font-medium text-gray-900 capitalize">{quizData.skinType}</span>
            </div>
          )}
          {quizData.goals && quizData.goals.length > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Primary Goals:</span>
              <span className="font-medium text-gray-900">{quizData.goals.length} selected</span>
            </div>
          )}
          {quizData.commitmentLevel && (
            <div className="flex justify-between">
              <span className="text-gray-600">Routine Length:</span>
              <span className="font-medium text-gray-900">{quizData.commitmentLevel}</span>
            </div>
          )}
        </div>
      </div>

      {/* ExplainAI Analysis */}
      <div className="bg-white rounded-xl border-2 border-primary-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-gradient-to-r from-primary-600 to-sage-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            ExplainAI™
          </div>
          <Tooltip 
            id="explainai" 
            text="Our AI analyzes your products against your unique skin profile to provide personalized insights"
            showTooltip={showTooltip}
            onShow={onShowTooltip}
            onHide={onHideTooltip}
          />
        </div>

        <div className="space-y-4">
          <h5 className="font-medium text-gray-900">Product Analysis</h5>
          
          {quizData.currentProducts.length > 0 ? (
            <div className="space-y-3">
              {quizData.currentProducts.map((product, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="font-medium text-gray-900 mb-2">{product}</p>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>✓ Suitable for {quizData.skinType} skin</p>
                    <p>✓ Compatible with {fitzpatrickScale[(quizData.skinTone || 3) - 1].label}</p>
                    {quizData.goals && quizData.goals[0] && (
                      <p>✓ Supports goal: {quizData.goals[0]}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-primary-50 rounded-lg p-6 text-center border border-primary-100">
              <p className="text-gray-700 mb-4">
                You haven't added any products yet. Our AI will recommend the perfect routine for your:
              </p>
              <ul className="text-left inline-block text-sm text-gray-600 space-y-2">
                <li>✓ {fitzpatrickScale[(quizData.skinTone || 3) - 1].label} skin tone</li>
                <li>✓ {quizData.skinType} skin type</li>
                {quizData.goals && quizData.goals.length > 0 && (
                  <li>✓ {quizData.goals.join(', ')} goals</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary-600 to-sage-600 text-white rounded-xl p-6">
        <h5 className="font-medium mb-2">Next Steps</h5>
        <p className="text-primary-50 text-sm mb-4">
          Join our waitlist to get full access to RoutineMatrix™ and receive:
        </p>
        <ul className="text-sm space-y-2 text-primary-50 mb-4">
          <li>✓ Complete product recommendations</li>
          <li>✓ Personalized routine builder</li>
          <li>✓ Ongoing AI analysis and adjustments</li>
          <li>✓ Unlimited product scanning</li>
        </ul>
        <Button 
          variant="secondary" 
          onClick={() => {
            closeQuiz();
            document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-full bg-white text-primary-700 hover:bg-gray-50"
        >
          Join Waitlist Now
        </Button>
      </div>

      <div className="flex justify-center pt-4">
        <Button variant="secondary" onClick={prevScreen}>
          Back
        </Button>
      </div>
    </div>
  );
}

