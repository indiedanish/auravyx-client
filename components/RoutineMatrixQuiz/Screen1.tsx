'use client';

import React from 'react';
import Button from '../Button';
import Tooltip from './Tooltip';
import { QuizData } from './types';

interface Screen1Props {
  quizData: QuizData;
  updateQuizData: (data: Partial<QuizData>) => void;
  nextScreen: () => void;
  showTooltip: string | null;
  onShowTooltip: (id: string) => void;
  onHideTooltip: () => void;
}

export default function Screen1({ 
  quizData, 
  updateQuizData, 
  nextScreen,
  showTooltip,
  onShowTooltip,
  onHideTooltip
}: Screen1Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-display font-medium text-gray-900 mb-6">Let's get to know you</h3>
        <p className="text-gray-600 mb-8">Help us personalize your skincare routine (optional)</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age Range
            <Tooltip 
              id="age" 
              text="Age helps us recommend products suitable for your skin's needs at this life stage"
              showTooltip={showTooltip}
              onShow={onShowTooltip}
              onHide={onHideTooltip}
            />
          </label>
          <select
            value={quizData.age || ''}
            onChange={(e) => updateQuizData({ age: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Prefer not to say</option>
            <option value="under-18">Under 18</option>
            <option value="18-24">18-24</option>
            <option value="25-34">25-34</option>
            <option value="35-44">35-44</option>
            <option value="45-54">45-54</option>
            <option value="55+">55+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
            <Tooltip 
              id="gender" 
              text="Gender can influence hormonal factors affecting skin. This is optional and for personalization only"
              showTooltip={showTooltip}
              onShow={onShowTooltip}
              onHide={onHideTooltip}
            />
          </label>
          <select
            value={quizData.gender || ''}
            onChange={(e) => updateQuizData({ gender: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Prefer not to say</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="non-binary">Non-binary</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button onClick={nextScreen} className="flex-1">
          Continue
        </Button>
        <Button variant="secondary" onClick={nextScreen} className="flex-1">
          Skip
        </Button>
      </div>
    </div>
  );
}

