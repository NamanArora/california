"use client"
import React, { useState, useEffect } from 'react';
import { Phone, LogOut, Menu, X, Calendar, BarChart3, Settings, Home, CheckCircle } from 'lucide-react';
import HomeTab from './HomeTab';
import ReportsTab from './ReportsTab';
import SettingsTab from './SettingsTab';

const Navigation = ({ activeTab, setActiveTab, user, onLogout, isMobile, showMobileMenu, setShowMobileMenu }) => {
    const tabs = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'reports', label: 'Reports', icon: BarChart3 },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    const maskPhoneNumber = (phone) => {
        const digits = phone.replace(/\D/g, '');
        if (digits.length >= 10) {
            return `+1 XXX-XXX-${digits.slice(-4)}`;
        }
        return phone;
    };

    if (isMobile) {
        return (
            <>
                <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full flex items-center justify-center">
                            <Phone className="w-4 h-4 text-white" />
                        </div>
                        <h1 className="text-lg font-semibold text-gray-900">AI Journal</h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                            {user.callsRemaining} calls left
                        </div>
                        <button
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                            {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </header>

                {showMobileMenu && (
                    <div className="bg-white border-b border-gray-200 px-4 py-3">
                        <div className="space-y-1">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => {
                                            setActiveTab(tab.id);
                                            setShowMobileMenu(false);
                                        }}
                                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left ${activeTab === tab.id
                                            ? 'bg-blue-50 text-blue-600 font-medium'
                                            : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span>{tab.label}</span>
                                    </button>
                                );
                            })}
                            <div className="border-t pt-3 mt-3">
                                <div className="px-3 py-2 text-sm text-gray-600">
                                    {maskPhoneNumber(user.phone)}
                                </div>
                                <button
                                    onClick={onLogout}
                                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-red-600 hover:bg-red-50"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }

    return (
        <div className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full flex items-center justify-center">
                            <Phone className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-xl font-bold text-gray-900">AI Journaling Service</h1>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
                            {user.callsRemaining} free calls remaining
                        </div>
                        <div className="text-sm text-gray-600">
                            {maskPhoneNumber(user.phone)}
                        </div>
                        <button
                            onClick={onLogout}
                            className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>

                <div className="flex space-x-8 -mb-px">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const Dashboard = ({ user, onLogout }) => {
    if (user == null) {
        const userData = {
            phone: 9910090567,
            callsRemaining: 7,
            loginTime: new Date().toISOString()
        };
        user = userData;
    }
    const [activeTab, setActiveTab] = useState(() => {
        return localStorage.getItem('aijournal_tab') || 'reports';
    });
    const [isMobile, setIsMobile] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    useEffect(() => {
        localStorage.setItem('aijournal_tab', activeTab);
    }, [activeTab]);

    const hasCallData = user.callsRemaining < 10;

    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return <HomeTab />;
            case 'reports':
                return <ReportsTab hasCallData={hasCallData} />;
            case 'settings':
                return <SettingsTab />;
            default:
                return <ReportsTab hasCallData={hasCallData} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                user={user}
                onLogout={onLogout}
                isMobile={isMobile}
                showMobileMenu={showMobileMenu}
                setShowMobileMenu={setShowMobileMenu}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {renderContent()}
            </main>
        </div>
    );
};

export default Dashboard;