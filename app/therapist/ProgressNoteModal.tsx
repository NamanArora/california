import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Check } from 'lucide-react';

interface ProgressNoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    sessionDate?: string;
    editable?: boolean;
}

type NoteFormat = 'SOAP' | 'DAP' | 'BIRP' | 'GIRP';

interface FormatSection {
    title: string;
    content: string;
}

const formatStructures: Record<NoteFormat, FormatSection[]> = {
    'SOAP': [
        { title: 'Subjective', content: 'Client reports experiencing increased anxiety...' },
        { title: 'Objective', content: 'Client exhibited visible signs of tension...' },
        { title: 'Assessment', content: 'Client demonstrates moderate anxiety symptoms...' },
        { title: 'Plan', content: 'Continue weekly sessions focusing on CBT...' }
    ],
    'DAP': [
        { title: 'Data', content: 'Client discussed recent work-related stressors...' },
        { title: 'Assessment', content: 'Client shows progress in implementing coping strategies...' },
        { title: 'Plan', content: 'Next session will focus on developing additional...' }
    ],
    'BIRP': [
        { title: 'Behavior', content: 'Client presented with improved mood...' },
        { title: 'Intervention', content: 'Therapist utilized cognitive restructuring...' },
        { title: 'Response', content: 'Client was receptive to interventions...' },
        { title: 'Plan', content: 'Continue working on anxiety management...' }
    ],
    'GIRP': [
        { title: 'Goal', content: 'Reduce anxiety symptoms in work situations...' },
        { title: 'Intervention', content: 'Implemented progressive muscle relaxation...' },
        { title: 'Response', content: 'Client reported feeling more relaxed...' },
        { title: 'Plan', content: 'Continue practicing relaxation techniques...' }
    ]
};

const ProgressNoteModal: React.FC<ProgressNoteModalProps> = ({
    isOpen,
    onClose,
    sessionDate = new Date().toLocaleDateString(),
    editable = true
}) => {
    const [selectedFormat, setSelectedFormat] = useState<NoteFormat>('SOAP');
    const [sections, setSections] = useState<FormatSection[]>(formatStructures['SOAP']);
    const [personalNotes, setPersonalNotes] = useState('');
    const [isEdited, setIsEdited] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveComplete, setSaveComplete] = useState(false);

    useEffect(() => {
        setSections(formatStructures[selectedFormat]);
    }, [selectedFormat]);

    const handleSectionChange = (index: number, newContent: string) => {
        if (!editable) return;
        
        const newSections = [...sections];
        newSections[index] = { ...newSections[index], content: newContent };
        setSections(newSections);
        setIsEdited(true);
        setSaveComplete(false);
    };

    const handleSave = () => {
        setIsSaving(true);
        
        // Simulate API call
        setTimeout(() => {
            console.log('Saving progress note:', {
                format: selectedFormat,
                sections,
                personalNotes
            });
            setIsSaving(false);
            setSaveComplete(true);
            setIsEdited(false);
            
            // Reset save complete state after 2 seconds
            setTimeout(() => {
                setSaveComplete(false);
            }, 2000);
        }, 1000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                <DialogHeader className="border-b pb-4 flex flex-row items-center justify-between">
                    <div className="flex-1">
                        <DialogTitle className="text-2xl">Progress Notes</DialogTitle>
                        <p className="text-gray-500 mt-2 text-sm">
                            This progress note has been automatically generated based on your session 
                            on {sessionDate}. {editable && 'You can edit any section to customize the content.'}
                        </p>
                    </div>
                    {editable && (
                        <Button 
                            onClick={handleSave}
                            disabled={!isEdited || isSaving}
                            className={`ml-4 relative ${saveComplete ? 'bg-green-600 hover:bg-green-700' : ''} transition-colors duration-200`}
                        >
                            <div className="flex items-center">
                                {!isSaving && !saveComplete && (
                                    <>
                                        <Save className="h-4 w-4 mr-2" />
                                        <span>Save Changes</span>
                                    </>
                                )}
                                {isSaving && (
                                    <div className="flex items-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                        <span>Saving...</span>
                                    </div>
                                )}
                                {saveComplete && (
                                    <>
                                        <Check className="h-4 w-4 mr-2" />
                                        <span>Saved!</span>
                                    </>
                                )}
                            </div>
                        </Button>
                    )}
                </DialogHeader>

                <div className="flex-1 overflow-y-auto py-4">
                    <div className="space-y-6">
                        {/* Format Selector */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Report Format
                            </label>
                            <Select
                                value={selectedFormat}
                                onValueChange={(value) => setSelectedFormat(value as NoteFormat)}
                                disabled={!editable}
                            >
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Select format" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="SOAP">SOAP Format</SelectItem>
                                    <SelectItem value="DAP">DAP Format</SelectItem>
                                    <SelectItem value="BIRP">BIRP Format</SelectItem>
                                    <SelectItem value="GIRP">GIRP Format</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Report Sections */}
                        <div className="space-y-6">
                            {sections.map((section, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitle className="text-lg text-blue-700">
                                            {section.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Textarea
                                            value={section.content}
                                            onChange={(e) => handleSectionChange(index, e.target.value)}
                                            className={`min-h-[100px] resize-none ${!editable ? 'bg-gray-50' : ''}`}
                                            readOnly={!editable}
                                        />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Personal Notes Section */}
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle className="text-lg text-blue-700">
                                    My Notes
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Textarea
                                    placeholder={editable ? "Add your personal notes about the session here..." : "No personal notes added"}
                                    value={personalNotes}
                                    onChange={(e) => {
                                        if (!editable) return;
                                        setPersonalNotes(e.target.value);
                                        setIsEdited(true);
                                        setSaveComplete(false);
                                    }}
                                    className={`min-h-[150px] resize-none ${!editable ? 'bg-gray-50' : ''}`}
                                    readOnly={!editable}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProgressNoteModal;