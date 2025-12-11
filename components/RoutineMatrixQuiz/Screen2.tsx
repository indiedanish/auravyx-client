'use client';

import React, { useState, useEffect } from 'react';
import Button from '../Button';
import Tooltip from './Tooltip';
import { QuizData } from './types';
import { fitzpatrickScale, skinTypes } from './constants';

interface Screen2Props {
  quizData: QuizData;
  updateQuizData: (data: Partial<QuizData>) => void;
  nextScreen: () => void;
  prevScreen: () => void;
  showTooltip: string | null;
  onShowTooltip: (id: string) => void;
  onHideTooltip: () => void;
}

export default function Screen2({ 
  quizData, 
  updateQuizData, 
  nextScreen, 
  prevScreen,
  showTooltip,
  onShowTooltip,
  onHideTooltip
}: Screen2Props) {
  // Local state for smooth slider movement
  const [sliderValue, setSliderValue] = useState<number>(quizData.skinTone || 3);
  const [isSnapping, setIsSnapping] = useState<boolean>(false);
  
  // Update local slider value when quizData changes externally
  useEffect(() => {
    if (quizData.skinTone) {
      setSliderValue(quizData.skinTone);
    }
  }, [quizData.skinTone]);
  
  // Handle slider input for smooth movement
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSnapping(false);
    setSliderValue(parseFloat(e.target.value));
  };
  
  // Animate slider value smoothly to target
  const animateToValue = (startValue: number, endValue: number) => {
    const duration = 300; // ms
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic function for smooth deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = startValue + (endValue - startValue) * easeProgress;
      setSliderValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSnapping(false);
      }
    };
    
    requestAnimationFrame(animate);
  };
  
  // Update quizData with rounded value when user releases slider
  const handleSliderRelease = () => {
    const roundedValue = Math.round(sliderValue);
    setIsSnapping(true);
    animateToValue(sliderValue, roundedValue);
    updateQuizData({ skinTone: roundedValue });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-display font-medium text-gray-900 mb-6">Your Skin Profile</h3>
        <p className="text-gray-600 mb-8">This helps us understand your unique skin characteristics</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Skin Tone (Fitzpatrick Scale)
            <Tooltip 
              id="fitzpatrick" 
              text="The Fitzpatrick scale classifies skin types based on melanin content and sun sensitivity. Slide to match your skin tone."
              showTooltip={showTooltip}
              onShow={onShowTooltip}
              onHide={onHideTooltip}
            />
          </label>
          
          {/* Skin tone slider */}
          <div className="space-y-4">
            <div className="relative">
              <input
                type="range"
                min="1"
                max="6"
                step="0.01"
                value={sliderValue}
                onChange={handleSliderChange}
                onMouseUp={handleSliderRelease}
                onTouchEnd={handleSliderRelease}
                className={`w-full h-2 bg-gradient-to-r from-[#f7ead2] via-[#d6bc9f] to-[#4a3728] rounded-lg appearance-none cursor-pointer ${isSnapping ? 'slider-snap' : ''}`}
                style={{
                  WebkitAppearance: 'none',
                }}
              />
              
              {/* Scale marks */}
              <div className="relative w-full mt-2">
                <div className="flex justify-between px-[12px]">
                  {[1, 2, 3, 4, 5, 6].map((mark) => (
                    <div key={mark} className="flex flex-col items-center">
                      <div className="w-0.5 h-3 bg-gray-400"></div>
                      <span className="text-xs text-gray-500 mt-1">{mark}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Selected tone display */}
            {sliderValue && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-16 h-16 rounded-full border-2 border-gray-300 shadow-sm"
                    style={{ backgroundColor: fitzpatrickScale[Math.round(sliderValue) - 1].color }}
                  />
                  <div>
                    <p className="font-medium text-gray-900">
                      {fitzpatrickScale[Math.round(sliderValue) - 1].label}
                    </p>
                    <p className="text-sm text-gray-600">
                      {fitzpatrickScale[Math.round(sliderValue) - 1].description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Skin Type
            <Tooltip 
              id="skintype" 
              text="Your skin type affects which products will work best for you"
              showTooltip={showTooltip}
              onShow={onShowTooltip}
              onHide={onHideTooltip}
            />
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skinTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => updateQuizData({ skinType: type.value })}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  quizData.skinType === type.value
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="font-medium text-gray-900">{type.label}</p>
                <p className="text-sm text-gray-600 mt-1">{type.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button variant="secondary" onClick={prevScreen}>
          Back
        </Button>
        <Button onClick={nextScreen} className="flex-1" disabled={!quizData.skinTone || !quizData.skinType}>
          Continue
        </Button>
      </div>
    </div>
  );
}

