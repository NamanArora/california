"use client";

import React, { useState } from 'react';
import { Plane, Home, FileCheck, Building2, Heart } from 'lucide-react';

const StepButtons = () => {
    const [hoveredStep, setHoveredStep] = useState(null);

    const steps = [
        {
            id: 'arrival',
            title: 'Arrival',
            subtitle: 'Step 1',
            icon: Plane,
            color: 'from-sky-400 to-blue-500'
        },
        {
            id: 'housing',
            title: 'Housing',
            subtitle: 'Step 2',
            icon: Home,
            color: 'from-green-400 to-emerald-500'
        },
        {
            id: 'legal',
            title: 'Documents',
            subtitle: 'Step 3',
            icon: FileCheck,
            color: 'from-orange-400 to-red-500'
        },
        {
            id: 'work',
            title: 'Work',
            subtitle: 'Step 4',
            icon: Building2,
            color: 'from-purple-400 to-indigo-500'
        },
        {
            id: 'lifestyle',
            title: 'Lifestyle',
            subtitle: 'Step 5',
            icon: Heart,
            color: 'from-pink-400 to-rose-500'
        }
    ];

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-white shadow-lg relative overflow-hidden">
            {/* Background glow effect */}
            {hoveredStep !== null && (
                <div
                    className={`absolute inset-0 opacity-30 blur-3xl transition-all duration-500 z-0
                     bg-gradient-to-r ${steps[hoveredStep].color}`}
                />
            )}

            <div className="container mx-auto py-6 px-4 relative z-10">
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 relative">
                    {/* Connector line behind the buttons */}
                    <div className="hidden absolute top-1/2 left-[10%] right-[10%] h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform -translate-y-1/2" />

                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className="relative group"
                            onMouseEnter={() => setHoveredStep(null)}
                            onMouseLeave={() => setHoveredStep(null)}
                        >
                            <button
                                onClick={() => scrollToSection(step.id)}
                                className="relative flex flex-col items-center"
                            >
                                {/* Step number badge */}
                                <div className={`absolute -top-3 -right-3 w-6 h-6 rounded-full bg-white 
                                shadow-md flex items-center justify-center text-sm font-bold 
                                transition-all duration-300 z-20
                                group-hover:scale-110 group-hover:shadow-lg
                                ${hoveredStep === index ? 'text-white bg-gradient-to-r ' + step.color : 'text-gray-600'}`}>
                                    {index + 1}
                                </div>

                                {/* Main button */}
                                <div className={`w-24 h-24 rounded-full bg-gradient-to-r ${step.color} 
                               shadow-lg flex items-center justify-center 
                               transition-all duration-300 relative z-10
                               group-hover:scale-110 group-hover:shadow-xl
                               group-hover:rotate-3`}>
                                    <step.icon className={`w-10 h-10 text-white transition-transform duration-300
                                      group-hover:scale-110`} />

                                    {/* Glow effect */}
                                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${step.color}
                                 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300`} />
                                </div>

                                {/* Button text */}
                                <div className="mt-2 text-center transition-transform duration-300 group-hover:transform group-hover:translate-y-1">
                                    <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">{step.subtitle}</p>
                                    <p className="font-bold text-gray-800 group-hover:text-black">{step.title}</p>
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StepButtons;