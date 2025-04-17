"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Shield, CheckCircle, Info } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  dob: string;
  planName: string;
  memberId: string;
  groupId: string;
  eapId: string;
}

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  dob?: string;
  planName?: string;
  memberId?: string;
}

const InsuranceForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    dob: '',
    planName: '',
    memberId: '',
    groupId: '',
    eapId: '',
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.dob.trim()) newErrors.dob = 'Date of birth is required';
    if (!formData.planName.trim()) newErrors.planName = 'Plan name is required';
    if (!formData.memberId.trim()) newErrors.memberId = 'Member ID is required';

    // Validate email format
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate DOB format (MM/DD/YYYY)
    if (formData.dob && !/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/.test(formData.dob)) {
      newErrors.dob = 'Please use MM/DD/YYYY format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // This would be replaced with actual Google Sheets submission
        // using something like:
        /*
        await fetch('YOUR_GOOGLE_SHEETS_URL', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        */

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSuccess(true);
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="w-full max-w-xl mx-auto mt-8">
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">Thank You!</CardTitle>
              <CardDescription className="text-center">
                Your insurance information has been submitted successfully.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pb-8">
              <p className="mb-6 text-gray-600">
                Someone from our team will verify your information and get back to you within 48 hours. We appreciate your patience as we work to optimize your insurance benefits.
              </p>
              <p className="text-gray-600">
                If you have any urgent questions, please contact our support team at{' '}
                <span className="font-medium">contact@therawin.health</span>
              </p>
            </CardContent>
            <CardFooter className="flex justify-center pb-8">
              <Button
                onClick={() => (window.location.href = 'https://therawin.health/')}
                className="px-6"
              >
                Go to Homepage
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="w-full max-w-xl mx-auto">
        {/* Logo and Branding */}
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-blue-800">Therawin</h1>
        </div>

        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">Insurance Information</CardTitle>
            <CardDescription>
              Let us help you maximize your insurance benefits. Please provide your insurance details below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6 bg-blue-50 text-blue-800 border-blue-200">
              <Info className="h-4 w-4" />
              <AlertDescription>
                Your information is secure and will only be used to verify your insurance coverage. Required fields are marked with an asterisk (*).
              </AlertDescription>
            </Alert>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="firstName" className="mb-1 block">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? 'border-red-500' : ''}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="lastName" className="mb-1 block">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? 'border-red-500' : ''}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <Label htmlFor="email" className="mb-1 block">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="mb-4">
                <Label htmlFor="address" className="mb-1 block">
                  Home Address <span className="text-gray-500">(optional)</span>
                </Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Enter your full address"
                  value={formData.address}
                  onChange={handleChange}
                />
                <p className="text-gray-500 text-sm mt-1">Including this helps with verification</p>
              </div>

              <div className="mb-4">
                <Label htmlFor="dob" className="mb-1 block">
                  Date of Birth <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="dob"
                  name="dob"
                  placeholder="MM/DD/YYYY"
                  value={formData.dob}
                  onChange={handleChange}
                  className={errors.dob ? 'border-red-500' : ''}
                />
                {errors.dob ? (
                  <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
                ) : (
                  <p className="text-gray-500 text-sm mt-1">Format: MM/DD/YYYY</p>
                )}
              </div>

              <div className="mb-6 border-t pt-6">
                <h3 className="font-medium text-lg mb-4">Insurance Details</h3>

                <div className="mb-4">
                  <Label htmlFor="planName" className="mb-1 block">
                    Insurance Plan Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="planName"
                    name="planName"
                    placeholder="e.g. Aetna Choice POS II, Blue Cross PPO"
                    value={formData.planName}
                    onChange={handleChange}
                    className={errors.planName ? 'border-red-500' : ''}
                  />
                  {errors.planName && (
                    <p className="text-red-500 text-sm mt-1">{errors.planName}</p>
                  )}
                </div>

                <div className="mb-4">
                  <Label htmlFor="memberId" className="mb-1 block">
                    Member ID <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="memberId"
                    name="memberId"
                    placeholder="Enter your member ID number"
                    value={formData.memberId}
                    onChange={handleChange}
                    className={errors.memberId ? 'border-red-500' : ''}
                  />
                  {errors.memberId ? (
                    <p className="text-red-500 text-sm mt-1">{errors.memberId}</p>
                  ) : (
                    <p className="text-gray-500 text-sm mt-1">
                      Usually found on the front of your insurance card
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="groupId" className="mb-1 block">
                      Group ID <span className="text-gray-500">(optional)</span>
                    </Label>
                    <Input
                      id="groupId"
                      name="groupId"
                      placeholder="Enter group ID if available"
                      value={formData.groupId}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="eapId" className="mb-1 block">
                      EAP ID <span className="text-gray-500">(optional)</span>
                    </Label>
                    <Input
                      id="eapId"
                      name="eapId"
                      placeholder="Enter EAP ID if applicable"
                      value={formData.eapId}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-2 w-full md:w-auto"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Insurance Information'}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col text-center text-gray-500 text-sm">
            <p className="mb-2">Your privacy is important to us. We adhere to HIPAA guidelines.</p>
            <p>Questions? Contact us at contact@therawin.health</p>
          </CardFooter>
        </Card>

        <div className="mb-8">
          <h3 className="font-medium text-lg mb-3">How to Find Your Insurance Information</h3>
          <p className="text-gray-600 mb-3">
            Most of the information we're requesting can be found on your insurance card. The Member ID is
            typically on the front, while Group ID may be on the back.
          </p>
          <p className="text-gray-600">
            If you're using Employee Assistance Program (EAP) benefits, your EAP ID will be provided by your
            employer or can be found on your EAP documentation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsuranceForm;