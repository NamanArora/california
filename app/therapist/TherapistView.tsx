import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';
import { 
  Users, 
  TrendingUp, 
  Heart,
  Brain,
  AlertCircle,
  Clock
} from 'lucide-react';

const TherapistView = () => {
  // Sample data based on manah.json
  const perfData = [
    { month: 'Jan', empathy: 87, engage: 75, interv: 65 },
    { month: 'Feb', empathy: 89, engage: 78, interv: 68 },
    { month: 'Mar', empathy: 85, engage: 80, interv: 70 }
  ];

  const clientData = [
    { name: 'Active', value: 12, color: '#3B82F6' },
    { name: 'Completed', value: 8, color: '#60A5FA' },
    { name: 'On Hold', value: 3, color: '#93C5FD' }
  ];

  const topicDist = [
    { topic: 'Anxiety', count: 8, color: '#3B82F6' },
    { topic: 'Depression', count: 6, color: '#60A5FA' },
    { topic: 'Work Stress', count: 5, color: '#93C5FD' }
  ];

  return (
    <div className="p-6 bg-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Practice Dashboard</h1>
        <p className="text-gray-600">Performance Overview and Client Analytics</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clients</p>
                <h3 className="text-2xl font-bold text-blue-600">23</h3>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-sm text-green-600 mt-2">↑ 12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Empathy</p>
                <h3 className="text-2xl font-bold text-blue-600">87%</h3>
              </div>
              <Heart className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-sm text-green-600 mt-2">↑ 5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <h3 className="text-2xl font-bold text-blue-600">85%</h3>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-sm text-green-600 mt-2">↑ 3% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Topics</p>
                <h3 className="text-2xl font-bold text-blue-600">14</h3>
              </div>
              <Brain className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-sm text-blue-600 mt-2">Across all clients</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="perf" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="perf">Performance</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="topics">Topics</TabsTrigger>
        </TabsList>

        <TabsContent value="perf">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={perfData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="empathy" 
                        stroke="#3B82F6" 
                        name="Empathy"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="engage" 
                        stroke="#60A5FA" 
                        name="Engagement"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="interv" 
                        stroke="#93C5FD" 
                        name="Intervention"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Areas for Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-blue-700">Question Balance</span>
                      <span className="text-sm text-blue-600">72%</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-600 rounded-full h-2" style={{ width: '72%' }}></div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-blue-700">Active Listening</span>
                      <span className="text-sm text-blue-600">85%</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-600 rounded-full h-2" style={{ width: '85%' }}></div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-blue-700">Client Engagement</span>
                      <span className="text-sm text-blue-600">78%</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-600 rounded-full h-2" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="clients">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Client Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={clientData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {clientData.map((entry, idx) => (
                          <Cell key={`cell-${idx}`} fill={entry.color} />
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
                <CardTitle>Recent Client Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Sarah J.', status: 'Progress Review', time: '2 days ago' },
                    { name: 'Mike R.', status: 'New Goals Set', time: '3 days ago' },
                    { name: 'Emma L.', status: 'Treatment Complete', time: '1 week ago' }
                  ].map((client, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-blue-500 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">{client.name}</p>
                          <p className="text-sm text-gray-600">{client.status}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{client.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="topics">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Topic Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topicDist}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="topic" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Topic Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-blue-500 mt-1 mr-3" />
                      <div>
                        <h4 className="font-medium text-gray-900">Most Discussed</h4>
                        <p className="text-sm text-gray-600">Anxiety (8 clients)</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start">
                      <TrendingUp className="h-5 w-5 text-blue-500 mt-1 mr-3" />
                      <div>
                        <h4 className="font-medium text-gray-900">Growing Topic</h4>
                        <p className="text-sm text-gray-600">Work Stress (+30%)</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start">
                      <Brain className="h-5 w-5 text-blue-500 mt-1 mr-3" />
                      <div>
                        <h4 className="font-medium text-gray-900">Success Rate</h4>
                        <p className="text-sm text-gray-600">85% positive outcomes</p>
                      </div>
                    </div>
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

export default TherapistView;