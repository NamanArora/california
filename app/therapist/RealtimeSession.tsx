"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Play, Pause, Square, Mic, Clock, Calendar } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const RealtimeSession = ({
    isOpen,
    onClose,
    clientName,
    sessionNumber
}: {
    isOpen: boolean;
    onClose: () => void;
    clientName: string;
    sessionNumber: number;
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-6xl h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Realtime Session</DialogTitle>
                </DialogHeader>
                <div className="overflow-y-auto">
                    <RealtimeSessionContent
                        clientName={clientName}
                        sessionNumber={sessionNumber}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};


const RealtimeSessionContent = ({ clientName, sessionNumber }: { clientName: string, sessionNumber: number }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [showProcessing, setShowProcessing] = useState(false);

    const suggestedQuestions = [
        {
            text: "How has your sleep pattern changed since we last met?",
            category: "Communication Skills",
        },
        {
            text: "Can you tell me more about the anxiety you experienced at work?",
            category: "Building Trust",
        },
        {
            text: "What coping strategies have you tried this week?",
            category: "Understanding Emotions",
        },
        {
            text: "How did that situation make you feel?",
            category: "Self confidence",
        }
    ];

    const transcriptData = [
        { speaker: "Therapist", text: "How have you been feeling since our last session?" },
        { speaker: "Client", text: "It's been a mixed week. The work situation has been challenging." },
        { speaker: "Therapist", text: "Tell me more about these challenges at work." },
        { speaker: "Client", text: "Well, the deadlines are getting more intense, and I'm finding myself staying late most days. It's affecting my sleep schedule too." }
    ];

    const handlePlay = () => {
        setIsRecording(true);
        setIsPaused(false);
    };

    const handlePause = () => {
        setIsPaused(true);
    };

    const handleStop = () => {
        setIsRecording(false);
        setIsPaused(false);
        setShowProcessing(true);
        setTimeout(() => {
            setShowProcessing(false);
        }, 3000); // Adjust timing as needed
    };

    const handleResume = () => {
        setIsPaused(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Recording Controls */}
                <Card className="bg-white">
                    <CardContent className="py-6">
                        <div className="flex justify-between items-center">
                            {/* Left: Client Info */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-xl font-semibold text-gray-900">Sarah Johnson</h2>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                        7th Session
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        {isRecording ? (
                                            <span>00:45:30</span>
                                        ) : (
                                            <span>Session duration: 0:00</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>{new Date().toLocaleDateString()}</span>
                                    </div>
                                </div>

                                {/* Recording Status */}
                                {isRecording && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <Mic className={`h-4 w-4 ${!isPaused ? 'text-red-500 animate-pulse' : 'text-gray-500'}`} />
                                        <span className="text-gray-600 font-medium">
                                            {isPaused ? 'Recording Paused' : 'Recording in Progress'}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Right: Audio Visualization and Controls */}
                            <div className="flex items-center gap-4">
                                {/* Audio Visualization */}
                                {isRecording && !isPaused && (
                                    <div className="w-48 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                                        <div className="flex items-center gap-1">
                                            {[...Array(12)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="w-1 bg-blue-500 rounded-full animate-pulse"
                                                    style={{
                                                        height: `${Math.random() * 32 + 8}px`,
                                                        animationDelay: `${i * 0.1}s`
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Controls */}
                                <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-full shadow-sm">
                                    {isRecording ? (
                                        <>
                                            {isPaused ? (
                                                <Button
                                                    onClick={handleResume}
                                                    className="h-12 w-12 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center"
                                                >
                                                    <Play className="h-6 w-6 text-white" />
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={handlePause}
                                                    className="h-12 w-12 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center"
                                                >
                                                    <Pause className="h-6 w-6 text-white" />
                                                </Button>
                                            )}
                                            <Button
                                                onClick={handleStop}
                                                className="h-12 w-12 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center"
                                            >
                                                <Square className="h-6 w-6 text-white" />
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            onClick={handlePlay}
                                            className="h-12 w-12 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center"
                                        >
                                            <Play className="h-6 w-6 text-white" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Main Content Grid */}
                <div className="grid grid-cols-5 gap-6">
                    {/* Suggested Questions - Now wider */}
                    <div className="col-span-3">
                        <Card className="h-[calc(100vh-400px)] overflow-hidden">
                            <CardHeader className="border-b bg-blue-50">
                                <CardTitle className="text-xl text-blue-800">
                                    Suggested Questions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    {suggestedQuestions.map((question, index) => (
                                        <div
                                            key={index}
                                            className={`p-4 rounded-lg border-l-4 bg-gray-50 border-gray-300`}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                                    {question.category}
                                                </span>
                                            </div>
                                            <p className="text-gray-800 text-lg">{question.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Live Transcription - Now narrower */}
                    <div className="col-span-2">
                        <Card className="h-[calc(100vh-400px)] overflow-hidden">
                            <CardHeader className="border-b">
                                <CardTitle>Live Transcription</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="h-full overflow-y-auto p-4 space-y-4">
                                    {transcriptData.map((entry, index) => (
                                        <div
                                            key={index}
                                            className={`flex flex-col space-y-1 ${entry.speaker === "Therapist" ? "items-end" : "items-start"
                                                }`}
                                        >
                                            <span className="text-xs font-medium text-gray-500">
                                                {entry.speaker}
                                            </span>
                                            <div
                                                className={`p-3 rounded-lg max-w-[80%] ${entry.speaker === "Therapist"
                                                    ? "bg-blue-50 text-blue-800"
                                                    : "bg-gray-100 text-gray-800"
                                                    }`}
                                            >
                                                <p>{entry.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Processing Alert */}
                <AlertDialog open={showProcessing}>
                    <AlertDialogContent className="text-center">
                        <AlertDialogTitle className="text-xl font-semibold">
                            Processing Session
                        </AlertDialogTitle>
                        <AlertDialogDescription className="space-y-4">
                            <div className="flex justify-center my-6">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
                            </div>
                            <p className="text-gray-600">
                                AI is analyzing the session and generating progress notes.
                                This may take a few moments...
                            </p>
                        </AlertDialogDescription>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
};

export default RealtimeSession;