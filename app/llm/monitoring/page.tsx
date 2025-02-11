"use client"
import React, { useState } from 'react';
import { 
  Activity,
  ArrowDown,
  ArrowUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Server,
  Zap,
  BarChart2,
  RefreshCcw
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
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

// Dummy data for traffic metrics
const trafficData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  requests: Math.floor(Math.random() * 1000) + 500,
  blocked: Math.floor(Math.random() * 50),
  latency: Math.floor(Math.random() * 100) + 50
}));

// Dummy data for security checks
const securityChecks = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  promptInjection: Math.floor(Math.random() * 100),
  piiDetection: Math.floor(Math.random() * 80),
  contentFilter: Math.floor(Math.random() * 60),
  dataLeakage: Math.floor(Math.random() * 40)
}));

// System health metrics
const systemHealth = {
  cpu: 45,
  memory: 68,
  storage: 32,
  network: 78
};

const TimeSelector = () => (
  <Select defaultValue="24h">
    <SelectTrigger className="w-[180px] bg-background text-foreground border-border">
      <SelectValue placeholder="Select time range" />
    </SelectTrigger>
    <SelectContent className="bg-popover text-popover-foreground border-border">
      <SelectItem value="1h">Last 1 hour</SelectItem>
      <SelectItem value="6h">Last 6 hours</SelectItem>
      <SelectItem value="24h">Last 24 hours</SelectItem>
      <SelectItem value="7d">Last 7 days</SelectItem>
    </SelectContent>
  </Select>
);


// Quick stats
const quickStats = [
  {
    title: "Total Requests",
    value: "23.4k",
    change: "+12.3%",
    trend: "up",
    description: "Requests in last 24h"
  },
  {
    title: "Avg. Latency",
    value: "142ms",
    change: "-8.1%",
    trend: "down",
    description: "Response time"
  },
  {
    title: "Security Blocks",
    value: "324",
    change: "+4.5%",
    trend: "up",
    description: "Blocked requests"
  },
  {
    title: "Success Rate",
    value: "99.8%",
    change: "+0.2%",
    trend: "up",
    description: "Request success rate"
  }
];

const MonitoringPage = () => {
  const [timeRange, setTimeRange] = useState('24h');

  const getStatusColor = (value: number) => {
    if (value < 60) return 'text-green-500';
    if (value < 80) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Monitoring Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time system monitoring and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select defaultValue="24h">
            <SelectTrigger className="w-[180px] bg-background text-foreground border-border">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last 1 hour</SelectItem>
              <SelectItem value="6h">Last 6 hours</SelectItem>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.trend === 'up' ? (
                <ArrowUp className="h-4 w-4 text-emerald-500" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change} {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
          <CardDescription>Real-time system performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">CPU Usage</span>
                <span className={`text-sm font-bold ${getStatusColor(systemHealth.cpu)}`}>
                  {systemHealth.cpu}%
                </span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div 
                  className={`h-2 rounded-full ${systemHealth.cpu < 60 ? 'bg-green-500' : systemHealth.cpu < 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${systemHealth.cpu}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Memory Usage</span>
                <span className={`text-sm font-bold ${getStatusColor(systemHealth.memory)}`}>
                  {systemHealth.memory}%
                </span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div 
                  className={`h-2 rounded-full ${systemHealth.memory < 60 ? 'bg-green-500' : systemHealth.memory < 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${systemHealth.memory}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Storage</span>
                <span className={`text-sm font-bold ${getStatusColor(systemHealth.storage)}`}>
                  {systemHealth.storage}%
                </span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div 
                  className={`h-2 rounded-full ${systemHealth.storage < 60 ? 'bg-green-500' : systemHealth.storage < 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${systemHealth.storage}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Network</span>
                <span className={`text-sm font-bold ${getStatusColor(systemHealth.network)}`}>
                  {systemHealth.network}%
                </span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div 
                  className={`h-2 rounded-full ${systemHealth.network < 60 ? 'bg-green-500' : systemHealth.network < 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${systemHealth.network}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Traffic Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Traffic Overview</CardTitle>
          <CardDescription>Request volume and performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="requests" 
                  stroke="#2563eb" 
                  name="Total Requests"
                />
                <Line 
                  type="monotone" 
                  dataKey="blocked" 
                  stroke="#dc2626" 
                  name="Blocked Requests"
                />
                <Line 
                  type="monotone" 
                  dataKey="latency" 
                  stroke="#2dd4bf" 
                  name="Latency (ms)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Security Checks Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Security Checks</CardTitle>
          <CardDescription>Security check metrics and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={securityChecks}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="promptInjection" 
                  stackId="1"
                  stroke="#2563eb" 
                  fill="#2563eb" 
                  name="Prompt Injection"
                />
                <Area 
                  type="monotone" 
                  dataKey="piiDetection" 
                  stackId="1"
                  stroke="#dc2626" 
                  fill="#dc2626" 
                  name="PII Detection"
                />
                <Area 
                  type="monotone" 
                  dataKey="contentFilter" 
                  stackId="1"
                  stroke="#2dd4bf" 
                  fill="#2dd4bf" 
                  name="Content Filter"
                />
                <Area 
                  type="monotone" 
                  dataKey="dataLeakage" 
                  stackId="1"
                  stroke="#eab308" 
                  fill="#eab308" 
                  name="Data Leakage"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitoringPage;