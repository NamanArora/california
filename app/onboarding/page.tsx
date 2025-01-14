"use client"
import React, { useState } from 'react';
import { ChevronRight, Check } from 'lucide-react';

const OnboardingScreen = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Welcome to Therawin",
      description: "Your Purr-sonal Mental Wellness Companion",
      color: "purple",
      gradient: "from-purple-500 to-purple-500",
      illustration: (
        <svg viewBox="0 0 240 240" className="w-64 h-64 mx-auto">
          <circle cx="120" cy="120" r="100" fill="#FCE7F3" className="animate-pulse"/>
          
          {/* Center Cat */}
          <g transform="translate(100,85) scale(1.2)">
            <circle cx="20" cy="20" r="20" fill="#6B7280"/>
            <path d="M5 10 Q5 0 20 15 Q35 30 20 30 Z" fill="#6B7280"/>
            <path d="M35 10 Q35 0 20 15 Q5 30 20 30 Z" fill="#6B7280"/>
            <path d="M10 8 Q10 3 18 12 Z" fill="#FCA5A5"/>
            <path d="M30 8 Q30 3 22 12 Z" fill="#FCA5A5"/>
            <circle cx="13" cy="18" r="4" fill="white"/>
            <circle cx="27" cy="18" r="4" fill="white"/>
            <circle cx="15" cy="17" r="2" fill="#1F2937"/>
            <circle cx="29" cy="17" r="2" fill="#1F2937"/>
            <circle cx="14" cy="16" r="1" fill="white"/>
            <circle cx="28" cy="16" r="1" fill="white"/>
            <circle cx="8" cy="23" r="2" fill="#FCA5A5" opacity="0.6"/>
            <circle cx="32" cy="23" r="2" fill="#FCA5A5" opacity="0.6"/>
            <path d="M17 25 Q20 28 23 25" stroke="#4B5563" strokeWidth="1.5" fill="none"/>
          </g>
          
          {/* Left Cat */}
          <g transform="translate(50,100) scale(0.9) rotate(-15)">
            <circle cx="20" cy="20" r="20" fill="#8B5CF6"/>
            <path d="M5 10 Q5 0 20 15 Q35 30 20 30 Z" fill="#8B5CF6"/>
            <path d="M35 10 Q35 0 20 15 Q5 30 20 30 Z" fill="#8B5CF6"/>
            <path d="M10 8 Q10 3 18 12 Z" fill="#FCA5A5"/>
            <path d="M30 8 Q30 3 22 12 Z" fill="#FCA5A5"/>
            <circle cx="13" cy="18" r="4" fill="white"/>
            <circle cx="27" cy="18" r="4" fill="white"/>
            <circle cx="15" cy="17" r="2" fill="#1F2937"/>
            <circle cx="29" cy="17" r="2" fill="#1F2937"/>
            <circle cx="14" cy="16" r="1" fill="white"/>
            <circle cx="28" cy="16" r="1" fill="white"/>
            <circle cx="8" cy="23" r="2" fill="#FCA5A5" opacity="0.6"/>
            <circle cx="32" cy="23" r="2" fill="#FCA5A5" opacity="0.6"/>
            <path d="M17 25 Q20 28 23 25" stroke="white" strokeWidth="1.5" fill="none"/>
          </g>
          
          {/* Right Cat */}
          <g transform="translate(150,100) scale(0.9) rotate(15)">
            <circle cx="20" cy="20" r="20" fill="#EC4899"/>
            <path d="M5 10 Q5 0 20 15 Q35 30 20 30 Z" fill="#EC4899"/>
            <path d="M35 10 Q35 0 20 15 Q5 30 20 30 Z" fill="#EC4899"/>
            <path d="M10 8 Q10 3 18 12 Z" fill="#FCA5A5"/>
            <path d="M30 8 Q30 3 22 12 Z" fill="#FCA5A5"/>
            <circle cx="13" cy="18" r="4" fill="white"/>
            <circle cx="27" cy="18" r="4" fill="white"/>
            <circle cx="15" cy="17" r="2" fill="#1F2937"/>
            <circle cx="29" cy="17" r="2" fill="#1F2937"/>
            <circle cx="14" cy="16" r="1" fill="white"/>
            <circle cx="28" cy="16" r="1" fill="white"/>
            <circle cx="8" cy="23" r="2" fill="#FCA5A5" opacity="0.6"/>
            <circle cx="32" cy="23" r="2" fill="#FCA5A5" opacity="0.6"/>
            <path d="M17 25 Q20 28 23 25" stroke="white" strokeWidth="1.5" fill="none"/>
          </g>
        </svg>
      )
    },
    {
      title: "Your Privacy is Paw-fect!",
      description: "We keep your thoughts safe and secure with end-to-end encryption. Your secrets stay between you and your digital diary! 🐱",
      color: "blue",
      gradient: "from-blue-500 to-blue-500",
      illustration: (
        <svg viewBox="0 0 240 240" className="w-64 h-64 mx-auto">
          <circle cx="120" cy="120" r="90" fill="#E8F4FF" className="animate-pulse"/>
          <ellipse cx="120" cy="140" rx="45" ry="35" fill="#6B7280"/>
          <circle cx="120" cy="110" r="40" fill="#6B7280"/>
          <path d="M90 85 Q90 65 105 80 Q120 95 105 95 Z" fill="#6B7280"/>
          <path d="M150 85 Q150 65 135 80 Q120 95 135 95 Z" fill="#6B7280"/>
          <path d="M120 75 L95 90 Q95 140, 120 155 Q145 140, 145 90 Z" 
            fill="#60A5FA" className="animate-float"/>
          <circle cx="108" cy="110" r="8" fill="white"/>
          <circle cx="132" cy="110" r="8" fill="white"/>
          <circle cx="111" cy="108" r="3" fill="#1E3A8A"/>
          <circle cx="135" cy="108" r="3" fill="#1E3A8A"/>
          <circle cx="109" cy="106" r="2" fill="white"/>
          <circle cx="133" cy="106" r="2" fill="white"/>
          <circle cx="100" cy="120" r="4" fill="#FCA5A5" opacity="0.6"/>
          <circle cx="140" cy="120" r="4" fill="#FCA5A5" opacity="0.6"/>
          <path d="M115 122 Q120 126 125 122" stroke="#4B5563" strokeWidth="2" fill="none"/>
        </svg>
      )
    },
    {
      title: "Express Yourself",
      description: "Journal your thoughts, track your mood, and watch your mental wellness bloom. Every entry is a step toward growth! 📝",
      color: "pink",
      gradient: "from-pink-500 to-pink-500",
      illustration: (
        <svg viewBox="0 0 240 240" className="w-64 h-64 mx-auto">
          <circle cx="120" cy="120" r="90" fill="#FCE7F3"/>
          <rect x="70" y="90" width="100" height="120" rx="15" fill="#EC4899" className="animate-float"/>
          <rect x="75" y="95" width="90" height="110" rx="12" fill="white"/>
          <circle cx="120" cy="80" r="35" fill="#6B7280"/>
          <path d="M95 65 Q95 45 110 60 Q125 75 110 75 Z" fill="#6B7280"/>
          <path d="M145 65 Q145 45 130 60 Q115 75 130 75 Z" fill="#6B7280"/>
          <circle cx="108" cy="75" r="7" fill="white"/>
          <circle cx="132" cy="75" r="7" fill="white"/>
          <circle cx="111" cy="73" r="3" fill="#1F2937"/>
          <circle cx="135" cy="73" r="3" fill="#1F2937"/>
          <circle cx="100" cy="85" r="4" fill="#FCA5A5" opacity="0.6"/>
          <circle cx="140" cy="85" r="4" fill="#FCA5A5" opacity="0.6"/>
          <path d="M115 87 Q120 91 125 87" stroke="#4B5563" strokeWidth="2" fill="none"/>
        </svg>
      )
    },
    {
        title: "Meow-velous Planning",
        description: "Stay organized with our intuitive planner! Set goals, track habits, and create a daily routine that brings out your best self! ✨",
        color: "green",
        gradient: "from-emerald-500 to-emerald-500",
        illustration: (
          <svg viewBox="0 0 240 240" className="w-64 h-64 mx-auto">
            {/* Cute Planner Cat SVG content */}
            <circle cx="120" cy="120" r="90" fill="#ECFDF5"/>
            <circle cx="120" cy="120" r="70" fill="#F0FDF4"/>
            
            <rect x="60" y="80" width="120" height="120" rx="15" fill="#059669" className="animate-float"/>
            <rect x="65" y="100" width="110" height="95" rx="12" fill="white"/>
            
            <rect x="65" y="85" width="110" height="20" rx="10" fill="#047857"/>
            <circle cx="85" cy="95" r="6" fill="#6EE7B7"/>
            <circle cx="105" cy="95" r="6" fill="#6EE7B7"/>
            
            <rect x="75" y="110" width="25" height="25" rx="8" fill="#D1FAE5"/>
            <rect x="105" y="110" width="25" height="25" rx="8" fill="#D1FAE5"/>
            <rect x="135" y="110" width="25" height="25" rx="8" fill="#D1FAE5"/>
            
            <rect x="75" y="140" width="25" height="25" rx="8" fill="#D1FAE5"/>
            <rect x="105" y="140" width="25" height="25" rx="8" fill="#10B981"/>
            <rect x="135" y="140" width="25" height="25" rx="8" fill="#D1FAE5"/>
            
            <circle cx="120" cy="60" r="35" fill="#6B7280"/>
            
            <path d="M95 45 Q95 25 110 40 Q125 55 110 55 Z" fill="#6B7280"/>
            <path d="M145 45 Q145 25 130 40 Q115 55 130 55 Z" fill="#6B7280"/>
            <path d="M100 40 Q100 30 110 40 Z" fill="#FCA5A5"/>
            <path d="M140 40 Q140 30 130 40 Z" fill="#FCA5A5"/>
            
            <circle cx="108" cy="55" r="7" fill="white"/>
            <circle cx="132" cy="55" r="7" fill="white"/>
            <circle cx="111" cy="53" r="3" fill="#1F2937"/>
            <circle cx="135" cy="53" r="3" fill="#1F2937"/>
            <circle cx="109" cy="51" r="2" fill="white"/>
            <circle cx="133" cy="51" r="2" fill="white"/>
            
            <circle cx="100" cy="65" r="4" fill="#FCA5A5" opacity="0.6"/>
            <circle cx="140" cy="65" r="4" fill="#FCA5A5" opacity="0.6"/>
            
            <path d="M115 67 Q120 71 125 67" stroke="#4B5563" strokeWidth="2" fill="none"/>
          </svg>
        )
      },
      {
        title: "Meet Your AI Health Companion",
        description: "Hi! I'm Dr. Whiskers, your friendly AI wellness assistant. Let's work together to support your mental health journey! 🏥",
        color: "sky",
        gradient: "from-sky-500 to-sky-500",
        illustration: <svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* <radialGradient id="docGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" style="stop-color:#F0F9FF;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#E0F2FE;stop-opacity:1" />
            </radialGradient> */}
          </defs>
          <circle cx="120" cy="120" r="90" fill="url(#docGlow)" className="animate-pulse"/>
          <path d="M85 110 L85 170 Q120 190 155 170 L155 110" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2"/>
          <rect x="85" y="110" width="70" height="20" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2"/>
          <ellipse cx="120" cy="125" rx="30" ry="25" fill="#6B7280"/>
          <circle cx="120" cy="95" r="30" fill="#6B7280"/>
          <path d="M95 75 Q120 65 145 75 L140 85 Q120 75 100 85 Z" fill="#0EA5E9"/>
          <circle cx="120" cy="70" r="3" fill="#38BDF8"/>
          <path d="M95 75 L85 55 L105 70 Z" fill="#6B7280"/>
          <path d="M145 75 L155 55 L135 70 Z" fill="#6B7280"/>
          <circle cx="108" cy="95" r="8" fill="white"/>
          <circle cx="132" cy="95" r="8" fill="white"/>
          <circle cx="108" cy="95" r="4" fill="#0EA5E9"/>
          <circle cx="132" cy="95" r="4" fill="#0EA5E9"/>
          <circle cx="106" cy="93" r="2" fill="white"/>
          <circle cx="130" cy="93" r="2" fill="white"/>
          <path d="M112 105 Q120 110 128 105" stroke="#4B5563" strokeWidth="2" fill="none"/>
          <path d="M105 130 Q95 140 95 150 Q95 160 105 165 Q115 170 125 165 Q135 160 135 150" fill="none" stroke="#0EA5E9" strokeWidth="3" className="animate-float"/>
          <circle cx="95" cy="150" r="5" fill="#0EA5E9"/>
          <path d="M105 130 Q120 125 135 130" fill="none" stroke="#0EA5E9" strokeWidth="3"/>
          <circle cx="135" cy="150" r="5" fill="#0EA5E9"/>
          <rect x="95" y="140" width="20" height="25" rx="2" fill="none" stroke="#E2E8F0" strokeWidth="1"/>
          <g className="animate-pulse">
            <circle cx="85" cy="85" r="2" fill="#38BDF8"/>
            <circle cx="155" cy="85" r="2" fill="#38BDF8"/>
            <circle cx="120" cy="160" r="2" fill="#38BDF8"/>
          </g>
          <g className="animate-float-particle-1" transform="translate(70,70)">
            <path d="M0 5 H10 M5 0 V10" stroke="#38BDF8" strokeWidth="2"/>
          </g>
          <g className="animate-float-particle-2" transform="translate(160,70)">
            <path d="M0 5 H10 M5 0 V10" stroke="#38BDF8" strokeWidth="2"/>
          </g>
          <rect x="100" y="120" width="40" height="10" rx="2" fill="#0EA5E9"/>
          <rect x="102" y="122" width="36" height="6" rx="1" fill="white"/>
          <path d="M70 180 Q80 180 85 170 Q90 160 95 170 Q100 180 105 180" stroke="#38BDF8" strokeWidth="1" fill="none" className="animate-pulse"/>
          <path d="M135 180 Q140 180 145 170 Q150 160 155 170 Q160 180 165 180" stroke="#38BDF8" strokeWidth="1" fill="none" className="animate-pulse"/>
        </svg>,
      }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-100 flex z-50">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-full transition-all duration-500 ${
              index <= currentSlide ? `bg-gradient-to-r ${slides[currentSlide].gradient}` : ''
            }`}
            style={{ width: `${100 / slides.length}%` }}
          />
        ))}
      </div>

      {/* Skip button */}
      <button 
        className="fixed top-4 right-4 text-sm text-gray-500 hover:text-gray-700
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
          z-50"
      >
        Skip
      </button>

      {/* Main content */}
      <div className="flex-1 p-6 flex flex-col">
        <div 
          key={currentSlide} 
          className="flex-1 flex flex-col items-center justify-center 
            animate-fade-slide-up space-y-8"
        >
          {/* Illustration */}
          <div className="relative w-64 h-64">
            {slides[currentSlide].illustration}
          </div>

          {/* Text content */}
          <div className="text-center space-y-4 max-w-xs">
            <h2 className={`text-2xl font-bold bg-gradient-to-r ${slides[currentSlide].gradient} 
              bg-clip-text text-transparent`}>
              {slides[currentSlide].title}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              {slides[currentSlide].description}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-6 mt-8">
          {/* Dots */}
          <div className="flex justify-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 
                  ${index === currentSlide 
                    ? `w-6 bg-gradient-to-r ${slides[currentSlide].gradient}` 
                    : 'bg-gray-300'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Action button */}
          <button
            onClick={handleNext}
            className={`w-full py-4 rounded-xl text-white font-medium
              bg-gradient-to-r ${slides[currentSlide].gradient}
              transform transition-all duration-300 hover:scale-102
              focus:outline-none focus:ring-2 focus:ring-offset-2 
              focus:ring-${slides[currentSlide].color}-500
              flex items-center justify-center gap-2`}
          >
            {currentSlide === slides.length - 1 ? (
              <>
                Get Started
                <Check className="w-5 h-5" />
              </>
            ) : (
              <>
                Continue
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;