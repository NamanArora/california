import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { X, Brain, Heart, MessageCircle, Zap } from 'lucide-react';
import ClientView from './MiddleView';
import SessionView from './LowView';

interface InterventionData {
    session: number;
    score: number;
}

interface Scores {
    engagement: number;
    empathy: number;
    communication: number;
    intervention: number;
}

interface ClientCardProps {
    name: string;
}

interface PatientMap {
    [key: string]: string[];
}

const TherapistDashboard: React.FC = () => {
    // State for dropdown selections
    const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null);
    const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
    const [selectedSession, setSelectedSession] = useState<string | null>(null);

    const handleSessionSelect = (sessionDate: string): void => {
        setSelectedSession(sessionDate);
    };

    // Sample data - in real app, this would come from your backend
    const therapists: string[] = ['Dr. Sarah Wilson', 'Dr. Michael Chen'];
    const patients: PatientMap = {
        'Dr. Sarah Wilson': ['John Smith', 'Emma Davis'],
        'Dr. Michael Chen': ['Alex Johnson', 'Maria Garcia']
    };

    const interventionData: InterventionData[] = [
        { session: 1, score: 65 },
        { session: 2, score: 72 },
        { session: 3, score: 68 },
        { session: 4, score: 75 }
    ];

    // Clear handler for dropdowns
    const handleClearTherapist = () => {
        setSelectedTherapist(null);
        setSelectedPatient(null);
        setSelectedSession(null);
    };

    const handleClearPatient = () => {
        setSelectedPatient(null);
        setSelectedSession(null);
    };

    const handleClearSession = () => {
        setSelectedSession(null);
    };

    // Client card component
    const ClientCard: React.FC<ClientCardProps> = ({ name }) => {
        const scores: Scores = {
            engagement: 78,
            empathy: 85,
            communication: 82,
            intervention: 75
        };

        return (
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                    <div className="flex justify-between">
                        <div className="space-y-4 flex-1">
                            <h3 className="font-semibold text-lg text-gray-900">{name}</h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                    <Heart className="h-4 w-4 text-blue-500" />
                                    <div>
                                        <p className="text-sm text-gray-600">Empathy</p>
                                        <p className="font-medium text-gray-900">{scores.empathy}%</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <MessageCircle className="h-4 w-4 text-blue-500" />
                                    <div>
                                        <p className="text-sm text-gray-600">Engagement</p>
                                        <p className="font-medium text-gray-900">{scores.engagement}%</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Brain className="h-4 w-4 text-blue-500" />
                                    <div>
                                        <p className="text-sm text-gray-600">Communication</p>
                                        <p className="font-medium text-gray-900">{scores.communication}%</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Zap className="h-4 w-4 text-blue-500" />
                                    <div>
                                        <p className="text-sm text-gray-600">Intervention</p>
                                        <p className="font-medium text-gray-900">{scores.intervention}%</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-48 h-32">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={interventionData}>
                                    <XAxis dataKey="session" />
                                    <YAxis domain={[0, 100]} hide />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="score"
                                        stroke="#3B82F6"
                                        strokeWidth={2}
                                        dot={{ r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Therapy Session Analysis</h1>
                <p className="text-gray-600">Select a therapist to view their clients</p>
            </div>

            {/* Dropdowns */}
            <div className="flex gap-4">
                <div className="w-64 flex gap-2">
                    <Select
                        value={selectedTherapist || undefined}
                        onValueChange={setSelectedTherapist}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Therapist" />
                        </SelectTrigger>
                        <SelectContent>
                            {therapists.map(therapist => (
                                <SelectItem key={therapist} value={therapist}>
                                    {therapist}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {selectedTherapist && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleClearTherapist}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>

                <div className="w-64 flex gap-2">
                    <Select
                        value={selectedPatient || undefined}
                        onValueChange={setSelectedPatient}
                        disabled={!selectedTherapist}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Patient" />
                        </SelectTrigger>
                        <SelectContent>
                            {selectedTherapist && patients[selectedTherapist].map(patient => (
                                <SelectItem key={patient} value={patient}>
                                    {patient}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {selectedPatient && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleClearPatient}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>

                <div className="w-64 flex gap-2">
                    <Select
                        value={selectedSession || undefined}
                        onValueChange={setSelectedSession}
                        disabled={!selectedPatient}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Session" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2024-01-20">Jan 20, 2024</SelectItem>
                            <SelectItem value="2024-01-27">Jan 27, 2024</SelectItem>
                        </SelectContent>
                    </Select>
                    {selectedSession && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleClearSession}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>

            {/* Therapist View - Client Overview */}
            {selectedTherapist && !selectedPatient && (
                <div className="grid grid-cols-2 gap-6">
                    {patients[selectedTherapist].map((patient) => (
                        <div key={patient} onClick={() => setSelectedPatient(patient)}>
                            <ClientCard name={patient} />
                        </div>
                    ))}
                </div>
            )}

            {/* Therapist View - Client Overview */}
            {selectedTherapist && selectedPatient && !selectedSession && (
                <div className="grid grid-cols-1 gap-6">
                    <ClientView clientName={selectedPatient} onSessionSelect={handleSessionSelect} />
                </div>
            )}

            {selectedTherapist && selectedPatient && selectedSession && (
                <div className="grid grid-cols-1 gap-6">
                    <SessionView sessionData={selectedPatient} />
                </div>
            )}
        </div>
    );
};

export default TherapistDashboard;