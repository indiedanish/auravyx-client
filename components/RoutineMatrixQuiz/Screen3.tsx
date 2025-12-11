'use client';

import React from 'react';
import Button from '../Button';
import Tooltip from './Tooltip';
import { QuizData } from './types';
import { ingredientPreferences } from './constants';

interface Screen3Props {
  quizData: QuizData;
  updateQuizData: (data: Partial<QuizData>) => void;
  newProduct: string;
  setNewProduct: (value: string) => void;
  addProduct: (e?: React.FormEvent) => void;
  removeProduct: (index: number) => void;
  togglePreference: (pref: string) => void;
  nextScreen: () => void;
  prevScreen: () => void;
  showTooltip: string | null;
  onShowTooltip: (id: string) => void;
  onHideTooltip: () => void;
}

export default function Screen3({ 
  quizData, 
  updateQuizData, 
  newProduct,
  setNewProduct,
  addProduct,
  removeProduct,
  togglePreference,
  nextScreen, 
  prevScreen,
  showTooltip,
  onShowTooltip,
  onHideTooltip
}: Screen3Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-display font-medium text-gray-900 mb-6">Your Current Routine</h3>
        <p className="text-gray-600 mb-8">Tell us about products you're using and any preferences</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Current Products (Max 5 for Freemium)
            <Tooltip 
              id="products" 
              text="Add up to 5 products to analyze how they fit your skin profile"
              showTooltip={showTooltip}
              onShow={onShowTooltip}
              onHide={onHideTooltip}
            />
          </label>
          
          <form onSubmit={addProduct} className="flex gap-2 mb-3">
            <input
              type="text"
              value={newProduct}
              onChange={(e) => setNewProduct(e.target.value)}
              placeholder="e.g., CeraVe Hydrating Cleanser"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              disabled={quizData.currentProducts.length >= 5}
              autoComplete="off"
            />
            <Button
              type="submit"
              disabled={!newProduct.trim() || quizData.currentProducts.length >= 5}
            >
              Add
            </Button>
          </form>

          {quizData.currentProducts.length > 0 && (
            <div className="space-y-2">
              {quizData.currentProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                  <span className="text-gray-900">{product}</span>
                  <button
                    type="button"
                    onClick={() => removeProduct(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
          <p className="text-sm text-gray-500 mt-2">
            {quizData.currentProducts.length}/5 products added
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Ingredient Preferences & Restrictions
            <Tooltip 
              id="preferences" 
              text="Select any ingredient preferences or restrictions to filter product recommendations"
              showTooltip={showTooltip}
              onShow={onShowTooltip}
              onHide={onHideTooltip}
            />
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ingredientPreferences.map((pref) => (
              <button
                key={pref}
                type="button"
                onClick={() => togglePreference(pref)}
                className={`px-3 py-2 border rounded-lg text-sm transition-all ${
                  quizData.preferences?.includes(pref)
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                {pref}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Any specific allergies or sensitivities?
          </label>
          <textarea
            value={quizData.allergies?.join(', ') || ''}
            onChange={(e) => updateQuizData({ 
              allergies: e.target.value.split(',').map(a => a.trim()).filter(a => a) 
            })}
            placeholder="e.g., Niacinamide, Retinol, Vitamin C"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            rows={3}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button variant="secondary" onClick={prevScreen}>
          Back
        </Button>
        <Button onClick={nextScreen} className="flex-1">
          Continue
        </Button>
      </div>
    </div>
  );
}

