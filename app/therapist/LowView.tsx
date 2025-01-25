import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Brain, Heart, MessageCircle, Zap, ArrowRight } from 'lucide-react';

interface ScoreData {
    time: string;
    score: number;
    sentence: string;
    areas: string;
}

interface SampleScores {
    engagement: ScoreData[];
    empathy: ScoreData[];
    communication: ScoreData[];
    intervention: ScoreData[];
}

interface SessionData {
    id?: string;
    date?: string;
    duration?: string;
    // ... other fields you might need
}

interface SessionViewProps {
    sessionData: string;
}

const SessionView: React.FC<SessionViewProps> = ({ sessionData }) => {
    // Sample data for the score charts
    const sampleScores = {
        engagement: [
            { time: '0:00', score: 75, sentence: "How are you doing today?", areas: "Could use more open-ended questions" },
            { time: '0:30', score: 82, sentence: "Tell me more about that.", areas: "Good use of active listening" },
            { time: '1:00', score: 78, sentence: "I understand that must be difficult.", areas: "Consider deeper exploration" },
            { time: '1:30', score: 85, sentence: "What strategies have you tried?", areas: "Excellent probing question" },
            { time: '2:00', score: 80, sentence: "It sounds like this has been overwhelming.", areas: "Good validation" }
        ],
        empathy: [
            { time: '0:00', score: 85, sentence: "How are you doing today?", areas: "Good initial rapport" },
            { time: '0:30', score: 88, sentence: "Tell me more about that.", areas: "Strong emotional attunement" },
            { time: '1:00', score: 90, sentence: "I understand that must be difficult.", areas: "Excellent validation" },
            { time: '1:30', score: 92, sentence: "What strategies have you tried?", areas: "Shows genuine concern" },
            { time: '2:00', score: 87, sentence: "It sounds like this has been overwhelming.", areas: "Good emotional reflection" }
        ],
        communication: [
            { time: '0:00', score: 70, sentence: "How are you doing today?", areas: "Could be more specific" },
            { time: '0:30', score: 75, sentence: "Tell me more about that.", areas: "Clear and inviting" },
            { time: '1:00', score: 80, sentence: "I understand that must be difficult.", areas: "Well-structured response" },
            { time: '1:30', score: 82, sentence: "What strategies have you tried?", areas: "Good clarity" },
            { time: '2:00', score: 78, sentence: "It sounds like this has been overwhelming.", areas: "Clear reflection" }
        ],
        intervention: [
            { time: '0:00', score: 65, sentence: "How are you doing today?", areas: "Could be more targeted" },
            { time: '0:30', score: 70, sentence: "Tell me more about that.", areas: "Good follow-up" },
            { time: '1:00', score: 75, sentence: "I understand that must be difficult.", areas: "Effective intervention" },
            { time: '1:30', score: 78, sentence: "What strategies have you tried?", areas: "Strong therapeutic direction" },
            { time: '2:00', score: 72, sentence: "It sounds like this has been overwhelming.", areas: "Good support" }
        ]
    };
    interface CustomTooltipProps {
        active?: boolean;
        payload?: any[];
        label?: string;
    }


    // Custom tooltip component
    const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                    <p className="font-medium text-gray-900">Time: {data.time}</p>
                    <p className="text-gray-600 mt-1">Score: {data.score}</p>
                    <p className="text-gray-600 mt-2 italic">"{data.sentence}"</p>
                    <p className="text-gray-600 mt-1">Areas: {data.areas}</p>
                </div>
            );
        }
        return null;
    };

    // Function to render score charts
    const renderScoreChart = (data: ScoreData[], title: string, color = "#3B82F6") => (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">{title} Score Over Time</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                type="monotone"
                                dataKey="score"
                                stroke={color}
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="space-y-6">
            {/* Session Info Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Session Analysis</h2>
                    <p className="text-gray-600">January 20, 2024 - 2:00 PM</p>
                </div>
                <div className="flex gap-4">
                    <div className="text-right">
                        <p className="text-sm font-medium text-gray-600">Duration</p>
                        <p className="text-lg font-semibold text-gray-900">50 minutes</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-medium text-gray-600">Topics</p>
                        <div className="flex gap-2 mt-1">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                Anxiety
                            </span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                Work Stress
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Score Charts */}
            <div className="grid grid-cols-2 gap-6">
                {renderScoreChart(sampleScores.empathy, "Empathy", "#3B82F6")}
                {renderScoreChart(sampleScores.engagement, "Engagement", "#60A5FA")}
                {renderScoreChart(sampleScores.communication, "Communication", "#93C5FD")}
                {renderScoreChart(sampleScores.intervention, "Intervention", "#BFDBFE")}
            </div>

            {/* Analysis Boxes */}
            <div className="grid grid-cols-2 gap-6">
                {/* Follow-up Questions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Follow-up Questions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[
                                "How have the anxiety symptoms affected your work performance?",
                                "What coping strategies have you found most helpful?",
                                "How has your sleep pattern been this week?"
                            ].map((question, index) => (
                                <div key={index} className="flex items-start gap-2">
                                    <ArrowRight className="h-5 w-5 text-blue-500 mt-0.5" />
                                    <p className="text-gray-700">{question}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Topic Suggestions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Topic Suggestions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[
                                "Work-life balance strategies",
                                "Stress management techniques",
                                "Building support systems"
                            ].map((topic, index) => (
                                <div key={index} className="flex items-start gap-2">
                                    <ArrowRight className="h-5 w-5 text-blue-500 mt-0.5" />
                                    <p className="text-gray-700">{topic}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Questions Analysis */}
                <Card>
                    <CardHeader>
                        <CardTitle>Questions Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <h4 className="font-medium text-gray-700">Open-ended Questions</h4>
                                    <span className="text-blue-600">7 questions</span>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">
                                        "What strategies have you tried so far?"
                                        "How does this affect your daily routine?"
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <h4 className="font-medium text-gray-700">Closed-ended Questions</h4>
                                    <span className="text-blue-600">4 questions</span>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">
                                        "Did you try the breathing exercise?"
                                        "Have you spoken to your manager?"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Topics Covered */}
                <Card>
                    <CardHeader>
                        <CardTitle>Topics Covered</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div>
                                <h4 className="font-medium text-gray-700 mb-2">Primary Topics</h4>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                        Work Stress
                                    </span>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                        Anxiety
                                    </span>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                        Time Management
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-700 mb-2">Related Topics</h4>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                                        Sleep
                                    </span>
                                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                                        Self-care
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Session Summary */}
            <Card>
                <CardHeader>
                    <CardTitle>Session Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium text-gray-700 mb-2">Emotional Context</h4>
                            <p className="text-gray-600">
                                Client expressed significant anxiety regarding work-life balance and career pressures.
                                Notable emotional fluctuations when discussing workplace challenges.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-700 mb-2">Key Insights</h4>
                            <p className="text-gray-600">
                                Strong self-awareness but struggling with practical coping mechanisms.
                                Shows readiness to implement stress management strategies.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-700 mb-2">Progress Notes</h4>
                            <p className="text-gray-600">
                                Improvement in recognizing anxiety triggers. Successfully implemented
                                breathing exercises from previous session.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SessionView;