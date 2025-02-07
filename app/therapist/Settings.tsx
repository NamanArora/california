import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Loader2, Save, Plus } from 'lucide-react';
import { toast } from "sonner";

interface UserSettings {
    name: string;
    bio: string;
    designation: string;
    qualifications: string[];
}

const SettingsPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [settings, setSettings] = useState<UserSettings>({
        name: '',
        bio: '',
        designation: '',
        qualifications: ['']
    });
    const [errors, setErrors] = useState<Partial<UserSettings>>({});

    const validateForm = (): boolean => {
        const newErrors: Partial<UserSettings> = {};

        if (!settings.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!settings.designation.trim()) {
            newErrors.designation = "Designation is required";
        }

        if (!settings.bio.trim()) {
            newErrors.bio = "Bio is required";
        }

        if (settings.qualifications.some(q => !q.trim())) {
            newErrors.qualifications =[ "All qualifications must be filled"];
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateForm()) {
            toast("Please fill in all required fields", {
                description: "Some fields are missing or invalid",
                duration: 3000,
            });
            return;
        }

        setIsLoading(true);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            toast("Settings saved successfully!", {
                description: "Your profile has been updated",
                duration: 3000,
            });
        } catch (error) {
            toast("Failed to save settings", {
                description: "Please try again later",
                duration: 3000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const addQualification = () => {
        setSettings(prev => ({
            ...prev,
            qualifications: [...prev.qualifications, '']
        }));
    };

    const removeQualification = (index: number) => {
        if (settings.qualifications.length > 1) {
            setSettings(prev => ({
                ...prev,
                qualifications: prev.qualifications.filter((_, i) => i !== index)
            }));
        }
    };

    const updateQualification = (index: number, value: string) => {
        setSettings(prev => ({
            ...prev,
            qualifications: prev.qualifications.map((q, i) => i === index ? value : q)
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-3xl mx-auto space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                    <p className="text-gray-600 mt-1">Manage your profile settings</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Name Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Name
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <Input
                                placeholder="Enter your full name"
                                value={settings.name}
                                onChange={(e) => setSettings(prev => ({ ...prev, name: e.target.value }))}
                                className={errors.name ? "border-red-500" : ""}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name}</p>
                            )}
                        </div>

                        {/* Bio Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Bio
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <Textarea
                                placeholder="Tell us about yourself"
                                value={settings.bio}
                                onChange={(e) => setSettings(prev => ({ ...prev, bio: e.target.value }))}
                                className={`min-h-[100px] ${errors.bio ? "border-red-500" : ""}`}
                            />
                            {errors.bio && (
                                <p className="text-sm text-red-500">{errors.bio}</p>
                            )}
                        </div>

                        {/* Designation Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Designation
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <Input
                                placeholder="Enter your designation"
                                value={settings.designation}
                                onChange={(e) => setSettings(prev => ({ ...prev, designation: e.target.value }))}
                                className={errors.designation ? "border-red-500" : ""}
                            />
                            {errors.designation && (
                                <p className="text-sm text-red-500">{errors.designation}</p>
                            )}
                        </div>

                        {/* Qualifications Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Qualifications
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="space-y-3">
                                {settings.qualifications.map((qualification, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            placeholder="Enter qualification"
                                            value={qualification}
                                            onChange={(e) => updateQualification(index, e.target.value)}
                                            className={errors.qualifications ? "border-red-500" : ""}
                                        />
                                        {settings.qualifications.length > 1 && (
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => removeQualification(index)}
                                                className="shrink-0"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button
                                    variant="outline"
                                    onClick={addQualification}
                                    className="w-full border-dashed"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Qualification
                                </Button>
                                {errors.qualifications && (
                                    <p className="text-sm text-red-500">{errors.qualifications}</p>
                                )}
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="pt-4">
                            <Button
                                onClick={handleSave}
                                className="w-full sm:w-auto"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4 mr-2" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SettingsPage;