"use client"
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Settings, ChevronDown, ChevronUp, Filter, AlertCircle } from 'lucide-react';

// API Configuration Constants
const API_CONFIG = {
  CALENDLY: {
    TOKEN: process.env.REACT_APP_CALENDLY_TOKEN || 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzQyMjIyOTIwLCJqdGkiOiI5ZmJlYzE5MC0xNWZlLTRlOWYtYWM5ZC0xOWVhN2UxNmYxOWEiLCJ1c2VyX3V1aWQiOiI5ZTZlY2JlMS1mNDBhLTRjMTktOTFkMi0zM2IzNmM2ZTdmZjcifQ.KfIQ_FlbZs2HfKm0Rd8p3GXPy3XhUir0UVIYvR4OoSjOswMjrtPSQJ9mum8c0qgzQ8sGzJzmlRghvzVpNE3iCA',
    BASE_URL: 'https://api.calendly.com/scheduled_events',
  },
  RINGCENTRAL: {
    JWT_TOKEN: process.env.REACT_APP_RINGCENTRAL_JWT_TOKEN || 'eyJraWQiOiI4NzYyZjU5OGQwNTk0NGRiODZiZjVjYTk3ODA0NzYwOCIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJhdWQiOiJodHRwczovL3BsYXRmb3JtLnJpbmdjZW50cmFsLmNvbS9yZXN0YXBpL29hdXRoL3Rva2VuIiwic3ViIjoiNjMzNjgxNjMwMzEiLCJpc3MiOiJodHRwczovL3BsYXRmb3JtLnJpbmdjZW50cmFsLmNvbSIsImV4cCI6MTc4Mjk1MDM5OSwiaWF0IjoxNzQyMjExMzY5LCJqdGkiOiJxRWJhcnNUdFN6aTZza1A2MkFqRXNnIn0.RntTxfiPIGYwrLbgOn2T-LWFKKcJkCgtwjEVAQWEmgOXrpRA_j0uePCPva2v30mebgdYjs4YvmntmPTSmeDiJ5zcRUb_8GcjBLvTackQ6tnqacsLSkviioLh2MRlG8kxw2Hdv3eLuyHyyZJgZYkz2D4KLr_HuStMpzUcAG-1mHoAFPQFiuGUr3vM3cnKn4ETZHb67Wl4e7ixaBgCCnw_JjD54RPAb4VKt4ZDSGnQn13vZLjOugTWP-h-JMdRKRxp0Xf8Yv6D9PbhP0KzUeS_3zRxdZSHXl3KVS7NMQTBVFib6p_SU-BqZX7_FGLJJRk5a2hh0gywgwRfF-A3BiDuKQ',
    BASE_URL: 'https://platform.ringcentral.com/restapi/v1.0/account/~/extension/~/call-log',
  },
  ASANA: {
    TOKEN: process.env.REACT_APP_ASANA_TOKEN || '2/1206975274044929/1209700057153684:ac5c3c7a610c64dc19a316e33185d57b',
    BASE_URL: 'https://app.asana.com/api/1.0',
    WORKSPACE_ID: process.env.REACT_APP_ASANA_WORKSPACE_ID || '1202291038019792',
  }
};

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

  // Error state management
  const [error, setError] = useState(null);

  // Data processing functions
  const formatCalendlyDate = (date) => {
    // Format date for Calendly API (ISO string with proper timezone handling)
    const d = new Date(date);
    // Set time to start of day
    d.setHours(0, 0, 0, 0);
    return d.toISOString();
  };

  const formatCalendlyEndDate = (date) => {
    // Format end date for Calendly API (end of the selected day)
    const d = new Date(date);
    // Set time to end of day
    d.setHours(23, 59, 59, 999);
    return d.toISOString();
  };

  // Fetch functions for each API
  const fetchCalendlyEvents = async (date) => {
    try {
      // Create start and end parameters
      const minStartTime = formatCalendlyDate(date);
      const maxStartTime = formatCalendlyEndDate(date);
      
      // Construct the API request
      const response = await fetch(`${API_CONFIG.CALENDLY.BASE_URL}?min_start_time=${minStartTime}&max_start_time=${maxStartTime}&organization=https://api.calendly.com/organizations/a26a7019-d370-424f-b277-59658d73b25f`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_CONFIG.CALENDLY.TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Calendly API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Filter only 15-minute duration events
      return data.collection.filter(event => {
        // Check if event duration is 15 minutes
        // Note: In a real implementation, you might need to calculate duration from start/end times
        // or check event_type for 15-minute designation
        return event.duration === 15 || event.duration === "15" || 
               (event.event_type && event.event_type.includes("15"));
      }).map(event => ({
        id: event.uri.split('/').pop(), // Extract ID from URI
        scheduledTime: new Date(event.start_time),
        clientName: event.name || 'Unknown Client',
        clientEmail: event.email || null, // Extract email for Asana lookup
        clientPhone: event.phone_number || null, // Extract phone for RingCentral lookup
        // Other relevant fields
      }));
    } catch (error) {
      console.error('Error fetching Calendly events:', error);
      setError('Failed to fetch scheduled events. Please try again.');
      return [];
    }
  };

  const fetchRingCentralCalls = async (date, phoneNumber) => {
    try {
      // Format date parameters for RingCentral API
      const dateFrom = formatCalendlyDate(date);
      const dateTo = formatCalendlyEndDate(date);
      
      // Fetch all calls for the date
      const response = await fetch(`${API_CONFIG.RINGCENTRAL.BASE_URL}?dateFrom=${dateFrom}&dateTo=${dateTo}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_CONFIG.RINGCENTRAL.JWT_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`RingCentral API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Find the call that matches the client's phone number
      // Note: In a real implementation, you might need to normalize phone numbers for comparison
      const matchedCall = data.records.find(call => {
        // Compare with the target phone number, accounting for potential formatting differences
        const normalizedCallNumber = call.to?.phoneNumber?.replace(/\D/g, '');
        const normalizedTargetNumber = phoneNumber?.replace(/\D/g, '');
        return normalizedCallNumber === normalizedTargetNumber;
      });
      
      return matchedCall ? new Date(matchedCall.startTime) : null;
    } catch (error) {
      console.error('Error fetching RingCentral calls:', error);
      return null;
    }
  };

  const fetchAsanaComments = async (clientEmail) => {
    try {
      if (!clientEmail) return "No email available to find task";
      
      // Step 1: Search for tasks with the client email
      const searchResponse = await fetch(`${API_CONFIG.ASANA.BASE_URL}/workspaces/${API_CONFIG.ASANA.WORKSPACE_ID}/tasks/search?text=${encodeURIComponent(clientEmail)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_CONFIG.ASANA.TOKEN}`,
          'Accept': 'application/json'
        }
      });
      
      if (!searchResponse.ok) {
        throw new Error(`Asana API search error: ${searchResponse.status}`);
      }
      
      const searchData = await searchResponse.json();
      
      // If no tasks found
      if (!searchData.data || searchData.data.length === 0) {
        return "No related task found";
      }
      
      // Get the most relevant task (assuming first result)
      const taskId = searchData.data[0].gid;
      
      // Step 2: Fetch comments for the task
      const commentsResponse = await fetch(`${API_CONFIG.ASANA.BASE_URL}/tasks/${taskId}/stories`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_CONFIG.ASANA.TOKEN}`,
          'Accept': 'application/json'
        }
      });
      
      if (!commentsResponse.ok) {
        throw new Error(`Asana API comments error: ${commentsResponse.status}`);
      }
      
      const commentsData = await commentsResponse.json();
      
      // Extract and return the most recent comment
      if (commentsData.data && commentsData.data.length > 0) {
        // Sort by created_at (most recent first)
        const sortedComments = commentsData.data.sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        );
        
        return sortedComments[0].text || "No comment content available";
      } else {
        return "No comments found on task";
      }
    } catch (error) {
      console.error('Error fetching Asana comments:', error);
      return "Failed to fetch task comments";
    }
  };

  // Main function to fetch and consolidate all data
  const fetchCallData = async (date) => {
    setLoading(true);
    setError(null);
    try {
      // Step 1: Get Calendly events
      const calendlyEvents = await fetchCalendlyEvents(date);
      
      if (calendlyEvents.length === 0) {
        setCallData([]);
        setLoading(false);
        return;
      }
      
      // Step 2: For each event, fetch associated RingCentral and Asana data
      const completeData = await Promise.all(calendlyEvents.map(async (event, index) => {
        // Get actual call time from RingCentral
        const actualCallTime = await fetchRingCentralCalls(date, event.clientPhone);
        
        // Get comments from Asana
        const nextSteps = await fetchAsanaComments(event.clientEmail);
        
        return {
          id: index + 1,
          clientName: event.clientName,
          scheduledTime: event.scheduledTime,
          actualTime: actualCallTime || new Date(event.scheduledTime), // Fallback if no call record found
          nextSteps: nextSteps
        };
      }));
      
      setCallData(completeData);
    } catch (error) {
      console.error('Error in fetchCallData:', error);
      setError('Failed to load call data. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Fallback to dummy data for development or when APIs fail
  const loadDummyData = (date) => {
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
        // ... remaining dummy data entries
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
      // Use the real API fetch function when in production
      const useRealApi = 'true';
      
      if (useRealApi) {
        fetchCallData(selectedDate);
      } else {
        // Fallback to dummy data for development or testing
        loadDummyData(selectedDate);
      }
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

      {error ? (
        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <div className="flex items-center">
            <AlertCircle size={20} className="text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
          <button 
            onClick={() => loadDummyData(selectedDate)}
            className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Load Sample Data Instead
          </button>
        </div>
      ) : loading ? (
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