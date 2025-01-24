import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, TrendingUp, Users, DollarSign } from 'lucide-react';

const AnalyticsTab = () => {
  // Sample data - in real app this would come from API
  const clinicalData = [
    { month: 'Jan', effectiveness: 85, interventions: 120, recovery: 75 },
    { month: 'Feb', effectiveness: 88, interventions: 135, recovery: 78 },
    { month: 'Mar', effectiveness: 92, interventions: 142, recovery: 82 },
  ];

  const businessData = [
    { month: 'Jan', revenue: 45000, retention: 92, utilization: 85 },
    { month: 'Feb', revenue: 48000, retention: 94, utilization: 88 },
    { month: 'Mar', revenue: 52000, retention: 95, utilization: 90 },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">85%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Recovery Rate</p>
                <p className="text-2xl font-bold text-gray-900">78%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Active Clients</p>
                <p className="text-2xl font-bold text-gray-900">342</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-emerald-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$52,000</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="clinical" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="clinical">Clinical Outcomes</TabsTrigger>
          <TabsTrigger value="business">Business Intelligence</TabsTrigger>
        </TabsList>

        <TabsContent value="clinical">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Treatment Effectiveness</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={clinicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="effectiveness"
                      stroke="#3b82f6"
                      name="Effectiveness Score"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recovery Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={clinicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="recovery"
                      fill="#60a5fa"
                      name="Recovery Rate"
                    />
                    <Bar
                      dataKey="interventions"
                      fill="#93c5fd"
                      name="Interventions"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Comparative Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Treatment Success
                    </h3>
                    <p className="text-3xl font-bold text-blue-600">92%</p>
                    <p className="text-sm text-gray-600 mt-1">+5% from last month</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Average Sessions
                    </h3>
                    <p className="text-3xl font-bold text-green-600">12.5</p>
                    <p className="text-sm text-gray-600 mt-1">-2 from last month</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Client Satisfaction
                    </h3>
                    <p className="text-3xl font-bold text-purple-600">4.8</p>
                    <p className="text-sm text-gray-600 mt-1">+0.2 from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="business">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={businessData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3b82f6"
                      name="Monthly Revenue"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={businessData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="retention"
                      fill="#60a5fa"
                      name="Client Retention"
                    />
                    <Bar
                      dataKey="utilization"
                      fill="#93c5fd"
                      name="Resource Utilization"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Predictive Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Projected Revenue
                    </h3>
                    <p className="text-3xl font-bold text-blue-600">$58k</p>
                    <p className="text-sm text-gray-600 mt-1">Next month forecast</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Expected Growth
                    </h3>
                    <p className="text-3xl font-bold text-green-600">12%</p>
                    <p className="text-sm text-gray-600 mt-1">Quarter-over-quarter</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Resource Optimization
                    </h3>
                    <p className="text-3xl font-bold text-purple-600">95%</p>
                    <p className="text-sm text-gray-600 mt-1">Predicted efficiency</p>
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

export default AnalyticsTab;