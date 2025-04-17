"use client"
import React from 'react';
import { Shield, CheckCircle, Calendar, Clock, User, ChevronRight } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const InsuranceUploadThankYou = () => {
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
        
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader className="pb-6 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Thank You!</CardTitle>
            <CardDescription className="text-center text-base mt-2">
              Your insurance card information has been successfully submitted.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-orange-800 mb-3">What Happens Next?</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="bg-orange-100 p-2 rounded-full mr-3 flex-shrink-0">
                    <User className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      Our team will review your insurance card information within 48 hours.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="bg-orange-100 p-2 rounded-full mr-3 flex-shrink-0">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      You'll receive an email with confirmation of your benefits and coverage details.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="bg-orange-100 p-2 rounded-full mr-3 flex-shrink-0">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      Once verified, you can proceed to schedule your therapy session with confidence.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="text-center mb-8">
              <p className="text-gray-600 mb-2">
                We've sent a confirmation to your email address.
              </p>
              <p className="text-gray-600">
                If you don't see it within 15 minutes, please check your spam folder.
              </p>
            </div>
            
            <div className="space-y-4">
              <Button 
                onClick={() => window.location.href = '/'}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                Return to Homepage
              </Button>
              
              <Button
                onClick={() => window.location.href = '/appointments'}
                variant="outline"
                className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
              >
                Schedule a Session
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
          
          <CardFooter className="bg-gray-50 flex flex-col items-center rounded-b-lg p-6 border-t border-gray-100">
            <h4 className="font-medium text-gray-800 mb-2">Need Help?</h4>
            <p className="text-gray-600 text-center mb-3">
              If you have any questions about your insurance coverage, please contact us.
            </p>
            <p className="text-gray-700 font-medium">
              contact@therawin.health
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default InsuranceUploadThankYou;