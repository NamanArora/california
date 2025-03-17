"use client"
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Settings, ChevronDown, ChevronUp, Filter } from 'lucide-react';

// Main Dashboard Component
const CallPerformanceDashboard = () => {
  // State management
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [callData, setCallData] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [thresholds, setThresholds] = useState({
    warning: 5, // 5 minutes
    critical: 15 // 15 minutes
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Dummy API function to fetch call data
  const fetchCallData = (date) => {
    setLoading(true);
    
    // Simulating API call with timeout
    setTimeout(() => {
      // Sample data with various delay scenarios
      const dummyData = [
        {
          id: 1,
          clientName: 'Acme Corporation',
          scheduledTime: new Date(`${date}T09:00:00`),
          actualTime: new Date(`${date}T09:03:00`),
          nextSteps: 'Follow up with pricing proposal by Friday'
        },
        {
          id: 2,
          clientName: 'TechStart Inc.',
          scheduledTime: new Date(`${date}T10:30:00`),
          actualTime: new Date(`${date}T10:45:00`),
          nextSteps: 'Demo requested for premium features'
        },
        {
          id: 3,
          clientName: 'Global Ventures',
          scheduledTime: new Date(`${date}T11:15:00`),
          actualTime: new Date(`${date}T11:17:00`),
          nextSteps: 'Send case studies for enterprise implementation'
        },
        {
          id: 4,
          clientName: 'Bright Solutions',
          scheduledTime: new Date(`${date}T13:45:00`),
          actualTime: new Date(`${date}T13:44:00`),
          nextSteps: 'Client is ready to move forward, prepare contract'
        },
        {
          id: 5,
          clientName: 'Nexus Partners',
          scheduledTime: new Date(`${date}T15:00:00`),
          actualTime: new Date(`${date}T15:20:00`),
          nextSteps: 'Concerns about integration timeline, schedule technical call'
        },
        {
          id: 6,
          clientName: 'Quantum Dynamics',
          scheduledTime: new Date(`${date}T09:30:00`),
          actualTime: new Date(`${date}T09:30:00`),
          nextSteps: 'Client satisfied with initial consultation, schedule follow-up next week'
        },
        {
          id: 7,
          clientName: 'Meridian Healthcare',
          scheduledTime: new Date(`${date}T11:00:00`),
          actualTime: new Date(`${date}T11:25:00`),
          nextSteps: 'Requires customized solution, prepare detailed proposal with timeline'
        },
        {
          id: 8,
          clientName: 'Atlas Financial',
          scheduledTime: new Date(`${date}T12:15:00`),
          actualTime: new Date(`${date}T12:14:00`),
          nextSteps: 'Send additional security documentation and compliance certificates'
        },
        {
          id: 9,
          clientName: 'Horizon Education',
          scheduledTime: new Date(`${date}T14:30:00`),
          actualTime: new Date(`${date}T14:55:00`),
          nextSteps: 'Requesting budget-friendly options, prepare tiered pricing structure'
        },
        {
          id: 10,
          clientName: 'Evergreen Properties',
          scheduledTime: new Date(`${date}T16:00:00`),
          actualTime: new Date(`${date}T16:04:00`),
          nextSteps: 'Schedule on-site demo with technical team next Tuesday'
        },
        {
          id: 11,
          clientName: 'Blue Ocean Marketing',
          scheduledTime: new Date(`${date}T10:00:00`),
          actualTime: new Date(`${date}T10:02:00`),
          nextSteps: 'Send case studies for similar industry clients'
        },
        {
          id: 12,
          clientName: 'Pioneer Technologies',
          scheduledTime: new Date(`${date}T13:00:00`),
          actualTime: new Date(`${date}T13:30:00`),
          nextSteps: 'Client interested in enterprise plan, prepare contract with legal'
        },
        {
          id: 13,
          clientName: 'Silver Crest Media',
          scheduledTime: new Date(`${date}T15:30:00`),
          actualTime: new Date(`${date}T15:29:00`),
          nextSteps: 'Send platform comparison against competitors'
        },
        {
          id: 14,
          clientName: 'North Star Consulting',
          scheduledTime: new Date(`${date}T16:45:00`),
          actualTime: new Date(`${date}T17:10:00`),
          nextSteps: 'High potential client, escalate to senior account manager'
        },
        {
          id: 15,
          clientName: 'Fusion Systems',
          scheduledTime: new Date(`${date}T12:30:00`),
          actualTime: new Date(`${date}T12:40:00`),
          nextSteps: 'Technical questions about API integration, schedule call with dev team'
        }
      ];
      
      setCallData(dummyData);
      setLoading(false);
    }, 1000);
  };

  // Handle date change
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDate) {
      fetchCallData(selectedDate);
    }
  };

  // Calculate delay between scheduled and actual call times
  const calculateDelay = (scheduled, actual) => {
    const diffInMinutes = Math.round((actual - scheduled) / (1000 * 60));
    return diffInMinutes;
  };

  // Get appropriate status label based on delay
  const getDelayStatus = (delay) => {
    if (delay <= 0) return { label: 'On Time', class: 'bg-green-100 text-green-800' };
    if (delay <= thresholds.warning) return { label: 'Slight Delay', class: 'bg-blue-100 text-blue-800' };
    if (delay <= thresholds.critical) return { label: 'Delayed', class: 'bg-yellow-100 text-yellow-800' };
    return { label: 'Severely Delayed', class: 'bg-red-100 text-red-800' };
  };

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
  };

  // Get sorted data
  const getSortedData = () => {
    if (!sortConfig.key) return callData;
    
    return [...callData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  // Format time to display
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Handle threshold updates
  const updateThresholds = (e) => {
    e.preventDefault();
    setShowSettings(false);
  };

  // Get maximum selectable date (yesterday)
  const getMaxDate = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Call Performance Dashboard</h1>
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
          aria-label="Open settings"
        >
          <Settings size={18} className="mr-2" />
          <span>Settings</span>
        </button>
      </header>

      {showSettings && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-3">Delay Thresholds (minutes)</h2>
          <form onSubmit={updateThresholds} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="warning-threshold" className="block text-sm font-medium text-gray-700 mb-1">
                Warning Threshold
              </label>
              <input
                id="warning-threshold"
                type="number"
                min="1"
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                value={thresholds.warning}
                onChange={(e) => setThresholds({...thresholds, warning: parseInt(e.target.value)})}
              />
            </div>
            <div>
              <label htmlFor="critical-threshold" className="block text-sm font-medium text-gray-700 mb-1">
                Critical Threshold
              </label>
              <input
                id="critical-threshold"
                type="number"
                min="1"
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                value={thresholds.critical}
                onChange={(e) => setThresholds({...thresholds, critical: parseInt(e.target.value)})}
              />
            </div>
            <div className="md:col-span-2 flex justify-end gap-3">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                onClick={() => setShowSettings(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mb-6">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-grow max-w-xs">
            <label htmlFor="date-selector" className="block text-sm font-medium text-gray-700 mb-1">
              Select Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={18} className="text-gray-500" />
              </div>
              <input
                id="date-selector"
                type="date"
                max={getMaxDate()}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={selectedDate}
                onChange={handleDateChange}
                required
              />
            </div>
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedDate}
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {loading ? (
        <div className="py-8 flex justify-center">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      ) : callData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center focus:outline-none" 
                    onClick={() => requestSort('id')}
                    aria-label="Sort by row number"
                  >
                    # 
                    {sortConfig.key === 'id' && (
                      sortConfig.direction === 'ascending' ? 
                      <ChevronUp size={14} className="ml-1"/> : 
                      <ChevronDown size={14} className="ml-1"/>
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center focus:outline-none" 
                    onClick={() => requestSort('clientName')}
                    aria-label="Sort by client name"
                  >
                    Client Name
                    {sortConfig.key === 'clientName' && (
                      sortConfig.direction === 'ascending' ? 
                      <ChevronUp size={14} className="ml-1"/> : 
                      <ChevronDown size={14} className="ml-1"/>
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center focus:outline-none" 
                    onClick={() => requestSort('scheduledTime')}
                    aria-label="Sort by scheduled time"
                  >
                    Scheduled Time
                    {sortConfig.key === 'scheduledTime' && (
                      sortConfig.direction === 'ascending' ? 
                      <ChevronUp size={14} className="ml-1"/> : 
                      <ChevronDown size={14} className="ml-1"/>
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center focus:outline-none" 
                    onClick={() => requestSort('actualTime')}
                    aria-label="Sort by actual time"
                  >
                    Actual Time
                    {sortConfig.key === 'actualTime' && (
                      sortConfig.direction === 'ascending' ? 
                      <ChevronUp size={14} className="ml-1"/> : 
                      <ChevronDown size={14} className="ml-1"/>
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Steps
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getSortedData().map((call) => {
                const delay = calculateDelay(call.scheduledTime, call.actualTime);
                const delayStatus = getDelayStatus(delay);
                
                return (
                  <tr key={call.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {call.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{call.clientName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={16} className="mr-1 text-gray-400" />
                        {formatTime(call.scheduledTime)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={16} className="mr-1 text-gray-400" />
                        {formatTime(call.actualTime)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${delayStatus.class}`}>
                        {delayStatus.label}
                        {delay > 0 && ` (${delay}m)`}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{call.nextSteps}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : selectedDate ? (
        <div className="bg-gray-50 p-8 text-center rounded">
          <p className="text-gray-600">No call data available for this date.</p>
        </div>
      ) : (
        <div className="bg-blue-50 p-8 text-center rounded">
          <p className="text-blue-600">Please select a date and submit to view call data.</p>
        </div>
      )}

      <footer className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-500">
        <p>Data sources: Calendly (scheduled calls), RingCentral (actual calls), Asana (next steps)</p>
      </footer>
    </div>
  );
};

export default CallPerformanceDashboard;