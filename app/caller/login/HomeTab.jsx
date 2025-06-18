"use client"
import React, { useState } from "react";
import { Phone, TrendingUp, Heart, BarChart3, Calendar, Clock, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function HomeTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Get tomorrow's date as minimum selectable date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Generate next 30 days for date selection
  const dateOptions = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return {
      value: date.toISOString().split('T')[0],
      label: date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
    };
  });

  // Generate time slots from 7 AM to 10 PM
  const timeSlots = Array.from({ length: 16 }, (_, i) => {
    const hour = i + 7;
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return {
      value: `${hour}:00`,
      label: `${displayHour}:00 ${period}`
    };
  });

  const handleScheduleCall = () => {
    if (selectedDate && selectedTime) {
      // Handle the scheduling logic here
      console.log("Scheduled call for:", selectedDate, selectedTime);
      setIsModalOpen(false);
      // Reset form
      setSelectedDate("");
      setSelectedTime("");
    }
  };

  const stats = [
    {
      title: "Total Sessions",
      value: 2,
      icon: Phone,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      title: "Current Streak", 
      value: `4 days`,
      icon: TrendingUp,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Avg Wellness Score",
      value: "7.3/10",
      icon: Heart,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-500",
    },
  ];

  const insights = [
    {
      type: "positive",
      title: "Positive Growth Trend",
      description: "Your stress levels have decreased by 15% this week",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      dotColor: "bg-blue-600",
    },
    {
      type: "positive", 
      title: "Strong Social Connections",
      description: "You've mentioned family and friends positively in recent calls",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      dotColor: "bg-orange-600",
    },
  ];

  const moodTrend = [
    { day: "Today", score: 8.0, progress: 80 },
    { day: "Yesterday", score: 7.5, progress: 75 },
    { day: "2 days ago", score: 6.0, progress: 60 },
  ];

  return (
    <div className="space-y-8 bg-white">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back to your wellness journey</h1>
        <p className="text-gray-600">Here's your mental wellness overview and progress.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Latest Insights */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Latest Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className={`p-4 ${insight.bgColor} rounded-lg border ${insight.borderColor}`}>
                <div className="flex items-start space-x-3">
                  <div className={`w-2 h-2 ${insight.dotColor} rounded-full mt-2`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{insight.title}</p>
                    <p className="text-sm text-gray-600">{insight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Mood Trend Chart */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>7-Day Mood Trend</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {moodTrend.map((trend, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 w-20">{trend.day}</span>
                <div className="flex items-center space-x-2 flex-1">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${trend.progress}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8">{trend.score}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Button 
          className="bg-orange-600 hover:bg-orange-700 text-white p-6 h-auto text-left justify-start space-x-3"
          onClick={() => setIsModalOpen(true)}
        >
          <Phone className="h-6 w-6" />
          <div>
            <h3 className="text-lg font-semibold mb-2">Schedule Next Call</h3>
            <p className="text-orange-100">Set up your next journaling session</p>
          </div>
        </Button>
        
        <Button variant="outline" className="p-6 h-auto text-left justify-start space-x-3 border-gray-300 hover:bg-gray-50">
          <BarChart3 className="h-6 w-6 text-blue-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">View Detailed Reports</h3>
            <p className="text-gray-600">Explore your complete wellness analytics</p>
          </div>
        </Button>
      </div>

      {/* Schedule Call Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Schedule Your Next Call</DialogTitle>
            <DialogDescription className="text-gray-600">
              Choose a convenient time for your next journaling session
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Date Selection */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                Select Date
              </Label>
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger id="date" className="w-full">
                  <SelectValue placeholder="Choose a date" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {dateOptions.map((date) => (
                    <SelectItem key={date.value} value={date.value}>
                      {date.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Time Selection */}
            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm font-medium text-gray-700">
                Select Time
              </Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger id="time" className="w-full">
                  <SelectValue placeholder="Choose a time" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot.value} value={slot.value}>
                      {slot.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Selected Summary */}
            {selectedDate && selectedTime && (
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-orange-600" />
                  <p className="text-sm text-gray-700">
                    Call scheduled for{" "}
                    <span className="font-medium">
                      {dateOptions.find(d => d.value === selectedDate)?.label}
                    </span>
                  </p>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <p className="text-sm text-gray-700">
                    at <span className="font-medium">{timeSlots.find(t => t.value === selectedTime)?.label}</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <Button 
              variant="outline" 
              onClick={() => setIsModalOpen(false)}
              className="border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleScheduleCall}
              disabled={!selectedDate || !selectedTime}
              className="bg-orange-600 hover:bg-orange-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Schedule Call
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}