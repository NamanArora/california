import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, BarChart, Bar,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  RadarChart,
  Radar
} from 'recharts';
import {
  Brain, Heart, MessageCircle, Zap, TrendingUp,
  Calendar, Clock, AlertCircle,
  Shield,
  Star,
  Search
} from 'lucide-react';

import { Button } from "@/components/ui/button";


interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  onInvestigate?: (session: number) => void;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, onInvestigate }) => {
  if (active && payload && payload.length) {
    const handleClick = (e: React.MouseEvent) => {
      console.log("click detected");
      if (onInvestigate) {
        onInvestigate(Number(label));
      }
    };

    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <div className="mb-3">
          <p className="font-medium text-gray-900">Session {label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm text-gray-600">
              {entry.name}: {entry.value}%
            </p>
          ))}
        </div>
        <button
          className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center justify-center gap-2 transition-colors"
          onClick={handleClick}
        >
          <Search className="h-4 w-4" />
          Investigate Session
        </button>
      </div>
    );
  }
  return null;
};

const ProgressChart: React.FC<{ data: any[]; onInvestigate: (session: number) => void }> = ({ data, onInvestigate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="session" />
              <YAxis domain={[0, 100]} />
              <Tooltip content={<CustomTooltip onInvestigate={onInvestigate} />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="empathy"
                stroke="#3B82F6"
                name="Empathy"
                strokeWidth={2}
                dot={{ r: 6, strokeWidth: 2, fill: "white" }}
                activeDot={{ r: 8, strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="engagement"
                stroke="#60A5FA"
                name="Engagement"
                strokeWidth={2}
                dot={{ r: 6, strokeWidth: 2, fill: "white" }}
                activeDot={{ r: 8, strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="communication"
                stroke="#93C5FD"
                name="Communication"
                strokeWidth={2}
                dot={{ r: 6, strokeWidth: 2, fill: "white" }}
                activeDot={{ r: 8, strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="intervention"
                stroke="#BFDBFE"
                name="Intervention"
                strokeWidth={2}
                dot={{ r: 6, strokeWidth: 2, fill: "white" }}
                activeDot={{ r: 8, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

interface SessionData {
  date: string;
  duration: string;
  empathy: number;
  engagement: number;
  communication: number;
  intervention: number;
  topics: string[];
  status: string;
}

interface ClientViewProps {
  clientName: string;
  onSessionSelect?: (sessionDate: string) => void;
}

const ClientView: React.FC<ClientViewProps> = ({ clientName, onSessionSelect }) => {
  // Sample trend data for the summary charts
  const trendData = [
    { session: 1, empathy: 82, engagement: 75, communication: 70, intervention: 65 },
    { session: 2, empathy: 85, engagement: 78, communication: 73, intervention: 68 },
    { session: 3, empathy: 87, engagement: 80, communication: 75, intervention: 72 },
    { session: 4, empathy: 89, engagement: 83, communication: 78, intervention: 75 }
  ];

  const compatibilitySubScores = [
    { name: 'Qualifications', score: 8 },
    { name: 'Client Well-being', score: 9 },
    { name: 'Goals Exploration', score: 7 },
    { name: 'Active Listening', score: 9 },
    { name: 'Strategy Suggestions', score: 6 },
    { name: 'Validation', score: 9 },
    { name: 'Collaboration', score: 8 },
    { name: 'Past Experience', score: 7 },
    { name: 'Daily Routine', score: 6 },
    { name: 'Psychoeducation', score: 7 }
  ];

  const areasOfImprovement = [
    {
      suggestion: "Involve client more in defining specific goals for therapy",
      excerpt: "Therapist: 'What would you like to focus on today?' Client: 'I'm not sure yet.'"
    },
    {
      suggestion: "Provide clearer strategies to address challenges",
      excerpt: "Therapist: 'You might find journaling helpful.' Client: 'I've tried it before, but it didn't work for me.'"
    },
    {
      suggestion: "Explore daily routine in greater detail",
      excerpt: "Therapist: 'Can you tell me about your typical day?' Client: 'It's just work and home stuff.'"
    }
  ];

  const handleSessionClick = (session: SessionData) => {
    if (onSessionSelect) {
      onSessionSelect(session.date);
    }
  };

  const handleInvestigate = (session: number) => {
    console.log("Investigating session:", session);
    // Find the session data that corresponds to this session number
    const sessionDate = sessionData[session - 1]?.date;
    console.log("Found session date:", sessionDate);
    if (sessionDate && onSessionSelect) {
      onSessionSelect(sessionDate);
    }
  };
  // Sample session data
  const sessionData = [
    {
      date: '2024-01-20',
      duration: '50 mins',
      empathy: 85,
      engagement: 78,
      communication: 73,
      intervention: 68,
      topics: ['Anxiety', 'Work Stress', 'Family'],
      status: 'Completed'
    },
    {
      date: '2024-01-27',
      duration: '55 mins',
      empathy: 87,
      engagement: 80,
      communication: 75,
      intervention: 72,
      topics: ['Anxiety', 'Relationships'],
      status: 'Completed'
    },
    {
      date: '2024-02-03',
      duration: '45 mins',
      empathy: 89,
      engagement: 83,
      communication: 78,
      intervention: 75,
      topics: ['Work Stress', 'Self-care'],
      status: 'Completed'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Client Summary Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{clientName}</h2>
          <p className="text-gray-600">Session History and Progress</p>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-500" />
          <span className="text-gray-600">Last Session: {sessionData[0].date}</span>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Empathy</p>
                <h3 className="text-2xl font-bold text-blue-600">87%</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Engagement</p>
                <h3 className="text-2xl font-bold text-blue-600">80%</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Communication</p>
                <h3 className="text-2xl font-bold text-blue-600">75%</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Intervention</p>
                <h3 className="text-2xl font-bold text-blue-600">72%</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <ProgressChart data={trendData} onInvestigate={handleInvestigate} />


      <div className="grid grid-cols-2 gap-6">
        {/* Overall Compatibility */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" />
              Average Compatibility Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">85%</div>
                <p className="text-sm text-gray-600 mt-1">Therapeutic Alignment</p>
              </div>
              <div className="text-sm text-gray-600 max-w-xs">
                Strong skills in active listening, validation, and exploration of client's feelings and experiences. Some areas for improvement in goal-setting and strategy provision.
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={compatibilitySubScores}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis domain={[0, 10]} />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Areas of Improvement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-blue-500" />
              Areas of Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {areasOfImprovement.map((area, index) => (
                <div key={index} className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">{area.suggestion}</h4>
                  <p className="text-sm text-gray-600 italic">"{area.excerpt}"</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Session History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Session History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Duration</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Empathy</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Engagement</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Communication</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Intervention</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Topics</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {sessionData.map((session, index) => (
                  <tr
                    key={session.date}
                    className="border-b hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleSessionClick(session)}
                  >
                    <td className="py-3 px-4">{session.date}</td>
                    <td className="py-3 px-4">{session.duration}</td>
                    <td className="py-3 px-4">{session.empathy}%</td>
                    <td className="py-3 px-4">{session.engagement}%</td>
                    <td className="py-3 px-4">{session.communication}%</td>
                    <td className="py-3 px-4">{session.intervention}%</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2 flex-wrap">
                        {session.topics.map(topic => (
                          <span
                            key={topic}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        {session.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientView;