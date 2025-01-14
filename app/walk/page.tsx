"use client"
import React, { useState, useRef, useEffect } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogAction } from '@/components/ui/alert-dialog';
import { ArrowRight, ArrowLeft, Home, Settings, Bell, User } from 'lucide-react';

const DemoApp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showWalkthrough, setShowWalkthrough] = useState(true);
  const [highlightPosition, setHighlightPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [dialogPosition, setDialogPosition] = useState('bottom');

  const refs = {
    dashboard: useRef(null),
    notifications: useRef(null),
    profile: useRef(null),
    settings: useRef(null)
  };

  const steps = [
    {
      targetRef: 'dashboard',
      title: 'Dashboard',
      description: 'View all your important metrics and data at a glance.',
    },
    {
      targetRef: 'notifications',
      title: 'Notifications',
      description: 'Stay updated with real-time alerts and messages.',
    },
    {
      targetRef: 'profile',
      title: 'Profile',
      description: 'Manage your personal information and preferences.',
    },
    {
      targetRef: 'settings',
      title: 'Settings',
      description: 'Configure your app settings and customize your experience.',
    }
  ];

  useEffect(() => {
    if (showWalkthrough && steps[currentStep]) {
      const targetRef = refs[steps[currentStep].targetRef];
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        setHighlightPosition({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        });

        // Determine if dialog should appear above or below the highlight
        // based on available space
        const spaceBelow = windowHeight - (rect.bottom + 20) - 200; // 200px is approximate dialog height
        setDialogPosition(spaceBelow > 0 ? 'bottom' : 'top');
      }
    }
  }, [currentStep, showWalkthrough]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowWalkthrough(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    setShowWalkthrough(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* App Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">My App</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Dashboard Section */}
          <button
            ref={refs.dashboard}
            className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <Home className="w-6 h-6 mb-2" />
            <h2 className="text-lg font-semibold">Dashboard</h2>
            <p className="text-gray-600">View your analytics</p>
          </button>

          {/* Notifications Section */}
          <button
            ref={refs.notifications}
            className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <Bell className="w-6 h-6 mb-2" />
            <h2 className="text-lg font-semibold">Notifications</h2>
            <p className="text-gray-600">Check your alerts</p>
          </button>

          {/* Profile Section */}
          <button
            ref={refs.profile}
            className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <User className="w-6 h-6 mb-2" />
            <h2 className="text-lg font-semibold">Profile</h2>
            <p className="text-gray-600">Manage your account</p>
          </button>

          {/* Settings Section */}
          <button
            ref={refs.settings}
            className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <Settings className="w-6 h-6 mb-2" />
            <h2 className="text-lg font-semibold">Settings</h2>
            <p className="text-gray-600">Configure app</p>
          </button>
        </div>
      </main>

      {/* Walkthrough Overlay */}
      {showWalkthrough && (
        <>
          {/* Semi-transparent overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50" />

          {/* Highlight circle */}
          <div
            className="fixed transition-all duration-300 ease-in-out"
            style={{
              top: highlightPosition.top - 8,
              left: highlightPosition.left - 8,
              width: highlightPosition.width + 16,
              height: highlightPosition.height + 16,
              boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.75)',
              borderRadius: '8px',
              zIndex: 40
            }}
          />

          {/* Mobile-friendly Walkthrough Dialog */}
          <AlertDialog open={showWalkthrough}>
            <AlertDialogContent
              className={`fixed w-[calc(100%-2rem)] max-w-md mx-4 transition-all duration-300 ${dialogPosition === 'bottom' ? 'bottom-4' : 'top-4'
                }`}
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 50
              }}
            >
              <div className="flex flex-col space-y-4">
                <h2 className="text-xl font-semibold">{steps[currentStep].title}</h2>

                <AlertDialogDescription>
                  {steps[currentStep].description}
                </AlertDialogDescription>

                <div className="flex flex-col sm:flex-row items-center justify-between w-full mt-4 space-y-4 sm:space-y-0">
                  <button
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className={`flex items-center space-x-1 px-4 py-2 rounded-md w-full sm:w-auto justify-center
                      ${currentStep === 0 ? 'text-gray-400' : 'text-blue-600 hover:bg-blue-50'}`}
                  >
                    <ArrowLeft size={16} />
                    <span>Previous</span>
                  </button>

                  <div className="flex space-x-1">
                    {steps.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                      />
                    ))}
                  </div>

                  {currentStep < steps.length - 1 ? (
                    <button
                      onClick={handleNext}
                      className="flex items-center space-x-1 px-4 py-2 rounded-md text-blue-600 hover:bg-blue-50 w-full sm:w-auto justify-center"
                    >
                      <span>Next</span>
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <AlertDialogAction onClick={handleNext} className="w-full sm:w-auto">
                      Get Started
                    </AlertDialogAction>
                  )}
                </div>

                {currentStep < steps.length - 1 && (
                  <button
                    onClick={handleSkip}
                    className="text-gray-500 hover:text-gray-700 w-full sm:w-auto text-center"
                  >
                    Skip Tour
                  </button>
                )}
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  );
};

export default DemoApp;