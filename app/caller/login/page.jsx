"use client"
import React, { useState, useEffect } from 'react';
import { Phone, LogOut, Menu, X, Calendar, BarChart3, Settings, Home, CheckCircle } from 'lucide-react';
import Dashboard from './Dashboard';

// ==================== AUTHENTICATION HOOK ====================
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem('aijournal_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    };
    
    setTimeout(checkAuth, 500);
  }, []);

  const login = (phoneNumber) => {
    const userData = {
      phone: phoneNumber,
      callsRemaining: 7,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem('aijournal_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('aijournal_user');
    localStorage.removeItem('aijournal_tab');
    setUser(null);
  };

  return { user, login, logout, loading };
};

const LoadingScreen = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-gray-600">Loading your wellness journey...</p>
    </div>
  </div>
);

// ==================== MAIN DASHBOARD COMPONENT ====================

// ==================== MAIN APP COMPONENT ====================
const App = () => {
  const { user, login, logout, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }


  return <Dashboard user={user} onLogout={logout} />;
};

export default App;