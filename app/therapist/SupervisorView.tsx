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
  AlertTriangle,
  Brain,
  UserCheck,
  Star,
  AlertCircle
} from 'lucide-react';

const SupervisorView = () => {
  // Sample data with short variable names
  const teamPerf = [
    { month: 'Jan', emp: 87, eng: 75, int: 65 },
    { month: 'Feb', emp: 89, eng: 78, int: 68 },
    { month: 'Mar', emp: 85, eng: 80, int: 70 }
  ];

  const stats = [
    { name: 'Active', val: 15, color: '#3B82F6' },
    { name: 'At Risk', val: 3, color: '#EF4444' },
    { name: 'High Perf', val: 7, color: '#10B981' }
  ];

  const risks = [
    { type: 'High', count: 3, color: '#EF4444' },
    { type: 'Medium', count: 5, color: '#F59E0B' },
    { type: 'Low', count: 12, color: '#10B981' }
  ];

  return (
    <div className="p-6 bg-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Team Supervision Dashboard</h1>
        <p className="text-gray-600">Team Performance and Risk Management</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Team Size</p>
                <h3 className="text-2xl font-bold text-blue-600">25</h3>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-sm text-green-600 mt-2">↑ 2 new members</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <h3 className="text-2xl font-bold text-blue-600">4.8</h3>
              </div>
              <Star className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-sm text-green-600 mt-2">↑ 0.2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">At Risk</p>
                <h3 className="text-2xl font-bold text-red-600">3</h3>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            <p className="text-sm text-red-600 mt-2">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <h3 className="text-2xl font-bold text-blue-600">92%</h3>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-sm text-green-600 mt-2">↑ 5% improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="team" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="team">Team Performance</TabsTrigger>
          <TabsTrigger value="risk">Risk Management</TabsTrigger>
          <TabsTrigger value="quality">Quality Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="team">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={teamPerf}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="emp" 
                        stroke="#3B82F6" 
                        name="Empathy"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="eng" 
                        stroke="#60A5FA" 
                        name="Engagement"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="int" 
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
                <CardTitle>Team Member Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="val"
                      >
                        {stats.map((entry, idx) => (
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
          </div>
        </TabsContent>

        <TabsContent value="risk">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={risks}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="type" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count">
                        {risks.map((entry, idx) => (
                          <Cell key={`cell-${idx}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>High Risk Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { therap: 'Dr. Sarah M.', clients: 2, issue: 'Client Progress' },
                    { therap: 'Dr. James R.', clients: 1, issue: 'Session Quality' }
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 bg-red-50 rounded-lg">
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-red-500 mt-1 mr-3" />
                        <div>
                          <h4 className="font-medium text-gray-900">{item.therap}</h4>
                          <p className="text-sm text-gray-600">
                            {item.clients} clients at risk - {item.issue}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quality">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quality Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { metric: 'Client Satisfaction', score: 92 },
                    { metric: 'Session Effectiveness', score: 88 },
                    { metric: 'Treatment Progress', score: 85 }
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-blue-700">{item.metric}</span>
                        <span className="text-sm text-blue-600">{item.score}%</span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 rounded-full h-2" 
                          style={{ width: `${item.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Dr. Emma L.', rating: 4.9, clients: 15 },
                    { name: 'Dr. Michael K.', rating: 4.8, clients: 12 },
                    { name: 'Dr. Anna P.', rating: 4.7, clients: 14 }
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <UserCheck className="h-5 w-5 text-blue-500 mr-3" />
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              {item.clients} active clients
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="font-medium text-gray-900">
                            {item.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupervisorView;