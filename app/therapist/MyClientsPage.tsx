import React from 'react';
import { Search, Filter, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    Legend
} from 'recharts';

const MetricsDashboard = () => {
    // Risk Distribution Data
    const riskData = [
        { name: 'High Risk', value: 4, color: '#EF4444' },
        { name: 'Medium Risk', value: 8, color: '#F59E0B' },
        { name: 'Low Risk', value: 12, color: '#10B981' }
    ];

    // Session Completion Data
    const sessionData = [
        { week: 'Week 1', completed: 25, scheduled: 28 },
        { week: 'Week 2', completed: 22, scheduled: 25 },
        { week: 'Week 3', completed: 28, scheduled: 30 },
        { week: 'Week 4', completed: 24, scheduled: 26 }
    ];

    // Client Status Data
    const statusData = [
        { status: 'Active', count: 18 },
        { status: 'On Hold', count: 3 },
        { status: 'Completed', count: 4 },
        { status: 'New', count: 5 }
    ];

    // Weekly Trends Data
    const trendsData = [
        { day: 'Mon', sessions: 8 },
        { day: 'Tue', sessions: 12 },
        { day: 'Wed', sessions: 10 },
        { day: 'Thu', sessions: 15 },
        { day: 'Fri', sessions: 9 }
    ];

    return (
        <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Risk Distribution Chart */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Client Risk Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={riskData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {riskData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Session Completion Rate */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Session Completion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={sessionData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="week" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="completed" fill="#3B82F6" name="Completed" />
                                <Bar dataKey="scheduled" fill="#93C5FD" name="Scheduled" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Client Status Overview */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Client Status Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={statusData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="status" type="category" />
                                <Tooltip />
                                <Bar dataKey="count" fill="#60A5FA" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Weekly Session Trends */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Weekly Session Trends</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trendsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="sessions"
                                    stroke="#3B82F6"
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// Client Card Component
const ClientCard = ({ client }: { client: Client }) => (
    <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-semibold">
                    {client.name}
                </CardTitle>
                <span className={`px-3 py-1 rounded-full text-sm ${client.riskLevel === 'High'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-green-100 text-green-700'
                    }`}>
                    {client.riskLevel} Risk
                </span>
            </div>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Status</span>
                    <span className="font-medium">{client.status}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Last Session</span>
                    <span className="font-medium">{client.lastSession}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Next Session</span>
                    <span className="font-medium">{client.nextSession}</span>
                </div>
                <div className="pt-4">
                    <button className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                        View Details
                    </button>
                </div>
            </div>
        </CardContent>
    </Card>
);

// Search and Filter Component
const SearchFilter = () => (
    <div className="flex space-x-4">
        <div className="relative">
            <input
                type="text"
                placeholder="Search clients..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
            <Filter className="h-5 w-5 mr-2" />
            Filter
        </button>
    </div>
);

// Section Header Component
const SectionHeader = ({ title, showSearch }: { title: string, showSearch?: boolean }) => (
    <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {showSearch && <SearchFilter />}
    </div>
);

export type ClientStatus = 'Active' | 'On Hold' | 'New' | 'Completed';
export type RiskLevel = 'High' | 'Medium' | 'Low';

export interface Client {
    id: number;
    name: string;
    status: ClientStatus;
    riskLevel: RiskLevel;
    lastSession: string;  // ISO date string
    nextSession: string;  // ISO date string
    primaryConcern: string;
    therapistNotes: string;
    appointmentTime: string;  // Time string in HH:MM AM/PM format
}

// Utility type for creating new clients (without id)
export type NewClient = Omit<Client, 'id'>;

// Utility type for updating existing clients (all fields optional)
export type ClientUpdate = Partial<Client>;

// Main Page Component
const MyClientsPage = () => {
    // Dummy data for demonstration
    const personalClients: Client[] = [
        {
            id: 1,
            name: "Sarah Johnson",
            status: "Active",
            riskLevel: "High",
            lastSession: "2024-01-20",
            nextSession: "2024-01-27",
            primaryConcern: "Depression",
            therapistNotes: "Recently reported increased symptoms",
            appointmentTime: "10:00 AM"
        },
        {
            id: 2,
            name: "Michael Chen",
            status: "Active",
            riskLevel: "Low",
            lastSession: "2024-01-22",
            nextSession: "2024-01-29",
            primaryConcern: "Anxiety",
            therapistNotes: "Showing consistent progress",
            appointmentTime: "2:30 PM"
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            status: "On Hold",
            riskLevel: "Medium",
            lastSession: "2024-01-15",
            nextSession: "2024-02-01",
            primaryConcern: "PTSD",
            therapistNotes: "Returning after brief pause",
            appointmentTime: "11:15 AM"
        },
        {
            id: 4,
            name: "James Wilson",
            status: "Active",
            riskLevel: "High",
            lastSession: "2024-01-23",
            nextSession: "2024-01-26",
            primaryConcern: "Substance Use",
            therapistNotes: "Requires weekly monitoring",
            appointmentTime: "3:45 PM"
        },
        {
            id: 5,
            name: "Aisha Patel",
            status: "Active",
            riskLevel: "Low",
            lastSession: "2024-01-21",
            nextSession: "2024-02-04",
            primaryConcern: "Work Stress",
            therapistNotes: "Biweekly sessions sufficient",
            appointmentTime: "1:00 PM"
        },
        {
            id: 6,
            name: "Robert Kim",
            status: "New",
            riskLevel: "Medium",
            lastSession: "2024-01-24",
            nextSession: "2024-01-31",
            primaryConcern: "Relationship Issues",
            therapistNotes: "Initial assessment completed",
            appointmentTime: "9:30 AM"
        }
    ] as const;

    const teamClients = [
        {
            id: 3,
            name: "Emma Wilson",
            status: "Active",
            riskLevel: "Medium",
            lastSession: "2024-01-21",
            nextSession: "2024-01-28"
        },
        {
            id: 4,
            name: "David Kim",
            status: "Active",
            riskLevel: "Low",
            lastSession: "2024-01-23",
            nextSession: "2024-01-30"
        }
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">

            {/* Metrics Dashboard */}
            <MetricsDashboard />
            {/* Personal Clients Section */}
            <div className="space-y-6">
                <SectionHeader title="My Personal Clients" />
                <div className="grid grid-cols-2 gap-6">
                    {personalClients.map((client) => (
                        <ClientCard key={client.id} client={client} />
                    ))}
                </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-200" />

            {/* Team Clients Section */}
            {/* <div className="space-y-6">
        <SectionHeader title="Team Clients" />
        <div className="grid grid-cols-2 gap-6">
          {teamClients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      </div> */}
        </div>
    );
};

export default MyClientsPage;