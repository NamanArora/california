"use client"
import React, { useState } from 'react';
import { 
  BarChart2, 
  TrendingUp,
  Download,
  Calendar,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Shield,
  Clock,
  AlertTriangle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Dummy data for security metrics
const securityTrends = Array.from({ length: 30 }, (_, i) => ({
  date: `2024-02-${String(i + 1).padStart(2, '0')}`,
  promptInjection: Math.floor(Math.random() * 50),
  piiDetection: Math.floor(Math.random() * 40),
  contentSafety: Math.floor(Math.random() * 30),
  dataLeakage: Math.floor(Math.random() * 20)
}));

// Usage patterns data
const usagePatterns = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, '0')}:00`,
  requests: Math.floor(Math.random() * 1000) + 500,
  avgLatency: Math.floor(Math.random() * 100) + 50
}));

// Client distribution data
const clientDistribution = [
  { name: 'Enterprise', value: 45 },
  { name: 'Business', value: 30 },
  { name: 'Startup', value: 15 },
  { name: 'Individual', value: 10 }
];

// Response types distribution
const responseTypes = [
  { name: 'Successful', value: 85 },
  { name: 'Blocked', value: 8 },
  { name: 'Modified', value: 5 },
  { name: 'Failed', value: 2 }
];

const COLORS = ['#2563eb', '#dc2626', '#eab308', '#84cc16'];

// Key metrics
const keyMetrics = [
  {
    title: "Total Requests",
    value: "1.2M",
    change: "+12.3%",
    trend: "up",
    description: "Last 30 days"
  },
  {
    title: "Avg Response Time",
    value: "156ms",
    change: "-8.1%",
    trend: "down",
    description: "Compared to last month"
  },
  {
    title: "Security Blocks",
    value: "2,347",
    change: "+5.4%",
    trend: "up",
    description: "Last 30 days"
  },
  {
    title: "Active Clients",
    value: "412",
    change: "+15.2%",
    trend: "up",
    description: "Monthly active users"
  }
];

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('30d');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Analytics</h1>
          <p className="text-muted-foreground">
            Security trends, performance metrics, and usage patterns
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select defaultValue="30d">
            <SelectTrigger className="w-[180px] bg-background text-foreground border-border">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="bg-background text-foreground border-border">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {keyMetrics.map((metric, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              {metric.trend === 'up' ? (
                <ArrowUpRight className="h-4 w-4 text-emerald-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                {metric.change} {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Security Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Security Trends</CardTitle>
          <CardDescription>Security check triggers over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={securityTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  interval={4}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="promptInjection" 
                  stroke="#2563eb" 
                  name="Prompt Injection"
                />
                <Line 
                  type="monotone" 
                  dataKey="piiDetection" 
                  stroke="#dc2626" 
                  name="PII Detection"
                />
                <Line 
                  type="monotone" 
                  dataKey="contentSafety" 
                  stroke="#eab308" 
                  name="Content Safety"
                />
                <Line 
                  type="monotone" 
                  dataKey="dataLeakage" 
                  stroke="#84cc16" 
                  name="Data Leakage"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Usage Patterns */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Usage Patterns</CardTitle>
            <CardDescription>Request volume and latency by hour</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={usagePatterns}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    yAxisId="left"
                    dataKey="requests" 
                    fill="#2563eb" 
                    name="Requests"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="avgLatency"
                    stroke="#dc2626"
                    name="Avg Latency (ms)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribution Analysis</CardTitle>
            <CardDescription>Client and response type breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] grid grid-cols-2 gap-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={clientDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {clientDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={responseTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {responseTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
    </div>
  );
};

export default AnalyticsPage;