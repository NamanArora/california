"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import {
    Bell,
    AlertTriangle,
    ArrowUpRight,
    Users,
    Activity,
    TrendingUp,
    Home,
    UserCircle,
    BarChart,
    Brain,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
    HelpCircle
} from 'lucide-react';
import MyClientsPage from './MyClientsPage';
import TeamsTab from './TeamsTab';
import AnalyticsTab from './AnalyticsTab';
import ClientDetailsPage from './ClientDetailsPage';
import SettingsPage from './Settings';

// Sample data for demonstration
const performanceData = [
    { month: 'Jan', activeClients: 65, progress: 75 },
    { month: 'Feb', activeClients: 72, progress: 78 },
    { month: 'Mar', activeClients: 80, progress: 82 },
    { month: 'Apr', activeClients: 85, progress: 85 }
];

const DashboardContent = () => {
    const [sessionView, setSessionView] = useState('personal');

    return (
        <>
            {/* Priority Insights Section */}
            <div className="grid grid-cols-3 gap-6 mb-6">
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <Bell className="h-5 w-5 text-blue-500" />
                            Today's Priority Insights
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Alert className="border-blue-100 bg-blue-50">
                                <AlertTriangle className="h-4 w-4 text-blue-500" />
                                <AlertDescription className="text-sm text-slate-700">
                                    Client John D. showed increased anxiety symptoms in latest session
                                    <span className="ml-2 text-blue-600 text-xs">View Recording →</span>
                                </AlertDescription>
                            </Alert>
                            <Alert className="border-amber-100 bg-amber-50">
                                <AlertTriangle className="h-4 w-4 text-amber-500" />
                                <AlertDescription className="text-sm text-slate-700">
                                    Treatment milestone reached for 3 clients
                                    <span className="ml-2 text-amber-600 text-xs">Review Progress →</span>
                                </AlertDescription>
                            </Alert>
                        </div>
                    </CardContent>
                </Card>


                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                            Risk Alerts
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-red-800">High Risk</span>
                                    <span className="text-xs text-red-600">2 clients</span>
                                </div>
                            </div>
                            <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-amber-800">Medium Risk</span>
                                    <span className="text-xs text-amber-600">5 clients</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Team Performance Section */}
            <div className="grid grid-cols-4 gap-6 mb-6">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">Active Cases</p>
                                <h3 className="text-2xl font-bold text-slate-800">127</h3>
                            </div>
                            <Users className="h-8 w-8 text-blue-500" />
                        </div>
                        <div className="mt-2">
                            <span className="text-xs text-green-600 flex items-center">
                                <ArrowUpRight className="h-3 w-3" /> +5% from last month
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">Client Progress</p>
                                <h3 className="text-2xl font-bold text-slate-800">85%</h3>
                            </div>
                            <Activity className="h-8 w-8 text-blue-500" />
                        </div>
                        <div className="mt-2">
                            <span className="text-xs text-green-600 flex items-center">
                                <ArrowUpRight className="h-3 w-3" /> +2% improvement
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">Session Score</p>
                                <h3 className="text-2xl font-bold text-slate-800">4.8</h3>
                            </div>
                            <TrendingUp className="h-8 w-8 text-blue-500" />
                        </div>
                        <div className="mt-2">
                            <span className="text-xs text-green-600 flex items-center">
                                <ArrowUpRight className="h-3 w-3" /> +0.3 points
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">Team Members</p>
                                <h3 className="text-2xl font-bold text-slate-800">12</h3>
                            </div>
                            <Users className="h-8 w-8 text-blue-500" />
                        </div>
                        <div className="mt-2">
                            <span className="text-xs text-blue-600">All active</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Sessions and Team Members Grid */}
            <div className="grid grid-cols-5 gap-6">
                {/* Upcoming Sessions - 60% width */}
                <Card className="col-span-3">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-semibold">Upcoming Sessions</CardTitle>
                        <select
                            value={sessionView}
                            onChange={(e) => setSessionView(e.target.value)}
                            className="text-sm border rounded-md px-2 py-1 text-slate-600">
                            <option value="personal">My Clients</option>
                            <option value="team">Team Clients</option>
                        </select>
                    </CardHeader>
                    <CardContent className="h-96 overflow-y-auto pr-2">
                        <div className="space-y-3">
                            {[
                                ...(sessionView === 'personal' ? [
                                    { client: 'John Smith', time: '2:00 PM Today', status: 'Confirmed' },
                                    { client: 'Emma Davis', time: '3:30 PM Today', status: 'Pending' },
                                    { client: 'Alex Johnson', time: '10:00 AM Tomorrow', status: 'Confirmed' },
                                    { client: 'Maria Garcia', time: '1:30 PM Tomorrow', status: 'Confirmed' },
                                    { client: 'Tom Wilson', time: '9:00 AM Friday', status: 'Confirmed' },
                                    { client: 'Lucy Chen', time: '11:30 AM Friday', status: 'Pending' }
                                ] : [
                                    { client: 'Sarah Wilson - Chris Parker', time: '2:00 PM Today', status: 'Confirmed' },
                                    { client: 'Michael Chen - Lisa Wong', time: '3:30 PM Today', status: 'Pending' },
                                    { client: 'Emily Rodriguez - David Kim', time: '10:00 AM Tomorrow', status: 'Confirmed' },
                                    { client: 'James Kim - Rachel Lee', time: '1:30 PM Tomorrow', status: 'Confirmed' },
                                    { client: 'Sarah Wilson - Mark Davis', time: '9:00 AM Friday', status: 'Confirmed' },
                                    { client: 'Michael Chen - Anna Wu', time: '11:30 AM Friday', status: 'Pending' }
                                ])
                            ].map((session, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-white border rounded-lg hover:bg-slate-50">
                                    <div>
                                        <h4 className="font-medium text-slate-800">{session.client}</h4>
                                        <p className="text-sm text-slate-600">{session.time}</p>
                                    </div>
                                    <span className={`text-sm px-2 py-1 rounded ${session.status === 'Confirmed'
                                        ? 'bg-green-50 text-green-700'
                                        : 'bg-amber-50 text-amber-700'
                                        }`}>
                                        {session.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Team Members List - 40% width */}
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Team Members</CardTitle>
                    </CardHeader>
                    <CardContent className="h-96 overflow-y-auto pr-2">
                        <div className="divide-y">
                            {[
                                { name: 'Dr. Sarah Wilson', sessions: { planned: 15, completed: 12 } },
                                { name: 'Dr. Michael Chen', sessions: { planned: 18, completed: 15 } },
                                { name: 'Dr. Emily Rodriguez', sessions: { planned: 12, completed: 10 } },
                                { name: 'Dr. James Kim', sessions: { planned: 16, completed: 13 } },
                                { name: 'Dr. Lisa Thompson', sessions: { planned: 14, completed: 11 } },
                                { name: 'Dr. Robert Martinez', sessions: { planned: 17, completed: 14 } }
                            ].map((member, index) => (
                                <div key={index} className="flex items-center justify-between py-4 first:pt-0 hover:bg-slate-50 px-2 rounded">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                            <UserCircle className="w-8 h-8 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-slate-800">{member.name}</h3>
                                            <p className="text-sm text-slate-600">
                                                {member.sessions.completed}/{member.sessions.planned} sessions this week
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-medium text-green-600">
                                            {Math.round((member.sessions.completed / member.sessions.planned) * 100)}%
                                        </div>
                                        <div className="text-xs text-slate-600">completion</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isDrawerCollapsed, setIsDrawerCollapsed] = useState(false);

    const mainTabs = [
        { id: 'dashboard', name: 'Dashboard', icon: Home },
        { id: 'clients', name: 'My Clients', icon: UserCircle },
        { id: 'team', name: 'Team', icon: Users },
        { id: 'analytics', name: 'Analytics', icon: BarChart },
        { id: 'clientDetails', name: 'Client Details', icon: Users },
    ];

    const settingsTabs = [
        { id: 'settings', name: 'Settings', icon: Settings },
        { id: 'help', name: 'Help & Support', icon: HelpCircle },
        { id: 'logout', name: 'Logout', icon: LogOut },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <DashboardContent />;
            case 'clients':
                return <MyClientsPage />;
            case 'team':
                return <TeamsTab />;
            case 'analytics':
                return <AnalyticsTab />;
            case 'settings':
                return <SettingsPage />
            case 'help':
                return <div className="p-6"><h2 className="text-2xl font-bold">Help & Support</h2></div>;
            case 'clientDetails':
                return <ClientDetailsPage />
            default:
                return <DashboardContent />;
        }
    };

    const handleLogout = () => {
        // Handle logout logic here
        console.log('Logging out...');
    };

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Left Sidebar */}
            <div className={`${isDrawerCollapsed ? 'w-25' : 'w-64'} bg-white border-r border-slate-200 flex flex-col relative transition-all duration-300`}>
                {/* Toggle Button */}
                <button
                    onClick={() => setIsDrawerCollapsed(!isDrawerCollapsed)}
                    className="absolute -right-3 top-20 bg-white border border-slate-200 rounded-full p-1 shadow-sm hover:bg-slate-50"
                >
                    {isDrawerCollapsed ?
                        <ChevronRight className="h-4 w-4 text-slate-600" /> :
                        <ChevronLeft className="h-4 w-4 text-slate-600" />
                    }
                </button>

                {/* Logo Area */}
                <div className="h-16 border-b border-slate-200 flex items-center px-6">
                    {isDrawerCollapsed ? (
                        <Brain className="h-8 w-8 text-blue-600" />
                    ) : (
                        <h1 className="text-xl font-bold text-blue-600">MentalHealth AI</h1>
                    )}
                </div>

                {/* Main Navigation */}
                <nav className="p-4 flex-grow">
                    {mainTabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-1 text-left
                    ${activeTab === tab.id
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                <Icon className="h-5 w-5 flex-shrink-0" />
                                {!isDrawerCollapsed && <span className="font-medium">{tab.name}</span>}
                            </button>
                        );
                    })}
                </nav>

                {/* Settings Navigation */}
                <div className="p-4 border-t border-slate-200">
                    {settingsTabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={tab.id === 'logout' ? handleLogout : () => setActiveTab(tab.id)}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-1 text-left
                    ${activeTab === tab.id
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                <Icon className="h-5 w-5 flex-shrink-0" />
                                {!isDrawerCollapsed && <span className="font-medium">{tab.name}</span>}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-auto">
                <div className="p-8">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-slate-800">
                            {[...mainTabs, ...settingsTabs].find(tab => tab.id === activeTab)?.name}
                        </h1>
                        <p className="text-slate-600">Welcome back, Dr. Smith</p>
                    </div>

                    {/* Dynamic Content */}
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;