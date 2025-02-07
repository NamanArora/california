interface Client {
    name: string;
    since: string;
    lastSession: string;
    email: string;
    concerns: string[];
    notes: string;
}

interface Note {
    date: string;
    text: string;
}

interface Session {
    date: string;
    type: "zoom" | "realtime";
    duration: string;
    topics: string[];
    status: string;
    recording: boolean;
}

interface RealtimeSessionProps {
    isOpen: boolean;
    onClose: () => void;
    clientName: string;
    sessionNumber: number;
}

"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
    Mail,
    Calendar,
    Clock,
    Video,
    FileText,
    Brain,
    ExternalLink,
    Plus,
    MessageCircle,
    BarChart2,
    AlertTriangle,
    Target,
    Laptop,
    Mic,
    Play,
    Users,
} from 'lucide-react';
import RealtimeSession from './RealtimeSession';
import { useRouter } from 'next/navigation';
import ZoomSessionDialog from './ZoomSessionDialog';
import ProgressNoteModal from './ProgressNoteModal';

const ClientDetailsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('activity');
    const [showNoteDialog, setShowNoteDialog] = useState(false);
    const [showRecordingDialog, setShowRecordingDialog] = useState(false);
    const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
    const [selectedRecording, setSelectedRecording] = useState<Session | null>(null);
    const [showZoomDialog, setShowZoomDialog] = useState(false);
    const [showProgressNoteDialog, setShowProgressNoteDialog] = useState(false);
    const [isProgressNoteEditable, setIsProgressNoteEditable] = useState(true);
    const router = useRouter();

    const client: Client = {
        name: "Sarah Johnson",
        since: "Oct 15, 2023",
        lastSession: "Jan 25, 2024",
        email: "sarah.j@email.com",
        concerns: ["Anxiety", "Work Stress", "Sleep Issues"],
        notes: "Client has shown improvement in managing work-related anxiety but continues to experience sleep disturbances.",
    };

    const notes: Note[] = [
        {
            date: "Jan 25, 2024",
            text: "Client reported improved sleep patterns after implementing evening routine. Discussed workplace boundaries.",
        },
        {
            date: "Jan 18, 2024",
            text: "Focused on stress management techniques. Client is receptive to mindfulness exercises.",
        },
    ];

    const SessionTypeIcon: React.FC<{ type: string }> = ({ type }) => {
        if (type.toLowerCase() === "zoom") {
            return <Laptop className="h-5 w-5 text-purple-500" />;
        }
        return <Users className="h-5 w-5 text-blue-500" />;
    };

    const SessionTypeLabel: React.FC<{ type: string }> = ({ type }) => {
        const styles = type.toLowerCase() === "zoom"
            ? "bg-purple-100 text-purple-800"
            : "bg-blue-100 text-blue-800";
        return (
            <span className={`px-2 py-1 rounded-md text-xs font-medium ${styles}`}>
                {type === "zoom" ? "Zoom Session" : "In-person Session"}
            </span>
        );
    };

    const handleOpenProgressNote = (editable: boolean) => {
        setIsProgressNoteEditable(editable);
        setShowProgressNoteDialog(true);
    };

    const sessions: Session[] = [
        {
            date: "Jan 25, 2024",
            type: "zoom",
            duration: "50 mins",
            topics: ["Anxiety", "Sleep"],
            status: "In Progress",
            recording: true,
        },
        {
            date: "Jan 18, 2024",
            type: "realtime",
            duration: "55 mins",
            topics: ["Work Stress"],
            status: "Completed",
            recording: true,
        },
    ];


    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
                    <div className="flex gap-6 mt-2 text-gray-600">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Connected since: {client.since}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>Last session: {client.lastSession}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <span>{client.email}</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => router.push(`/456/analytics`)}
                    >
                        <BarChart2 className="h-4 w-4" />
                        Analytics
                    </Button>
                    <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => setShowZoomDialog(true)}
                    >
                        <Video className="h-4 w-4" />
                        Zoom Session
                    </Button>
                    <Button
                        className="flex items-center gap-2"
                        onClick={() => setIsSessionModalOpen(true)}
                    >
                        <MessageCircle className="h-4 w-4" />
                        Start Realtime Session
                    </Button>
                </div>
            </div>
            <div className="space-y-4 mb-6">
                <div className="flex gap-2 flex-wrap items-center">
                    {client.concerns.map((c, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-50 text-gray-700 border border-gray-200 rounded-full text-sm">
                            {c}
                        </span>
                    ))}
                    <Button variant="ghost" size="sm" className="rounded-full h-8">
                        <Plus className="h-4 w-4 text-gray-500" />
                    </Button>
                </div>

            </div>
            {/* Main Tabs */}
            <Tabs defaultValue="activity" className="w-full" value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="prep">Preparation</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="progress">Progress Notes</TabsTrigger>
                    <TabsTrigger value="recordings">Recordings</TabsTrigger>
                </TabsList>

                {/* Activity Tab */}
                <TabsContent value="activity">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Session History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {sessions.map((s, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <SessionTypeIcon type={s.type} />
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">{s.date}</span>
                                                    <SessionTypeLabel type={s.type} />
                                                    {s.status === 'In Progress' && (
                                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                                            In Progress
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-sm text-gray-600">{s.duration}</span>
                                                {s.topics.length > 0 && (
                                                    <div className="flex gap-2 mt-1">
                                                        {s.topics.map((topic, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                                                            >
                                                                {topic}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            disabled={s.status === 'In Progress'}
                                        >
                                            {s.status === 'In Progress' ? 'Processing...' : 'View Details'}
                                        </Button>
                                    </div>
                                ))}

                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Progress Notes Tab */}
                <TabsContent value="progress" className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Progress Notes</h2>
                        <Button onClick={() => handleOpenProgressNote(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            New Note
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {notes.map((note, i) => (
                            <Card
                                key={i}
                                className="cursor-pointer hover:shadow-md transition-shadow"
                                onClick={() => handleOpenProgressNote(false)}
                            >
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FileText className="h-4 w-4 text-blue-500" />
                                        <span className="font-medium">{note.date}</span>
                                    </div>
                                    <p className="text-gray-700">{note.text}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* Transcripts Tab */}
                <TabsContent value="recordings">
                    <Card>
                        <CardHeader>
                            <CardTitle>Session Recordings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {sessions.map((session, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => {
                                            setSelectedRecording(session);
                                            setShowRecordingDialog(true);
                                        }}
                                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            {session.type === "zoom" ? (
                                                <Video className="h-5 w-5 text-purple-500" />
                                            ) : (
                                                <Mic className="h-5 w-5 text-blue-500" />
                                            )}
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">{session.date}</span>
                                                    <SessionTypeLabel type={session.type} />
                                                </div>
                                                <span className="text-sm text-gray-600">{session.duration}</span>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm">
                                            <Play className="h-4 w-4 mr-2" />
                                            Play Recording
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Preparation Tab */}
                <TabsContent value="prep">
                    <div className="grid gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Brain className="h-5 w-5 text-blue-500" />
                                    Session Focus
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-medium mb-2">Previous Session Follow-up</h3>
                                        <ul className="space-y-2">
                                            <li className="flex items-start gap-2">
                                                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                                                <span>Review homework: Daily anxiety tracking log</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                                                <span>Check progress with breathing exercises practice</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-medium mb-2">Client Concerns to Address</h3>
                                        <ul className="space-y-2">
                                            <li className="flex items-start gap-2">
                                                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                                                <span>Explore resistance to mindfulness - what's not working?</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                                                <span>Process recent panic attack at work meeting</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-medium mb-2">Materials to Review</h3>
                                        <ul className="space-y-2">
                                            <li className="flex items-start gap-2">
                                                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                                                <span>Anxiety assessment scores from last 3 weeks</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                                                <span>Sleep log patterns and trends</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                                    Clinical Assessment
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-medium mb-2">Risk Assessment</h3>
                                        <ul className="space-y-2">
                                            <li className="flex items-start gap-2">
                                                <div className="h-2 w-2 rounded-full bg-amber-500 mt-2" />
                                                <span>Monitor medication adherence - reported missing doses</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="h-2 w-2 rounded-full bg-amber-500 mt-2" />
                                                <span>Check suicidal ideation - passive thoughts last session</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-medium mb-2">Current Stressors</h3>
                                        <ul className="space-y-2">
                                            <li className="flex items-start gap-2">
                                                <div className="h-2 w-2 rounded-full bg-amber-500 mt-2" />
                                                <span>Upcoming performance review causing heightened anxiety</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="h-2 w-2 rounded-full bg-amber-500 mt-2" />
                                                <span>Financial strain from medical bills</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Target className="h-5 w-5 text-blue-500" />
                                    Treatment Direction
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-medium mb-2">Session Objectives</h3>
                                        <ul className="space-y-2">
                                            <li className="flex items-start gap-2">
                                                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                                                <span>Practice grounding technique for panic attacks</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                                                <span>Work on cognitive restructuring of work-related thoughts</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-medium mb-2">Therapeutic Approach</h3>
                                        <ul className="space-y-2">
                                            <li className="flex items-start gap-2">
                                                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                                                <span>Continue CBT with focus on automatic thoughts</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                                                <span>Consider introducing exposure hierarchy for work anxiety</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>

            <ProgressNoteModal
                isOpen={showProgressNoteDialog}
                onClose={() => setShowProgressNoteDialog(false)}
                editable={isProgressNoteEditable}
                sessionDate={isProgressNoteEditable ? undefined : "January 25, 2024"} // Example date for existing note
            />

            <ZoomSessionDialog
                isOpen={showZoomDialog}
                onClose={() => setShowZoomDialog(false)}
                onStartSession={() => { return new Promise(() => { }) }}
            />


            {/* Recording Dialog */}
            <Dialog open={showRecordingDialog} onOpenChange={setShowRecordingDialog}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Session Recording - {selectedRecording?.date}</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recording</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                                    {selectedRecording?.type === "zoom" ? (
                                        <Video className="h-12 w-12 text-gray-400" />
                                    ) : (
                                        <Mic className="h-12 w-12 text-gray-400" />
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Transcript</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </DialogContent>
            </Dialog>

            {/* New Note Dialog */}
            <Dialog open={showNoteDialog} onOpenChange={setShowNoteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Progress Note</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Textarea
                            placeholder="Enter your progress note here..."
                            className="min-h-[200px]"
                        />
                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setShowNoteDialog(false)}>
                                Cancel
                            </Button>
                            <Button onClick={() => setShowNoteDialog(false)}>Save Note</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <RealtimeSession
                isOpen={isSessionModalOpen}
                onClose={() => setIsSessionModalOpen(false)}
                clientName="Sarah Johnson"
                sessionNumber={7}
            />
        </div>
    );
};

export default ClientDetailsPage;