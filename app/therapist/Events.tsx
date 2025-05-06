import React, { useState, useEffect, useMemo } from 'react';
// Using date-fns for robust date handling
import { format as formatDateFns, isToday, startOfDay, parseISO, isSameDay } from 'date-fns'; // Added isSameDay
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Clock,
  Phone,
  Video,
  Calendar as CalendarIcon,
  Copy,
  CheckCircle, // Used for 'Disposition Added' state & Copy success
  ExternalLink,
  User,
  FileText, // Still needed for Dialog Labels
  Smile,
  CalendarCheck, // For Go to Today button
  Clipboard, // Used for 'Add Disposition' state
  MessageSquare, // Icon representing notes added this session
  Bell // Icon for Notifications
} from 'lucide-react';

// --- Utility Functions ---

function convertToPST(utcTimeString) {
  if (!utcTimeString || isNaN(new Date(utcTimeString).getTime())) {
      return "Invalid Date";
  }
  const date = new Date(utcTimeString);
  return date.toLocaleTimeString('en-US', {
    timeZone: 'America/Los_Angeles', // Example Timezone
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

function formatTimeRange(startTime, endTime) {
  const start = convertToPST(startTime);
  const end = convertToPST(endTime);
  if (start === "Invalid Date" || end === "Invalid Date") {
      return "Invalid Time";
  }
  return `${start} - ${end}`;
}

function getAppointmentStatus(startTime, endTime) {
  try {
    const now = new Date(); // Current time in user's browser
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return "invalid";

    // For sample data consistency, we compare against the *sample* 'now'
    const contextNow = new Date(Date.UTC(2025, 3, 30, 14, 0, 0)); // Use this for status in relation to sample data context
    if (contextNow >= start && contextNow <= end) return "current";
    if (contextNow < start) return "upcoming";
    return "past"; // contextNow > end

  } catch (error) {
    console.error("Error getting appointment status:", error);
    return "invalid";
  }
}


function sortAppointmentsByTime(appointments) {
  const validAppointments = appointments.filter(a => a.startTime && !isNaN(new Date(a.startTime).getTime()));
  return [...validAppointments].sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
}

function formatNoteTimestamp(timestamp) {
    if (!timestamp) return '';
    try {
        const date = typeof timestamp === 'string' ? parseISO(timestamp) : new Date(timestamp);
        if (isNaN(date.getTime())) return 'Invalid Date';
        return formatDateFns(date, 'PPpp', { timeZone: 'America/Los_Angeles' });
    } catch (e) {
        console.error("Error formatting timestamp:", e);
        return 'Invalid Date';
    }
}

// --- Main Component ---
const TherapistAppointmentsPage = () => {
  // --- State Variables ---
  // Use the sample data's 'today' as the initial selected date for demo consistency
  const contextTodayDate = useMemo(() => startOfDay(new Date(Date.UTC(2025, 3, 30, 0, 0, 0))), []);
  const [selectedDate, setSelectedDate] = useState(contextTodayDate); // Default to sample data's 'today'

  const [appointments, setAppointments] = useState([]);
  const [dispositionDialogOpen, setDispositionDialogOpen] = useState(false);
  const [patientDetailsDialogOpen, setPatientDetailsDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [disposition, setDisposition] = useState("");
  const [dispositionNotes, setDispositionNotes] = useState("");
  const [therapistNoteText, setTherapistNoteText] = useState("");
  const [isCopied, setIsCopied] = useState(null);
  const [therapistEmail] = useState('geeta@therawin.health');

  // --- Sample Data Setup Effect ---
  useEffect(() => {
    const createDate = (baseDate, dayOffset, hour, minute) => {
        const date = new Date(baseDate);
        date.setDate(date.getDate() + dayOffset);
        date.setUTCHours(hour, minute, 0, 0);
        return date.toISOString();
    }
    // Base context time: Apr 30, 2025 14:00 UTC (7 AM PST)
    const contextBaseTime = new Date(Date.UTC(2025, 3, 30, 14, 0, 0));

    setAppointments([
      // --- Today's Appointments (Apr 30, 2025) ---
      // Past, Disposition Added
      { id: "T1", patientName: "David Wilson", startTime: createDate(contextBaseTime, 0, 13, 0), endTime: createDate(contextBaseTime, 0, 13, 50), sessionType: "zoom", zoomLink: "https://zoom.us/j/T1", disposition: "Completed", notes: "Patient reported improved sleep patterns. Follow up in 2 weeks.", phone: null, therapistNotes: [
          { text: "David seems to be responding well to the CBT techniques discussed last week. Mentioned difficulty with applying them during high-stress work situations. Plan to explore workplace triggers next session.", author: "geeta@therawin.health", timestamp: createDate(contextBaseTime, -7, 14, 0) }
      ] },
      // Current (at 14:00 UTC), No Disposition Yet << THIS ONE SHOULD BE PENDING LATER
      { id: "T2", patientName: "Emily Rodriguez", startTime: createDate(contextBaseTime, 0, 13, 45), endTime: createDate(contextBaseTime, 0, 14, 35), sessionType: "phone", zoomLink: null, disposition: null, notes: "", phone: "555-111-2222", therapistNotes: [] },
       // Past, No Disposition Yet (For Notification Demo) << THIS ONE IS PENDING
      { id: "T0_PENDING", patientName: "Charlie Brown", startTime: createDate(contextBaseTime, 0, 11, 0), endTime: createDate(contextBaseTime, 0, 11, 50), sessionType: "zoom", zoomLink: "https://zoom.us/j/T0", disposition: null, notes: "", phone: null, therapistNotes: [] },
      // Upcoming
      { id: "T3", patientName: "Michael Chen", startTime: createDate(contextBaseTime, 0, 15, 0), endTime: createDate(contextBaseTime, 0, 15, 50), sessionType: "zoom", zoomLink: "https://zoom.us/j/T3", disposition: null, notes: "", phone: null, therapistNotes: [] },
      { id: "T4", patientName: "Sarah Johnson", startTime: createDate(contextBaseTime, 0, 16, 0), endTime: createDate(contextBaseTime, 0, 16, 50), sessionType: "zoom", zoomLink: "https://zoom.us/j/T4", disposition: null, notes: "", phone: null, therapistNotes: [] },
      { id: "T5", patientName: "Robert Kim", startTime: createDate(contextBaseTime, 0, 17, 30), endTime: createDate(contextBaseTime, 0, 18, 20), sessionType: "phone", zoomLink: null, disposition: null, notes: "", phone: "555-333-4444", therapistNotes: [] },
      { id: "T6", patientName: "Aisha Patel", startTime: createDate(contextBaseTime, 0, 19, 0), endTime: createDate(contextBaseTime, 0, 19, 50), sessionType: "zoom", zoomLink: "https://zoom.us/j/T6", disposition: null, notes: "", phone: null, therapistNotes: [] },
      { id: "T7", patientName: "James Wilson", startTime: createDate(contextBaseTime, 0, 21, 0), endTime: createDate(contextBaseTime, 0, 21, 50), sessionType: "phone", zoomLink: null, disposition: null, notes: "", phone: "555-555-6666", therapistNotes: [] },
      // --- Yesterday's Appointment (Apr 29, 2025) ---
      { id: "Y1", patientName: "Yesterday Session", startTime: createDate(contextBaseTime, -1, 17, 0), endTime: createDate(contextBaseTime, -1, 17, 50), sessionType: "zoom", zoomLink: "https://zoom.us/j/Y1", disposition: "Completed", notes: "Session finished.", phone: null, therapistNotes: [
          { text: "Good progress on identifying negative thought patterns.", author: "geeta@therawin.health", timestamp: createDate(contextBaseTime, -1, 18, 0) }
      ] },
       // Yesterday, No Disposition Yet (To show notification only counts for 'today')
      { id: "Y_PENDING", patientName: "Lucy Van Pelt", startTime: createDate(contextBaseTime, -1, 10, 0), endTime: createDate(contextBaseTime, -1, 10, 50), sessionType: "phone", zoomLink: null, disposition: null, notes: "", phone: "555-000-1111", therapistNotes: [] },
      // --- Tomorrow's Appointments (May 1, 2025) ---
      { id: "Tm1", patientName: "Tomorrow Morning", startTime: createDate(contextBaseTime, 1, 16, 30), endTime: createDate(contextBaseTime, 1, 17, 20), sessionType: "phone", zoomLink: null, disposition: null, notes: "", phone: "555-888-9999", therapistNotes: [] },
      { id: "Tm2", patientName: "Tomorrow Afternoon", startTime: createDate(contextBaseTime, 1, 20, 0), endTime: createDate(contextBaseTime, 1, 20, 50), sessionType: "zoom", zoomLink: "https://zoom.us/j/Tm2", disposition: null, notes: "", phone: null, therapistNotes: [] },
      // Add another appointment for David Wilson to test note aggregation
      { id: "Y2", patientName: "David Wilson", startTime: createDate(contextBaseTime, -8, 15, 0), endTime: createDate(contextBaseTime, -8, 15, 50), sessionType: "zoom", zoomLink: "https://zoom.us/j/Y2", disposition: "Completed", notes: "Previous session notes.", phone: null, therapistNotes: [
          { text: "Initial intake session. Discussed goals and history.", author: "geeta@therawin.health", timestamp: createDate(contextBaseTime, -8, 16, 0) }
      ] },
    ]);
  }, [therapistEmail, contextTodayDate]); // Add contextTodayDate dependency

  // --- Event Handlers ---
  const handleDispositionClick = (appointment) => {
    setSelectedAppointment(appointment);
    setDisposition(appointment.disposition || "");
    setDispositionNotes(appointment.notes || "");
    setTherapistNoteText(""); // Clear previous therapist note text
    setDispositionDialogOpen(true);
  };

  const handlePatientDetailsClick = (appointment) => {
    setSelectedAppointment(appointment);
    setPatientDetailsDialogOpen(true);
  };

  const handleSaveDisposition = () => {
    if (!selectedAppointment) return;

    const newTherapistNote = therapistNoteText.trim()
      ? { text: therapistNoteText.trim(), author: therapistEmail, timestamp: new Date().toISOString() } : null;

    setAppointments(prev => prev.map(appt => {
      if (appt.id === selectedAppointment.id) {
        const existingNotes = appt.therapistNotes || [];
        return {
          ...appt,
          disposition: disposition || null,
          notes: dispositionNotes,
          therapistNotes: newTherapistNote ? [...existingNotes, newTherapistNote] : existingNotes,
        };
      }
      return appt;
    }));

    setDispositionDialogOpen(false);
    setSelectedAppointment(null);
    setTherapistNoteText("");
    setDisposition("");
    setDispositionNotes("");
  };

  const handleCopyPhone = (phone, appointmentId) => { navigator.clipboard.writeText(phone); setIsCopied(appointmentId); setTimeout(() => setIsCopied(null), 2000); };
  const handleJoinZoomClick = (appointment) => { if (appointment.zoomLink) { window.open(appointment.zoomLink, '_blank'); handleDispositionClick(appointment); } };
  const handleGoToToday = () => { setSelectedDate(contextTodayDate); }; // Go to sample data's today

  // Notification Click Handler
  const handleNotificationClick = () => {
      // In this demo, the notification always refers to the sample data's "today"
      setSelectedDate(contextTodayDate);
      // In a real app, you might navigate to the specific date the notification pertains to.
  };


  // --- Derived State & Logic ---
  const displayedAppointments = useMemo(() => {
    if (!selectedDate) return [];
    const targetDateStart = startOfDay(selectedDate);

    const filtered = appointments.filter(a =>
        a.startTime &&
        !isNaN(new Date(a.startTime).getTime()) &&
        isSameDay(new Date(a.startTime), targetDateStart) // Use isSameDay for accurate comparison
    );

    // Keep the sorting, but display all appointments for the selected day
    return sortAppointmentsByTime(filtered);

  }, [appointments, selectedDate]);

  const upcomingAppointmentId = useMemo(() => {
      // Determine 'now' relative to the sample data for accurate 'next up' status
      const contextNow = new Date(Date.UTC(2025, 3, 30, 14, 0, 0));
      // Filter displayed appointments for the ones actually starting after 'now'
      const futureAppointmentsOnSelectedDay = displayedAppointments.filter(a => new Date(a.startTime) > contextNow);
      // The first one in the sorted list is the 'next up'
      return futureAppointmentsOnSelectedDay[0]?.id;
  }, [displayedAppointments]);


  // Calculate Pending Dispositions for 'Today' (relative to sample data context)
  const pendingDispositionsTodayCount = useMemo(() => {
      const contextNow = new Date(Date.UTC(2025, 3, 30, 14, 0, 0)); // Sample 'Now'
      const todayStart = contextTodayDate; // Sample 'Today'

      return appointments.filter(appt => {
          const apptStartTime = new Date(appt.startTime);
          const apptEndTime = new Date(appt.endTime);
          // Check if appointment is on 'today' and ended before 'now' and has no disposition
          return isSameDay(apptStartTime, todayStart) && // Is it today?
                 apptEndTime < contextNow &&              // Has it ended?
                 !appt.disposition;                       // Is disposition missing?
      }).length;
  }, [appointments, contextTodayDate]);


  // Function to get all therapist notes for a specific patient
  const getAllTherapistNotesForPatient = (patientName) => {
    if (!patientName) return [];
    const allNotes = appointments
        .filter(appt => appt.patientName === patientName && appt.therapistNotes)
        .flatMap(appt => appt.therapistNotes)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return allNotes;
  };

  // --- Render Appointment Card ---
  const renderAppointmentCard = (appointment) => {
    const status = getAppointmentStatus(appointment.startTime, appointment.endTime);
    const isCurrent = status === "current";
    const isUpcomingNext = status === "upcoming" && appointment.id === upcomingAppointmentId;
    const isPast = status === "past";
    const isOtherUpcoming = status === "upcoming" && !isUpcomingNext;

    const dispositionExists = !!appointment.disposition; // Check if disposition is set

    // Styling (mostly unchanged, status still used for highlighting)
    let cardClasses = "bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden";
    let timeBoxClasses = "p-4 md:w-56 flex flex-col justify-center";
    let indicatorBorderClass = "border-l-4";

    if (isUpcomingNext || isCurrent) {
      cardClasses += ` ${indicatorBorderClass} border-blue-500`;
      timeBoxClasses += " bg-blue-50 text-blue-800";
    } else if (isPast) {
      // Keep past appointments distinct but fully opaque now
      cardClasses += " bg-slate-50";
      timeBoxClasses += " bg-slate-100 text-slate-600";
    } else {
      cardClasses += ` ${indicatorBorderClass} border-blue-200`;
      timeBoxClasses += " bg-blue-50 text-blue-700";
    }

    return (
      <Card key={appointment.id} className={cardClasses}>
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Time and Status Column */}
            <div className={timeBoxClasses}>
               <div className="mb-2">
                {appointment.sessionType === "zoom" ? (
                  <Badge variant="secondary" className={`text-xs px-2 py-0.5 font-medium ${
                      isUpcomingNext || isCurrent ? 'bg-blue-100 text-blue-700' :
                      isOtherUpcoming ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-200 text-slate-600' }`}>
                    <Video className="h-3 w-3 mr-1" /> Zoom
                  </Badge>
                ) : (
                  <Badge variant="secondary" className={`text-xs px-2 py-0.5 font-medium ${
                      isUpcomingNext || isCurrent ? 'bg-blue-100 text-blue-700' :
                      isOtherUpcoming ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-200 text-slate-600' }`}>
                    <Phone className="h-3 w-3 mr-1" /> Phone
                  </Badge>
                )}
              </div>
              <div className="flex items-center mb-1.5">
                <Clock className="h-4 w-4 mr-1.5 flex-shrink-0" />
                <span className={`font-medium ${isCurrent || isUpcomingNext ? "text-base" : "text-sm"}`}>
                  {formatTimeRange(appointment.startTime, appointment.endTime)}
                </span>
              </div>
            </div>

            {/* Patient Info and Actions Column */}
            <div className="flex-1 p-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3">
                 {/* Patient Name (No FileText Icon anymore) */}
                 <div className="flex items-center gap-2 mb-1 sm:mb-0">
                    <h3 className={`text-lg font-semibold ${
                        isUpcomingNext || isCurrent ? 'text-blue-800':
                        isPast ? 'text-slate-700':
                        'text-gray-800'
                      }`}>{appointment.patientName}
                    </h3>
                 </div>
                {/* Action Buttons: Grouped, smaller size - ALWAYS ENABLED */}
                <div className="flex flex-wrap gap-2 items-start">
                  {appointment.sessionType === "zoom" ? (
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-sm px-3"
                      onClick={() => handleJoinZoomClick(appointment)}
                      aria-label={`Join Zoom for ${appointment.patientName}`}
                      // Removed disabled prop
                    >
                      <Video className="h-4 w-4 mr-1.5" /> Join
                      <ExternalLink className="h-3 w-3 ml-1 opacity-70" />
                    </Button>
                  ) : ( // Phone Session
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className={`border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors ${isCopied === appointment.id ? 'bg-blue-50 border-blue-200' : ''} px-3`}
                        onClick={() => handleCopyPhone(appointment.phone, appointment.id)}
                        aria-label={`Copy phone for ${appointment.patientName}`}
                        // Removed disabled prop
                      >
                        {isCopied === appointment.id ? ( <CheckCircle className="h-4 w-4 text-blue-600" /> ) : ( <Copy className="h-4 w-4" /> )}
                        <span className="ml-1.5 text-xs font-mono">{appointment.phone || 'No Phone'}</span>
                      </Button>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-sm px-3"
                        aria-label={`Call ${appointment.patientName}`}
                        onClick={() => { if(appointment.phone) window.location.href = `tel:${appointment.phone}`; }}
                         // Removed disabled prop
                      > <Phone className="h-4 w-4" />
                        <span className="ml-1.5">Call</span>
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Lower Action Buttons - ALWAYS ENABLED */}
              <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-100">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-3"
                  onClick={() => handlePatientDetailsClick(appointment)}
                  aria-label={`Details for ${appointment.patientName}`}
                  // Removed disabled prop
                > <User className="h-4 w-4 mr-1.5" /> Details </Button>

                {/* Disposition Button: State changes based on dispositionExists */}
                <Button
                  size="sm"
                  className={`px-3 flex items-center transition-colors ${
                    dispositionExists
                      ? 'bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800' // Green state
                      : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 hover:text-indigo-800' // Default state
                  }`}
                  onClick={() => handleDispositionClick(appointment)}
                  aria-label={`${dispositionExists ? 'View or Edit' : 'Add'} Disposition & Notes for ${appointment.patientName}`}
                   // Removed disabled prop
                >
                    {dispositionExists ? (
                        <CheckCircle className="h-4 w-4 mr-1.5 text-green-600" />
                    ) : (
                        <Clipboard className="h-4 w-4 mr-1.5" />
                    )}
                    {dispositionExists ? 'Disposition Added' : 'Add Disposition'}
                    {/* Optional: Keep note indicator if useful */}
                    {/* {appointment.therapistNotes?.length > 0 && <MessageSquare className="h-3 w-3 ml-1.5 text-indigo-400 opacity-70" title="Notes added this session"/> } */}
                 </Button>

              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // --- Main Render ---

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
         <header className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
           <div className="flex flex-col md:flex-row items-center justify-between gap-4"> {/* Increased gap */}
            {/* Left Side: Title and Date */}
            <div className="flex-grow">
              <h1 className="text-2xl font-semibold text-gray-800">
                  Hello Geet! Here's your schedule
              </h1>
              <p className="text-gray-600 mt-1">
                  {/* Display selected date */}
                  {selectedDate ? formatDateFns(selectedDate, 'MMMM d, yyyy') : ''}
                  {/* Highlight if selected date is the sample 'today' */}
                  {selectedDate && isSameDay(selectedDate, contextTodayDate) && <Badge variant="outline" className="ml-2 text-sm border-blue-200 text-blue-600 bg-blue-50">Today</Badge>}
              </p>
            </div>

            {/* Right Side: Notifications and Date Picker */}
            <div className="flex items-center gap-3 flex-wrap justify-end">
                 {/* Notification Area */}
                 {pendingDispositionsTodayCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-amber-600 hover:bg-amber-100 hover:text-amber-700"
                      onClick={handleNotificationClick}
                      aria-label={`Go to today to address ${pendingDispositionsTodayCount} pending dispositions`}
                      title={`Go to today (${formatDateFns(contextTodayDate, 'MMM d')})`}
                    >
                        <Bell className="h-4 w-4 mr-1.5 animate-pulse"/>
                        {pendingDispositionsTodayCount} Pending Today
                    </Button>
                 )}

                 {/* Date Picker */}
                 <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        size="sm"
                        variant={"outline"}
                        className={`w-[180px] sm:w-[240px] justify-start text-left font-normal text-sm border-gray-300 focus-visible:ring-blue-400 focus-visible:ring-offset-0 ${
                          !selectedDate && "text-muted-foreground"
                        }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-blue-600" />
                        {selectedDate ? formatDateFns(selectedDate, 'MMM d, yyyy') : <span>Select date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                         mode="single"
                         selected={selectedDate}
                         onSelect={setSelectedDate}
                         initialFocus
                         // Optionally disable future dates if needed
                         // disabled={(date) => date > new Date()}
                      />
                    </PopoverContent>
                  </Popover>

                  {/* "Go to Today" Button - Show if selected date is NOT today */}
                  {selectedDate && !isSameDay(selectedDate, contextTodayDate) && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleGoToToday}
                      aria-label="Go to today's date"
                      className="text-sm border-gray-300 text-blue-600 hover:bg-blue-50"
                    > <CalendarCheck className="h-4 w-4 mr-1.5" /> Today </Button>
                  )}
            </div>
          </div>
        </header>

        {/* Appointment List */}
        {displayedAppointments.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center border border-gray-100 shadow-sm mt-6">
            <Smile className="h-16 w-16 text-blue-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">
                No appointments found for this date.
            </h3>
            <p className="text-base text-gray-500">
                 Try selecting a different date or check back later.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedAppointments.map(renderAppointmentCard)}
          </div>
        )}
      </div>

      {/* --- Dialogs --- */}

      {/* Disposition and Therapist Note Dialog */}
      <Dialog open={dispositionDialogOpen} onOpenChange={setDispositionDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-blue-900">Record Outcome & Notes</DialogTitle>
            <DialogDescription className="text-sm text-gray-600"> For session with {selectedAppointment?.patientName} </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            {/* Disposition Section (Mandatory) */}
            <div className="space-y-1.5">
              <Label htmlFor="disposition" className="text-sm font-medium text-gray-700">
                Disposition <span className="text-red-500">*</span>
              </Label>
              <Select value={disposition} onValueChange={setDisposition} required>
                <SelectTrigger id="disposition" className="text-sm focus:ring-blue-500">
                  <SelectValue placeholder="Select disposition (mandatory)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ringing and LVM" className="text-sm">Ringing and LVM</SelectItem>
                  <SelectItem value="FFS booked" className="text-sm">FFS Booked</SelectItem>
                  <SelectItem value="No show" className="text-sm">No Show</SelectItem>
                  <SelectItem value="Rescheduled" className="text-sm">Rescheduled</SelectItem>
                  <SelectItem value="Completed" className="text-sm">Completed</SelectItem>
                  <SelectItem value="Technical Issues" className="text-sm">Technical Issues</SelectItem>
                  <SelectItem value="Needs Follow-up" className="text-sm">Needs Follow-up</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Disposition Notes Section */}
            <div className="space-y-1.5">
              <Label htmlFor="disposition-notes" className="text-sm font-medium text-gray-700">Disposition Notes</Label>
              <Textarea
                id="disposition-notes" placeholder="Add brief notes related to the disposition..." value={dispositionNotes}
                onChange={(e) => setDispositionNotes(e.target.value)}
                className="min-h-[80px] text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
             {/* Therapist Confidential Notes Section (Optional) */}
            <div className="space-y-1.5 border-t pt-4 mt-2 border-dashed border-slate-300">
              <Label htmlFor="therapist-notes" className="text-sm font-medium text-indigo-700 flex items-center gap-1.5">
                 <FileText className="h-4 w-4"/> Confidential Therapist Note (Optional)
              </Label>
               <p className="text-xs text-slate-500">This note is confidential and linked to this session.</p>
              <Textarea
                id="therapist-notes" placeholder="Add confidential notes for your records..." value={therapistNoteText}
                onChange={(e) => setTherapistNoteText(e.target.value)}
                className="min-h-[120px] text-sm focus:ring-indigo-500 focus:border-indigo-500 bg-indigo-50/30"
              />
            </div>
          </div>
          <DialogFooter>
            <Button size="sm" variant="outline" onClick={() => setDispositionDialogOpen(false)}>Cancel</Button>
            <Button
              size="sm"
              onClick={handleSaveDisposition}
              className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
              disabled={!disposition} // Still disable save if mandatory disposition is missing
            >
                Save Disposition & Notes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Patient Details Dialog (Includes Therapist Notes History) */}
      <Dialog open={patientDetailsDialogOpen} onOpenChange={setPatientDetailsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-blue-900">Patient Details & History</DialogTitle>
            <DialogDescription className="text-sm text-gray-600"> Information for {selectedAppointment?.patientName} </DialogDescription>
          </DialogHeader>
          <div className="space-y-5 py-4 max-h-[70vh] overflow-y-auto pr-2">
            {/* Sample Case Description */}
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Case Description</h3>
              <p className="text-sm text-gray-700 p-2.5 bg-slate-100 rounded border border-slate-200">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum, justo at hendrerit semper... (Replace with actual data)
              </p>
            </div>
            {/* Confidential Therapist Notes Section */}
            <div>
                 <h3 className="text-sm font-medium text-indigo-700 mb-2 flex items-center gap-1.5">
                    <FileText className="h-4 w-4"/> Confidential Notes
                 </h3>
                 {(() => {
                    const patientNotes = selectedAppointment ? getAllTherapistNotesForPatient(selectedAppointment.patientName) : [];
                    if (patientNotes.length === 0) {
                        return <p className="text-sm text-gray-500 italic px-2">No confidential therapist notes found for this client.</p>;
                    }
                    return (
                        <div className="space-y-3">
                            {patientNotes.map((note, index) => (
                                <div key={index} className="text-sm p-3 bg-indigo-50/50 rounded border border-indigo-100 shadow-sm">
                                    <p className="text-gray-800 mb-1.5 whitespace-pre-wrap">{note.text}</p> {/* Added whitespace-pre-wrap */}
                                    <p className="text-xs text-indigo-600">
                                        Noted by {note.author} on {formatNoteTimestamp(note.timestamp)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    );
                 })()}
            </div>
          </div>
          <DialogFooter>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setPatientDetailsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TherapistAppointmentsPage;