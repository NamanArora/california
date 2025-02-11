"use client"
import React, { useState } from 'react';
import { 
  AlertTriangle,
  Search,
  Filter,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Calendar,
  LucideIcon
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// TypeScript interfaces
interface TimelineEvent {
  time: string;
  event: string;
  user: string;
}

interface Incident {
  id: string;
  title: string;
  type: string;
  severity: 'high' | 'medium' | 'low';
  status: 'open' | 'investigating' | 'resolved';
  timestamp: string;
  assignedTo: string;
  source: string;
  affectedSystem: string;
  description: string;
  timeline: TimelineEvent[];
}

// Dummy data with proper typing
const incidents: Incident[] = [
  {
    id: "INC-001",
    title: "Potential Prompt Injection Detected",
    type: "Security",
    severity: "high",
    status: "open",
    timestamp: "2024-02-11T10:30:00Z",
    assignedTo: "John Doe",
    source: "Input Security Layer",
    affectedSystem: "GPT-4 Proxy",
    description: "Multiple attempts to bypass prompt restrictions detected from IP 192.168.1.100",
    timeline: [
      { time: "10:30:00", event: "Incident detected", user: "System" },
      { time: "10:30:05", event: "Alert generated", user: "System" },
      { time: "10:35:00", event: "Investigation started", user: "John Doe" }
    ]
  },
  {
    id: "INC-002",
    title: "PII Data Leak Prevention",
    type: "Privacy",
    severity: "medium",
    status: "investigating",
    timestamp: "2024-02-11T09:15:00Z",
    assignedTo: "Jane Smith",
    source: "Output Security Layer",
    affectedSystem: "Content Filter",
    description: "Potential PII detected in LLM response",
    timeline: [
      { time: "09:15:00", event: "PII detected in output", user: "System" },
      { time: "09:15:10", event: "Content blocked", user: "System" }
    ]
  },
  {
    id: "INC-003",
    title: "Rate Limit Exceeded",
    type: "System",
    severity: "low",
    status: "resolved",
    timestamp: "2024-02-11T08:00:00Z",
    assignedTo: "Mike Johnson",
    source: "API Gateway",
    affectedSystem: "Rate Limiter",
    description: "Client exceeded rate limit threshold",
    timeline: [
      { time: "08:00:00", event: "Rate limit exceeded", user: "System" },
      { time: "08:30:00", event: "Issue resolved", user: "Mike Johnson" }
    ]
  }
];

const IncidentsPage: React.FC = () => {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  const getStatusIcon = (status: Incident['status']): JSX.Element => {
    switch(status) {
      case 'open':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'investigating':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'resolved':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const IncidentFilters = () => (
    <div className="flex gap-4">
      <Select defaultValue="all">
        <SelectTrigger className="w-[180px] bg-background text-foreground border-border">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent className="bg-popover text-popover-foreground border-border">
          <SelectItem value="all">All Incidents</SelectItem>
          <SelectItem value="open">Open</SelectItem>
          <SelectItem value="investigating">Investigating</SelectItem>
          <SelectItem value="resolved">Resolved</SelectItem>
        </SelectContent>
      </Select>
      
      <Button variant="outline" className="bg-background text-foreground border-border">
        <Calendar className="mr-2 h-4 w-4" />
        Date Range
      </Button>
    </div>
  );

  const getSeverityBadge = (severity: Incident['severity']): JSX.Element => {
    const variants: Record<Incident['severity'], "destructive" | "secondary" | "outline"> = {
      high: "destructive",
      medium: "secondary",
      low: "outline"
    };
    return (
      <Badge variant={variants[severity]}>
        {severity}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Security Incidents</h1>
          <p className="text-muted-foreground">
            Track and manage security incidents and alerts
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] bg-background text-foreground border-border">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Incidents</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="investigating">Investigating</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <Input
          placeholder="Search incidents..."
          className="max-w-sm"
          type="search"
        />
        <Button variant="outline" className="bg-background text-foreground border-border">
          <Calendar className="mr-2 h-4 w-4" />
          Date Range
        </Button>
      </div>

      {/* Incidents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Incidents</CardTitle>
          <CardDescription>
            Overview of all security incidents and their current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incidents.map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell className="font-medium">{incident.id}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger className="text-left hover:underline">
                        {incident.title}
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            {incident.title}
                            {getSeverityBadge(incident.severity)}
                          </DialogTitle>
                          <DialogDescription>
                            {incident.id} - {new Date(incident.timestamp).toLocaleString()}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold mb-2">Details</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Status:</span>
                                  <span className="font-medium">{incident.status}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Assigned To:</span>
                                  <span className="font-medium">{incident.assignedTo}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Source:</span>
                                  <span className="font-medium">{incident.source}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Affected System:</span>
                                  <span className="font-medium">{incident.affectedSystem}</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Description</h4>
                              <p className="text-muted-foreground">{incident.description}</p>
                            </div>
                          </div>
                          
                          <Accordion type="single" collapsible>
                            <AccordionItem value="timeline">
                              <AccordionTrigger>Incident Timeline</AccordionTrigger>
                              <AccordionContent>
                                <div className="space-y-4">
                                  {incident.timeline.map((event, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                      <div className="w-20 text-sm text-muted-foreground">
                                        {event.time}
                                      </div>
                                      <div>
                                        <p className="font-medium">{event.event}</p>
                                        <p className="text-sm text-muted-foreground">By {event.user}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>{incident.type}</TableCell>
                  <TableCell>{getSeverityBadge(incident.severity)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(incident.status)}
                      <span className="capitalize">{incident.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>{incident.assignedTo}</TableCell>
                  <TableCell>{new Date(incident.timestamp).toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Assign</DropdownMenuItem>
                        <DropdownMenuItem>Update Status</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Escalate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncidentsPage;