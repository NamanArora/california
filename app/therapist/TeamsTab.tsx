import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    BarChart,
    Users,
    BookOpen,
    TrendingUp,
    AlertCircle,
    Info,
    DollarSign,
    Clock,
    UserCheck,
    Star,
    Mail,
    Phone,
    Calendar,
    Award,
    Shield
} from 'lucide-react';
import OnboardingButtons from './OnboardingButtons';

// Types
interface TherapistClient {
    id: number;
    name: string;
    startDate: string;
}

interface Therapist {
    id: number;
    name: string;
    image: string;
    role: string;
    email: string;
    phone: string;
    bio: string;
    qualifications: string[];
    specialties: string[];
    languages: string[];
    insuranceAccepted: string[];
    activeClients: TherapistClient[];
    revenuePerSession: number;
    clientRetentionRate: number;
    averageSessionsPerWeek: number;
    utilizationRate: number;
    clientSatisfactionScore: number;
    treatmentPlanAdherence: number;
    clientProgressRate: number;
    availableSlots: string[];
}

type TabValue = 'clients' | 'performance' | 'business' | 'availability';

const TeamsTab: React.FC = () => {
    const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);

    const therapists: Therapist[] = [
        {
            id: 1,
            name: "Dr. Sarah Johnson",
            image: "/api/placeholder/150/150",
            role: "Senior Clinical Psychologist",
            email: "sarah.johnson@therapy.com",
            phone: "(555) 123-4567",
            bio: "Dr. Johnson specializes in cognitive behavioral therapy with over 10 years of experience treating anxiety, depression, and trauma. She takes a holistic approach to mental health, incorporating mindfulness and evidence-based practices.",
            qualifications: [
                "Ph.D. in Clinical Psychology, Stanford University",
                "Licensed Clinical Psychologist",
                "Certified CBT Practitioner",
                "Trauma-Informed Care Certification"
            ],
            specialties: ["Anxiety", "Depression", "Trauma", "PTSD"],
            languages: ["English", "Spanish"],
            insuranceAccepted: [
                "Blue Cross Blue Shield",
                "Aetna",
                "United Healthcare",
                "Cigna"
            ],
            activeClients: [
                { id: 1, name: "Alex Thompson", startDate: "2023-09-15" },
                { id: 2, name: "Maria Garcia", startDate: "2023-10-01" },
                { id: 3, name: "James Wilson", startDate: "2023-11-20" }
            ],
            revenuePerSession: 150,
            clientRetentionRate: 85,
            averageSessionsPerWeek: 25,
            utilizationRate: 92,
            clientSatisfactionScore: 4.8,
            treatmentPlanAdherence: 94,
            clientProgressRate: 88,
            availableSlots: ["Monday 2-6 PM", "Wednesday 9-12 AM", "Friday 1-5 PM"]
        }
    ];

    const handleTherapistSelect = (value: string): void => {
        const therapist = therapists.find(t => t.id.toString() === value) || null;
        setSelectedTherapist(therapist);
    };

    const renderClientsList = (therapist: Therapist) => (
        <Card>
            <CardHeader>
                <CardTitle>Active Clients ({therapist.activeClients.length})</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="divide-y">
                    {therapist.activeClients.map((client) => (
                        <div key={client.id} className="py-3 flex justify-between">
                            <span className="font-medium">{client.name}</span>
                            <span className="text-gray-600">Since {client.startDate}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );

    const renderPerformanceMetrics = (therapist: Therapist) => (
        <div className="grid grid-cols-3 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-medium flex items-center">
                        <Star className="w-5 h-5 mr-2 text-blue-600" />
                        Client Satisfaction
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="w-4 h-4 ml-2 text-gray-400" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    Average rating from client feedback forms (out of 5)
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-blue-600">
                        {therapist.clientSatisfactionScore}/5
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const renderAvailability = (therapist: Therapist) => (
        <Card>
            <CardHeader>
                <CardTitle>Available Time Slots</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {therapist.availableSlots.map((slot, index) => (
                        <div key={index} className="flex items-center text-gray-700">
                            <Clock className="w-4 h-4 mr-2 text-blue-600" />
                            {slot}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <OnboardingButtons />
                <div className="w-72 mb-6">
                    <Select onValueChange={handleTherapistSelect}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a therapist" />
                        </SelectTrigger>
                        <SelectContent>
                            {therapists.map((therapist) => (
                                <SelectItem key={therapist.id} value={therapist.id.toString()}>
                                    {therapist.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {selectedTherapist ? (
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <div className="flex items-start gap-6">
                                <img
                                    src={selectedTherapist.image}
                                    alt={selectedTherapist.name}
                                    className="w-32 h-32 rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <div>
                                            <h1 className="text-2xl font-semibold text-gray-900">
                                                {selectedTherapist.name}
                                            </h1>
                                            <p className="text-gray-600">{selectedTherapist.role}</p>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex items-center text-gray-600">
                                                <Mail className="w-4 h-4 mr-2" />
                                                {selectedTherapist.email}
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Phone className="w-4 h-4 mr-2" />
                                                {selectedTherapist.phone}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-gray-700">{selectedTherapist.bio}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Award className="w-5 h-5 mr-2 text-blue-600" />
                                        Qualifications
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {selectedTherapist.qualifications.map((qual, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="text-blue-600 mr-2">•</span>
                                                {qual}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Shield className="w-5 h-5 mr-2 text-green-600" />
                                        Insurance Accepted
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {selectedTherapist.insuranceAccepted.map((insurance, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="text-green-600 mr-2">•</span>
                                                {insurance}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>

                        <Tabs defaultValue="clients" className="w-full">
                            <TabsList className="bg-white">
                                <TabsTrigger value="clients">
                                    <Users className="w-4 h-4 mr-2" />
                                    Active Clients
                                </TabsTrigger>
                                <TabsTrigger value="performance">
                                    <BarChart className="w-4 h-4 mr-2" />
                                    Performance
                                </TabsTrigger>
                                <TabsTrigger value="business">
                                    <DollarSign className="w-4 h-4 mr-2" />
                                    Business Metrics
                                </TabsTrigger>
                                <TabsTrigger value="availability">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Availability
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="clients">
                                {renderClientsList(selectedTherapist)}
                            </TabsContent>

                            <TabsContent value="performance">
                                {renderPerformanceMetrics(selectedTherapist)}
                            </TabsContent>

                            <TabsContent value="business">
                                <div className="grid grid-cols-3 gap-6">
                                    {/* Business metrics... */}
                                </div>
                            </TabsContent>

                            <TabsContent value="availability">
                                {renderAvailability(selectedTherapist)}
                            </TabsContent>
                        </Tabs>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-64 bg-white rounded-lg p-8">
                        <p className="text-gray-500">Select a therapist to view their profile</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeamsTab;