"use client"
import React from 'react';
import { Shield, Upload, ClipboardList, ArrowRight } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const InsuranceEntryPoint = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-8">
      <div className="w-full max-w-4xl mx-auto">
        {/* Logo and Branding */}
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-purple-800">TheraWin Health</h1>
        </div>
        
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Insurance Verification</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Please select how you'd like to provide your insurance information. We'll verify your coverage and optimize your benefits.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Photo Upload Option */}
          <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <Upload className="w-5 h-5 mr-2 text-purple-600" />
                Upload Insurance Card Photos
              </CardTitle>
              <CardDescription>
                Quick and easy - just snap photos of your card
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 flex-grow">
              <div className="mb-6 bg-gray-100 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">How it works:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="bg-purple-100 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                    <span>Take clear photos of the front and back of your insurance card</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                    <span>Upload both images through our secure system</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                    <span>Our team will verify your coverage within 48 hours</span>
                  </li>
                </ul>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Best option if you have your physical insurance card handy.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => window.location.href = '/insurancefrm/upload'}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Upload Card Photos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          
          {/* Manual Entry Option */}
          <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <ClipboardList className="w-5 h-5 mr-2 text-purple-600" />
                Enter Insurance Details Manually
              </CardTitle>
              <CardDescription>
                Complete a form with your insurance information
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 flex-grow">
              <div className="mb-6 bg-gray-100 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Information you'll need:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="bg-purple-100 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">•</span>
                    <span>Insurance company name and plan type</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">•</span>
                    <span>Member ID number (required)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">•</span>
                    <span>Group ID number (if available)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">•</span>
                    <span>Your personal information</span>
                  </li>
                </ul>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Best option if you know your insurance details or have digital access to your plan information.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => window.location.href = '/insurancefrm/form'}
                className="w-full bg-white text-purple-600 border border-purple-600 hover:bg-purple-50"
                variant="outline"
              >
                Enter Details Manually
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="text-center text-gray-500 text-sm">
          <p className="mb-2">Your privacy is important to us. All information is encrypted and securely stored.</p>
          <p>Questions? Contact us at <span className="font-medium">contact@therawin.health</span></p>
        </div>
      </div>
    </div>
  );
};

export default InsuranceEntryPoint;