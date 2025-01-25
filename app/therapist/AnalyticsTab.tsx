import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  Brain, 
  LineChart as LineChartIcon, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  MessageCircle,
  Heart
} from 'lucide-react';

const ClientView = () => {
  const [dateRange, setDateRange] = useState('1M'); // 1W, 1M, 3M, 6M, 1Y

  // Sample data based on manah.json
  const emotionalProgressData = [
    { session: 'Session 1', start: 46, end: 70 },
    { session: 'Session 2', start: 70, end: 85 },
    { session: 'Session 3', start: 65, end: 78 }
  ];

  const sessionQualityData = [
    { 
      session: 'Session 1',
      openQuestions: 9,
      closedQuestions: 7,
      empathyScore: 87,
      engagementScore: 75,
      interventionScore: 65
    },
    // Add more sessions...
  ];

  const topicsData = [
    { name: 'Anxiety', sessions: 5, color: '#60A5FA' },
    { name: 'Work Stress', sessions: 3, color: '#93C5FD' },
    { name: 'Family', sessions: 4, color: '#BFDBFE' }
  ];

  return (
    <div className="p-6 bg-white">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Client Progress Dashboard</h1>
        <p className="text-gray-600">Sarah Johnson - Session History and Progress</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Emotional Progress</p>
                <h3 className="text-2xl font-bold text-blue-600">+24%</h3>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sessions Completed</p>
                <h3 className="text-2xl font-bold text-blue-600">12</h3>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Empathy Score</p>
                <h3 className="text-2xl font-bold text-blue-600">87%</h3>
              </div>
              <Heart className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Topics Covered</p>
                <h3 className="text-2xl font-bold text-blue-600">8</h3>
              </div>
              <Brain className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="progress" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="progress">Emotional Progress</TabsTrigger>
          <TabsTrigger value="quality">Session Quality</TabsTrigger>
          <TabsTrigger value="topics">Topics & Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="progress">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Emotional Progress Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={emotionalProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="session" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="start" 
                        stroke="#93C5FD" 
                        name="Session Start"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="end" 
                        stroke="#3B82F6" 
                        name="Session End"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session Quality Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sessionQualityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="session" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="empathyScore" fill="#3B82F6" name="Empathy" />
                      <Bar dataKey="engagementScore" fill="#93C5FD" name="Engagement" />
                      <Bar dataKey="interventionScore" fill="#BFDBFE" name="Intervention" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quality">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Question Type Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Open Questions', value: 65, color: '#3B82F6' },
                          { name: 'Closed Questions', value: 35, color: '#93C5FD' }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {topicsData.map((entry, index) => (
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

            <Card>
              <CardHeader>
                <CardTitle>Areas of Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-blue-700">Active Listening</span>
                      <span className="text-sm text-blue-600">75%</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-600 rounded-full h-2" style={{ width: '75%' }}></div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-blue-700">Empathy</span>
                      <span className="text-sm text-blue-600">87%</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-600 rounded-full h-2" style={{ width: '87%' }}></div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-blue-700">Intervention</span>
                      <span className="text-sm text-blue-600">65%</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-600 rounded-full h-2" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="topics">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Topics Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={topicsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="sessions"
                      >
                        {topicsData.map((entry, index) => (
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

            <Card>
              <CardHeader>
                <CardTitle>Action Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-700 mb-2">Follow-up Questions</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <MessageCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                        <span className="text-gray-700">Explore coping mechanisms for work-related stress</span>
                      </li>
                      <li className="flex items-start">
                        <MessageCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                        <span className="text-gray-700">Discuss progress on mindfulness exercises</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-700 mb-2">Next Steps</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                        <span className="text-gray-700">Practice daily relaxation techniques</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                        <span className="text-gray-700">Keep anxiety journal for next session</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientView;