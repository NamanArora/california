"use client"
import React from 'react';
import { Shield, Upload, ClipboardList, ArrowRight, CheckCircle, Info } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const InsuranceEntryPoint: React.FC = () => {
  return (
    <div className="min-h-screen bg-white p-8">
      {/* Simple background accent */}
      <div className="fixed top-0 right-0 w-64 h-64 bg-orange-100 rounded-bl-full opacity-50 -z-10"></div>
      <div className="fixed bottom-0 left-0 w-64 h-64 bg-orange-100 rounded-tr-full opacity-50 -z-10"></div>

      <div className="w-full max-w-5xl mx-auto relative">
        {/* Header with improved readability */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mr-3 shadow-sm">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              TheraWin Health
            </h1>
          </div>
          
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Insurance Verification
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg">
              Please select how you'd like to provide your insurance information. We'll verify your coverage and optimize your benefits.
            </p>
          </div>
        </div>
        
        {/* Info banner with improved contrast */}
        <div className="bg-orange-100 p-4 rounded-lg mb-8 flex items-center border border-orange-200">
          <div className="bg-orange-300 rounded-full p-2 mr-4 flex-shrink-0">
            <Info className="w-5 h-5 text-orange-800" />
          </div>
          <p className="text-gray-800">
            <span className="font-medium">Quick tip:</span> Uploading photos of your insurance card is usually the fastest way to verify your coverage.
          </p>
        </div>
        
        {/* Main options cards with improved readability */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Photo Upload Option */}
          <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-all flex flex-col h-full overflow-hidden rounded-lg">
            {/* Colorful top accent */}
            <div className="h-2 bg-orange-400"></div>
            
            <CardHeader className="pb-2 pt-6">
              <CardTitle className="text-xl flex items-center text-gray-800">
                <div className="bg-orange-100 p-3 rounded-full mr-3">
                  <Upload className="w-5 h-5 text-orange-700" />
                </div>
                Upload Insurance Card Photos
              </CardTitle>
              <CardDescription className="text-gray-600 mt-1">
                Quick and easy - just snap photos of your card
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-4 flex-grow">
              <div className="mb-6 bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-800 mb-3">How it works:</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="bg-orange-200 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">1</span>
                    <span>Take clear photos of the front and back of your insurance card</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-orange-200 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">2</span>
                    <span>Upload both images through our secure system</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-orange-200 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">3</span>
                    <span>Our team will verify your coverage within 48 hours</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center bg-orange-50 p-3 rounded-lg">
                <div className="bg-orange-200 rounded-full p-1 mr-2 flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-orange-700" />
                </div>
                <p className="text-sm text-gray-700">
                  Best option if you have your physical insurance card handy.
                </p>
              </div>
            </CardContent>
            
            <CardFooter className="pb-6">
              <Button 
                onClick={() => window.location.href = '/insurancefrm/upload'}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-5"
              >
                Upload Card Photos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardFooter>
          </Card>
          
          {/* Manual Entry Option */}
          <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-all flex flex-col h-full overflow-hidden rounded-lg">
            {/* Colorful top accent */}
            <div className="h-2 bg-orange-400"></div>
            
            <CardHeader className="pb-2 pt-6">
              <CardTitle className="text-xl flex items-center text-gray-800">
                <div className="bg-orange-100 p-3 rounded-full mr-3">
                  <ClipboardList className="w-5 h-5 text-orange-700" />
                </div>
                Enter Insurance Details Manually
              </CardTitle>
              <CardDescription className="text-gray-600 mt-1">
                Complete a form with your insurance information
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-4 flex-grow">
              <div className="mb-6 bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-800 mb-3">Information you'll need:</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="bg-orange-200 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">•</span>
                    <span>Insurance company name and plan type</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-orange-200 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">•</span>
                    <span>Member ID number (required)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-orange-200 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">•</span>
                    <span>Group ID number (if available)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-orange-200 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">•</span>
                    <span>Your personal information</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center bg-orange-50 p-3 rounded-lg">
                <div className="bg-orange-200 rounded-full p-1 mr-2 flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-orange-700" />
                </div>
                <p className="text-sm text-gray-700">
                  Best option if you know your insurance details or have digital access to your plan information.
                </p>
              </div>
            </CardContent>
            
            <CardFooter className="pb-6">
              <Button 
                onClick={() => window.location.href = '/insurancefrm/form'}
                className="w-full bg-white text-orange-600 border-2 border-orange-400 hover:bg-orange-50 font-medium py-5"
                variant="outline"
              >
                Enter Details Manually
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Footer with improved readability */}
        <div className="text-center rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm">
          <div className="flex justify-center mb-4">
            <Shield className="w-6 h-6 text-orange-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-3">Your Data is Protected</h3>
          <p className="text-gray-700 mb-2">
            Your privacy is important to us. All information is encrypted and securely stored.
          </p>
          <p className="text-gray-700">
            Questions? Contact us at <span className="font-medium text-orange-600">contact@therawin.health</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsuranceEntryPoint;