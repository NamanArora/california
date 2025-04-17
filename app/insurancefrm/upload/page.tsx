"use client"
import React, { useState } from 'react';
import { Shield, Upload, X, CheckCircle, ArrowLeft, Camera, Info } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Define TypeScript interfaces
interface Errors {
  name?: string;
  email?: string;
  frontCard?: string;
  backCard?: string;
}

interface ImageUploadBoxProps {
  side: 'front' | 'back';
  image: File | null;
  preview: string | null;
  error?: string;
}

const InsuranceCardUpload: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [frontCard, setFrontCard] = useState<File | null>(null);
  const [backCard, setBackCard] = useState<File | null>(null);
  const [frontCardPreview, setFrontCardPreview] = useState<string | null>(null);
  const [backCardPreview, setBackCardPreview] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  
  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!frontCard) newErrors.frontCard = 'Front card image is required';
    if (!backCard) newErrors.backCard = 'Back card image is required';
    
    // Validate email format
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, side: 'front' | 'back'): void => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Check file type
    if (!file.type.match('image.*')) {
      setErrors(prev => ({
        ...prev,
        [side === 'front' ? 'frontCard' : 'backCard']: 'Please upload an image file (JPEG, PNG, etc.)'
      }));
      return;
    }
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        [side === 'front' ? 'frontCard' : 'backCard']: 'File size should be less than 10MB'
      }));
      return;
    }
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      if (side === 'front') {
        setFrontCard(file);
        setFrontCardPreview(result);
        setErrors(prev => ({ ...prev, frontCard: undefined }));
      } else {
        setBackCard(file);
        setBackCardPreview(result);
        setErrors(prev => ({ ...prev, backCard: undefined }));
      }
    };
    reader.readAsDataURL(file);
  };
  
  const clearImage = (side: 'front' | 'back'): void => {
    if (side === 'front') {
      setFrontCard(null);
      setFrontCardPreview(null);
    } else {
      setBackCard(null);
      setBackCardPreview(null);
    }
  };

  const renderThankYouPage = (): JSX.Element => {
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
                If you have any urgent questions, please contact our support team at <span className="font-medium">contact@therawin.health</span>
              </p>
            </CardContent>
            <CardFooter className="flex justify-center pb-8">
              <Button 
                onClick={() => window.location.href = 'https://therawin.health/'}
                className="px-6"
              >
                Go to Homepage
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  };
  
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsUploading(true);
      
      // Simulate upload process
      setTimeout(() => {
        setIsUploading(false);
        setIsSuccess(true);
        // Alternatively, navigate to a dedicated thank you page
        // window.location.href = '/insurancefrm/thanks';
      }, 2000);
    }
  };
  
  const nextStep = (): void => {
    if (step === 1 && !frontCard) {
      setErrors(prev => ({ ...prev, frontCard: 'Please upload the front of your insurance card' }));
      return;
    }
    
    if (step === 2 && !backCard) {
      setErrors(prev => ({ ...prev, backCard: 'Please upload the back of your insurance card' }));
      return;
    }
    
    setStep(step + 1);
  };
  
  const prevStep = (): void => {
    setStep(step - 1);
  };
  
  const ImageUploadBox: React.FC<ImageUploadBoxProps> = ({ side, image, preview, error }) => (
    <div className="w-full">
      <div 
        className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center h-64 bg-gray-50 relative cursor-pointer hover:bg-gray-100 transition-colors ${error ? 'border-red-400' : 'border-gray-300'}`}
        onClick={() => document.getElementById(`file-${side}`)?.click()}
      >
        {preview ? (
          <div className="relative w-full h-full">
            <img 
              src={preview} 
              alt={`${side} of insurance card`} 
              className="object-contain w-full h-full" 
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearImage(side);
              }}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        ) : (
          <>
            <Camera className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-gray-500 text-center mb-2">
              {side === 'front' ? 'Upload front of your insurance card' : 'Upload back of your insurance card'}
            </p>
            <p className="text-gray-400 text-sm text-center">
              Click or drag and drop your image here
            </p>
            <p className="text-gray-400 text-xs mt-2 text-center">
              JPEG, PNG, or GIF • Max 10MB
            </p>
          </>
        )}
        <input
          type="file"
          id={`file-${side}`}
          accept="image/*"
          onChange={(e) => handleFileChange(e, side)}
          className="hidden"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
  
  const renderStepContent = (): JSX.Element => {
    switch (step) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-xl">Step 1: Upload Front of Card</CardTitle>
              <CardDescription>
                Upload a clear photo of the front of your insurance card
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6 bg-blue-50 text-blue-800 border-blue-200">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Make sure the image clearly shows your name, member ID, and insurance company logo.
                </AlertDescription>
              </Alert>
              
              <div className="mb-4">
                <ImageUploadBox 
                  side="front" 
                  image={frontCard}
                  preview={frontCardPreview}
                  error={errors.frontCard}
                />
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium text-gray-800 mb-2">Tips for a good photo:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-700 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                    <span>Take the photo in good lighting</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-700 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                    <span>Ensure all text is clearly visible</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-700 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                    <span>Avoid shadows and glare</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                onClick={() => window.location.href = '/insurancefrm'}
                variant="outline"
                className="text-gray-600"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                onClick={nextStep}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Next Step
              </Button>
            </CardFooter>
          </>
        );
      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-xl">Step 2: Upload Back of Card</CardTitle>
              <CardDescription>
                Upload a clear photo of the back of your insurance card
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6 bg-blue-50 text-blue-800 border-blue-200">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  The back often contains important contact numbers and additional policy information.
                </AlertDescription>
              </Alert>
              
              <div className="mb-4">
                <ImageUploadBox 
                  side="back" 
                  image={backCard}
                  preview={backCardPreview}
                  error={errors.backCard}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                onClick={prevStep}
                variant="outline"
                className="text-gray-600"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Step
              </Button>
              <Button 
                onClick={nextStep}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Next Step
              </Button>
            </CardFooter>
          </>
        );
      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-xl">Step 3: Your Contact Information</CardTitle>
              <CardDescription>
                Please provide your contact details so we can reach you about your coverage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <Label htmlFor="name" className="mb-1 block">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="email" className="mb-1 block">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                  <p className="text-gray-500 text-sm mt-1">We'll send you updates about your insurance verification</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">Review Your Uploads:</h4>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Front of Card:</p>
                      <div className="border rounded-lg h-28 bg-white overflow-hidden">
                        {frontCardPreview ? (
                          <img 
                            src={frontCardPreview} 
                            alt="Front of insurance card" 
                            className="object-contain w-full h-full" 
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <p className="text-red-500 text-sm">Missing</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Back of Card:</p>
                      <div className="border rounded-lg h-28 bg-white overflow-hidden">
                        {backCardPreview ? (
                          <img 
                            src={backCardPreview} 
                            alt="Back of insurance card" 
                            className="object-contain w-full h-full" 
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <p className="text-red-500 text-sm">Missing</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                onClick={prevStep}
                variant="outline"
                className="text-gray-600"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Step
              </Button>
              <Button 
                onClick={handleSubmit}
                className="bg-orange-600 hover:bg-orange-700"
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <span className="animate-spin mr-2">⟳</span>
                    Uploading...
                  </>
                ) : (
                  "Submit Information"
                )}
              </Button>
            </CardFooter>
          </>
        );
      default:
        return <></>;
    }
  };
  
  if (isSuccess) {
    return renderThankYouPage();
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-8">
      <div className="w-full max-w-2xl mx-auto">
        {/* Logo and Branding */}
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center mr-3">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-orange-800">TheraWin Health</h1>
        </div>
        
        {/* Progress Steps */}
        <div className="mb-6">
          <div className="flex items-center justify-between w-full max-w-lg mx-auto">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                1
              </div>
              <span className="text-xs mt-1">Front of Card</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-orange-600' : 'bg-gray-200'}`}></div>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                2
              </div>
              <span className="text-xs mt-1">Back of Card</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-orange-600' : 'bg-gray-200'}`}></div>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                3
              </div>
              <span className="text-xs mt-1">Contact Info</span>
            </div>
          </div>
        </div>
        
        <Card className="border-0 shadow-lg mb-8">
          {renderStepContent()}
        </Card>
        
        <div className="text-center text-gray-500 text-sm">
          <p className="mb-2">Your privacy is important to us. All information is encrypted and securely stored.</p>
          <p>Questions? Contact us at <span className="font-medium">contact@therawin.health</span></p>
        </div>
      </div>
    </div>
  );
};

export default InsuranceCardUpload;