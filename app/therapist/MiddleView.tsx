import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import {
  Brain, Heart, MessageCircle, Zap, TrendingUp,
  Calendar, Clock, AlertCircle
} from 'lucide-react';

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

  const handleSessionClick = (session: SessionData) => {
    if (onSessionSelect) {
      onSessionSelect(session.date);
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

      {/* Progress Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Progress Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="session" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="empathy"
                  stroke="#3B82F6"
                  name="Empathy"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="engagement"
                  stroke="#60A5FA"
                  name="Engagement"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="communication"
                  stroke="#93C5FD"
                  name="Communication"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="intervention"
                  stroke="#BFDBFE"
                  name="Intervention"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

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