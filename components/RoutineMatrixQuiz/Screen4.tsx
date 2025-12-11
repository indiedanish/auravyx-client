'use client';

import React from 'react';
import Button from '../Button';
import Tooltip from './Tooltip';
import { QuizData } from './types';
import { skinGoals } from './constants';

interface Screen4Props {
  quizData: QuizData;
  updateQuizData: (data: Partial<QuizData>) => void;
  toggleGoal: (goal: string) => void;
  nextScreen: () => void;
  prevScreen: () => void;
  showTooltip: string | null;
  onShowTooltip: (id: string) => void;
  onHideTooltip: () => void;
}

export default function Screen4({ 
  quizData, 
  updateQuizData,
  toggleGoal,
  nextScreen, 
  prevScreen,
  showTooltip,
  onShowTooltip,
  onHideTooltip
}: Screen4Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-display font-medium text-gray-900 mb-6">Your Skincare Goals</h3>
        <p className="text-gray-600 mb-8">What do you want to achieve with your routine?</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Your Goals (Choose all that apply)
            <Tooltip 
              id="goals" 
              text="We'll prioritize recommendations that address your specific concerns"
              showTooltip={showTooltip}
              onShow={onShowTooltip}
              onHide={onHideTooltip}
            />
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {skinGoals.map((goal) => (
              <button
                key={goal}
                type="button"
                onClick={() => toggleGoal(goal)}
                className={`px-4 py-3 border rounded-lg text-sm transition-all ${
                  quizData.goals?.includes(goal)
                    ? 'border-primary-600 bg-primary-50 text-primary-700 font-medium'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How many steps can you commit to daily?
            <Tooltip 
              id="commitment" 
              text="Be realistic! A routine you'll actually follow is better than a complex one you'll skip"
              showTooltip={showTooltip}
              onShow={onShowTooltip}
              onHide={onHideTooltip}
            />
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {['3-4 steps', '5-6 steps', '7-9 steps', '10+ steps'].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => updateQuizData({ commitmentLevel: level })}
                className={`px-4 py-3 border-2 rounded-lg text-sm font-medium transition-all ${
                  quizData.commitmentLevel === level
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button variant="secondary" onClick={prevScreen}>
          Back
        </Button>
        <Button 
          onClick={nextScreen} 
          className="flex-1"
          disabled={!quizData.goals?.length || !quizData.commitmentLevel}
        >
          See My Results
        </Button>
      </div>
    </div>
  );
}

