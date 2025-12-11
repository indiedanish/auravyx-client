'use client';

import React, { useState, useCallback } from 'react';
import Container from './Container';
import Button from './Button';
import Section from './Section';
import { QuizData } from './RoutineMatrixQuiz/types';
import Tooltip from './RoutineMatrixQuiz/Tooltip';
import Screen1 from './RoutineMatrixQuiz/Screen1';
import Screen2 from './RoutineMatrixQuiz/Screen2';
import Screen3 from './RoutineMatrixQuiz/Screen3';
import Screen4 from './RoutineMatrixQuiz/Screen4';
import Screen5 from './RoutineMatrixQuiz/Screen5';

export default function RoutineMatrixQuiz() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [quizData, setQuizData] = useState<QuizData>({
    currentProducts: [],
  });
  const [newProduct, setNewProduct] = useState('');
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  // ✅ Using useCallback to memoize functions and prevent unnecessary re-renders
  const updateQuizData = useCallback((data: Partial<QuizData>) => {
    setQuizData(prev => ({ ...prev, ...data }));
  }, []);

  const nextScreen = useCallback(() => {
    setCurrentScreen(prev => (prev < 4 ? prev + 1 : prev));
  }, []);

  const prevScreen = useCallback(() => {
    setCurrentScreen(prev => (prev > 0 ? prev - 1 : prev));
  }, []);

  const startQuiz = useCallback(() => {
    setIsQuizOpen(true);
    setCurrentScreen(0);
    setQuizData({ currentProducts: [] });
  }, []);

  const closeQuiz = useCallback(() => {
    setIsQuizOpen(false);
    setCurrentScreen(0);
  }, []);

  const addProduct = useCallback((e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (newProduct.trim() && quizData.currentProducts.length < 5) {
      setQuizData(prev => ({
        ...prev,
        currentProducts: [...prev.currentProducts, newProduct.trim()]
      }));
      setNewProduct('');
    }
  }, [newProduct, quizData.currentProducts.length]);

  const removeProduct = useCallback((index: number) => {
    setQuizData(prev => ({
      ...prev,
      currentProducts: prev.currentProducts.filter((_, i) => i !== index)
    }));
  }, []);

  const toggleGoal = useCallback((goal: string) => {
    setQuizData(prev => {
      const currentGoals = prev.goals || [];
      return {
        ...prev,
        goals: currentGoals.includes(goal)
          ? currentGoals.filter(g => g !== goal)
          : [...currentGoals, goal]
      };
    });
  }, []);

  const togglePreference = useCallback((pref: string) => {
    setQuizData(prev => {
      const currentPrefs = prev.preferences || [];
      return {
        ...prev,
        preferences: currentPrefs.includes(pref)
          ? currentPrefs.filter(p => p !== pref)
          : [...currentPrefs, pref]
      };
    });
  }, []);

  const handleShowTooltip = useCallback((id: string) => {
    setShowTooltip(id);
  }, []);

  const handleHideTooltip = useCallback(() => {
    setShowTooltip(null);
  }, []);

  // Render the appropriate screen based on currentScreen
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 0:
        return (
          <Screen1
            quizData={quizData}
            updateQuizData={updateQuizData}
            nextScreen={nextScreen}
            showTooltip={showTooltip}
            onShowTooltip={handleShowTooltip}
            onHideTooltip={handleHideTooltip}
          />
        );
      case 1:
        return (
          <Screen2
            quizData={quizData}
            updateQuizData={updateQuizData}
            nextScreen={nextScreen}
            prevScreen={prevScreen}
            showTooltip={showTooltip}
            onShowTooltip={handleShowTooltip}
            onHideTooltip={handleHideTooltip}
          />
        );
      case 2:
        return (
          <Screen3
            quizData={quizData}
            updateQuizData={updateQuizData}
            newProduct={newProduct}
            setNewProduct={setNewProduct}
            addProduct={addProduct}
            removeProduct={removeProduct}
            togglePreference={togglePreference}
            nextScreen={nextScreen}
            prevScreen={prevScreen}
            showTooltip={showTooltip}
            onShowTooltip={handleShowTooltip}
            onHideTooltip={handleHideTooltip}
          />
        );
      case 3:
        return (
          <Screen4
            quizData={quizData}
            updateQuizData={updateQuizData}
            toggleGoal={toggleGoal}
            nextScreen={nextScreen}
            prevScreen={prevScreen}
            showTooltip={showTooltip}
            onShowTooltip={handleShowTooltip}
            onHideTooltip={handleHideTooltip}
          />
        );
      case 4:
        return (
          <Screen5
            quizData={quizData}
            closeQuiz={closeQuiz}
            prevScreen={prevScreen}
            showTooltip={showTooltip}
            onShowTooltip={handleShowTooltip}
            onHideTooltip={handleHideTooltip}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Section id="routine-matrix" className="bg-gradient-to-br from-sage-50 to-primary-50">
      <Container>
        {!isQuizOpen ? (
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-primary-200 mb-4">
                <span className="text-primary-700 font-medium">Introducing</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-display font-medium mb-4 text-gray-900">
                RoutineMatrix™
                <Tooltip 
                  id="routinematrix" 
                  text="RoutineMatrix™ is your personalized, adaptive skincare routine engine powered by AI that understands your unique skin profile and evolves with you." 
                  showTooltip={showTooltip}
                  onShow={handleShowTooltip}
                  onHide={handleHideTooltip}
                />
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Your personalised, adaptive skincare routine engine.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-primary-100 mb-8">
              <h3 className="text-2xl font-display font-medium text-gray-900 mb-4">
                Find out what routine is best for you
              </h3>
              <p className="text-gray-600 mb-6">
                Take our intelligent quiz to get personalized skincare recommendations based on your unique skin profile, goals, and preferences.
              </p>
              
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-primary-50 rounded-lg p-4 border border-primary-100">
                  <div className="text-3xl mb-2">🎯</div>
                  <p className="text-sm font-medium text-gray-900">Personalized</p>
                  <p className="text-xs text-gray-600 mt-1">Based on your unique skin</p>
                </div>
                <div className="bg-primary-50 rounded-lg p-4 border border-primary-100">
                  <div className="text-3xl mb-2">🧬</div>
                  <p className="text-sm font-medium text-gray-900">Science-Backed</p>
                  <p className="text-xs text-gray-600 mt-1">Fitzpatrick scale & AI</p>
                </div>
                <div className="bg-primary-50 rounded-lg p-4 border border-primary-100">
                  <div className="text-3xl mb-2">⚡</div>
                  <p className="text-sm font-medium text-gray-900">Quick & Easy</p>
                  <p className="text-xs text-gray-600 mt-1">Just 2-3 minutes</p>
                </div>
              </div>

              <Button onClick={startQuiz} className="text-lg px-8 py-4">
                Take RoutineMatrix™ Quiz
              </Button>
            </div>

            <p className="text-sm text-gray-500">
              Takes only 2-3 minutes • No signup required to try
            </p>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            {/* Progress indicator */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Step {currentScreen + 1} of 5
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round(((currentScreen + 1) / 5) * 100)}% Complete
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary-600 to-sage-600 transition-all duration-300"
                  style={{ width: `${((currentScreen + 1) / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Quiz content */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
              {renderCurrentScreen()}
            </div>

            {/* Close button */}
            <div className="text-center mt-4">
              <button
                onClick={closeQuiz}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Exit Quiz
              </button>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}

