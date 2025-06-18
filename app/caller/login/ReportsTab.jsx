"use client"
import React, { useState, useEffect } from 'react';
import { Phone, LogOut, Menu, X, Calendar, BarChart3, Settings, Home, CheckCircle } from 'lucide-react';

const ReportsTab = ({ hasCallData }) => {
    const EmptyState = () => (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-orange-100 rounded-full mx-auto mb-6 flex items-center justify-center">
          <BarChart3 className="w-12 h-12 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Journaling Journey Awaits</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Complete your first AI therapy call to see your insights here. Every conversation is a step toward better mental wellness.
        </p>
        <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200">
          Schedule My First Call
        </button>
        
        <div className="mt-8 max-w-md mx-auto">
          <h4 className="font-medium text-gray-900 mb-3">What you'll see after your first call:</h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Emotional wellness insights and mood analysis</li>
            <li>• Stress level tracking and management tips</li>
            <li>• Personal growth indicators and achievements</li>
            <li>• Patterns in your daily experiences</li>
          </ul>
        </div>
      </div>
    );
  
    return (
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Journaling Insights</h2>
          <p className="text-gray-600">Track your emotional wellness journey through detailed insights from each session.</p>
        </div>
        
        {hasCallData ? <SampleReport /> : <EmptyState />}
      </div>
    );
  };
  
  // ==================== SAMPLE REPORT COMPONENT ====================
  const SampleReport = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Latest Session (needs input from DS team)</h3>
          <span className="text-sm text-gray-500">Today, 7:30 PM</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">8.2</div>
            <div className="text-sm text-green-700">Wellness Score</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">Content</div>
            <div className="text-sm text-blue-700">Primary Mood</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">12:34</div>
            <div className="text-sm text-orange-700">Duration</div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-2">Key Insights</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• You expressed gratitude for family support</li>
            <li>• Work stress levels were moderate today</li>
            <li>• Mentioned feeling accomplished about project completion</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sessions</h3>
        <div className="space-y-3">
          {[
            { date: 'Yesterday', score: 7.5, mood: 'Reflective' },
            { date: 'June 14', score: 6.8, mood: 'Anxious' },
            { date: 'June 13', score: 8.9, mood: 'Energetic' },
          ].map((session, index) => (
            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div>
                <div className="font-medium text-gray-900">{session.date}</div>
                <div className="text-sm text-gray-600">{session.mood}</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-900">{session.score}</div>
                <div className="text-sm text-gray-500">Score</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  export default ReportsTab;