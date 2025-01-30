import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { UserPlus, Mail, Loader2, X } from 'lucide-react';
import { toast } from "sonner"

const OnboardingButtons = () => {
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [inviteLoading, setInviteLoading] = useState(false);
    const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        mobile: '',
        email: '',
        bio: '',
        insurance: [],
        qualifications: [],
        availability: Array(7).fill([])
    });
    const [inviteEmail, setInviteEmail] = useState('');

    const insuranceOptions = [
        "Blue Cross Blue Shield",
        "Aetna",
        "UnitedHealthcare",
        "Cigna",
        "Medicare",
        "Medicaid"
    ];

    const handleAddTherapist = () => {
        setLoading(true);
        // Simulate loading state
        setTimeout(() => {
            setLoading(false);

        }, 1000);

    };

    const handleInsuranceChange = (e) => {
        const value = e.target.value;
        if (value && !formData.insurance.includes(value)) {
            setFormData({ ...formData, insurance: [...formData.insurance, value] });
            e.target.value = '';
        }
    };

    const removeInsurance = (insurance) => {
        setFormData({ ...formData, insurance: formData.insurance.filter(item => item !== insurance) });
    };

    const handleAvailabilityChange = (dayIndex, selectedOptions) => {
        const newAvailability = [...formData.availability];
        newAvailability[dayIndex] = Array.from(selectedOptions).map(option => option.value);
        setFormData({ ...formData, availability: newAvailability });
    };

    const handleInviteTherapist = () => {
        setInviteLoading(true);
        console.log("Invite sent to:", inviteEmail);
        setTimeout(() => {
            setInviteLoading(false);
            setIsInviteDialogOpen(false);
            setInviteEmail('');
        }, 3000);
    };

    return (
        <div className="flex items-center gap-4 mb-6 mt-2">
            {/* Add Therapist Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button
                        onClick={() => { handleAddTherapist(); setIsDialogOpen(true); }}
                        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <UserPlus className="h-4 w-4" />
                        )}
                        Add Therapist
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg h-[500px] overflow-auto">
                    <DialogHeader>
                        <DialogTitle>Add New Therapist</DialogTitle>
                        <DialogDescription>
                            Fill in the details to manually add a new therapist to your practice.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-4">
                                {['Basic Info', 'Professional', 'Schedule', 'Review'].map((step, index) => (
                                    <div key={step} className="flex items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep > index ? 'bg-blue-600 text-white' :
                                            currentStep === index ? 'bg-blue-100 text-blue-600 border-2 border-blue-600' :
                                                'bg-gray-100 text-gray-400'
                                            }`}>
                                            {currentStep > index ? '✓' : index + 1}
                                        </div>
                                        {index < 3 && (
                                            <div className={`w-24 h-1 ${currentStep > index ? 'bg-blue-600' : 'bg-gray-200'
                                                }`} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <form className="space-y-4">
                            {currentStep === 0 && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Name</label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border rounded-md"
                                                placeholder="Dr. Jane Smith"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Designation/Role</label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border rounded-md"
                                                placeholder="Clinical Psychologist"
                                                value={formData.role}
                                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Mobile Number</label>
                                            <input
                                                type="tel"
                                                className="w-full px-3 py-2 border rounded-md"
                                                placeholder="+1 (555) 000-0000"
                                                value={formData.mobile}
                                                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Email</label>
                                            <input
                                                type="email"
                                                className="w-full px-3 py-2 border rounded-md"
                                                placeholder="jane.smith@example.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 1 && (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Professional Bio</label>
                                        <textarea
                                            className="w-full px-3 py-2 border rounded-md h-24"
                                            placeholder="Enter professional background and expertise..."
                                            value={formData.bio}
                                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Insurance Acceptance</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                list="insuranceOptions"
                                                className="w-full px-3 py-2 border rounded-md"
                                                placeholder="Type to search insurance..."
                                                onChange={handleInsuranceChange}
                                            />
                                            <datalist id="insuranceOptions">
                                                {insuranceOptions.map((option, index) => (
                                                    <option key={index} value={option} />
                                                ))}
                                            </datalist>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {formData.insurance.map((insurance, index) => (
                                                    <div key={index} className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
                                                        <span className="text-sm">{insurance}</span>
                                                        <button type="button" className="text-blue-500 hover:text-blue-700" onClick={() => removeInsurance(insurance)}>
                                                            <X className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Qualifications</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                className="flex-1 px-3 py-2 border rounded-md"
                                                placeholder="Add qualification"
                                                value={formData.qualifications.join(', ')}
                                                onChange={(e) => setFormData({ ...formData, qualifications: e.target.value.split(', ') })}
                                            />
                                            <Button variant="outline" type="button">Add</Button>
                                        </div>
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {formData.qualifications.map((qualification, index) => (
                                                <div key={index} className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
                                                    <span className="text-sm">{qualification}</span>
                                                    <button type="button" className="text-blue-500 hover:text-blue-700">×</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Weekly Availability</label>
                                        <div className="grid grid-cols-7 gap-2 text-center text-sm">
                                            <div>Mon</div>
                                            <div>Tue</div>
                                            <div>Wed</div>
                                            <div>Thu</div>
                                            <div>Fri</div>
                                            <div>Sat</div>
                                            <div>Sun</div>
                                        </div>
                                        <div className="grid grid-cols-7 gap-2">
                                            {Array(7).fill(null).map((_, i) => (
                                                <select key={i} className="w-full px-2 py-1 border rounded-md text-sm" multiple onChange={(e) => handleAvailabilityChange(i, e.target.selectedOptions)}>
                                                    <option value="9:00 AM - 12:00 PM">9:00 AM - 12:00 PM</option>
                                                    <option value="1:00 PM - 5:00 PM">1:00 PM - 5:00 PM</option>
                                                </select>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Review Information</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Name</label>
                                            <p className="text-sm text-gray-600">{formData.name}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Role</label>
                                            <p className="text-sm text-gray-600">{formData.role}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Mobile</label>
                                            <p className="text-sm text-gray-600">{formData.mobile}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Email</label>
                                            <p className="text-sm text-gray-600">{formData.email}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Bio</label>
                                            <p className="text-sm text-gray-600">{formData.bio}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Insurance</label>
                                            <p className="text-sm text-gray-600">{formData.insurance.join(', ')}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Qualifications</label>
                                            <p className="text-sm text-gray-600">{formData.qualifications.join(', ')}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Availability</label>
                                            <div className="grid grid-cols-7 gap-2 text-center text-sm">
                                                {formData.availability.map((day, i) => (
                                                    <div key={i} className="space-y-1">
                                                        <div>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</div>
                                                        <div className="text-xs text-gray-600">{day.join(', ')}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-between pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
                                    disabled={currentStep === 0}
                                >
                                    Back
                                </Button>
                                <div className="flex gap-3">{currentStep === 3 ? (
                                    <Button
                                        type="button"
                                        className="bg-blue-600 hover:bg-blue-700 text-white"
                                        onClick={() => {
                                            toast("Invite sent to the therapist!", {
                                                description: "Sunday, December 03, 2023 at 9:00 AM",
                                                action: {
                                                    label: "Undo",
                                                    onClick: () => console.log("Undo"),
                                                },
                                            })
                                            //TODO: send invite email to therapist
                                            console.log("Therapist added:", formData);
                                            setIsDialogOpen(false);
                                        }}
                                    >
                                        Add Therapist
                                    </Button>
                                ) : (
                                    <Button
                                        type="button"
                                        className="bg-blue-600 hover:bg-blue-700 text-white"
                                        onClick={() => setCurrentStep(currentStep + 1)}
                                    >
                                        Next
                                    </Button>
                                )}
                                </div>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Invite Therapist Dialog */}
            <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="border-blue-200 hover:bg-blue-50 flex items-center gap-2"
                        onClick={() => setIsInviteDialogOpen(true)}
                    >
                        <Mail className="h-4 w-4 text-blue-600" />
                        Invite Therapist
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg h-[500px] overflow-auto">
                    <DialogHeader>
                        <DialogTitle>Invite Therapist via Email</DialogTitle>
                        <DialogDescription>
                            Send an invitation email to a therapist to join your practice.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Therapist's Email</label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="Enter therapist's email"
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                            />
                        </div>
                        <Button
                            type="button"
                            className="bg-blue-600 hover:bg-blue-700 text-white w-full flex items-center justify-center"
                            onClick={handleInviteTherapist}
                            disabled={inviteLoading}
                        >
                            {inviteLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : (
                                <Mail className="h-4 w-4 mr-2" />
                            )}
                            {inviteLoading ? 'Sending...' : 'Send Invite'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default OnboardingButtons;