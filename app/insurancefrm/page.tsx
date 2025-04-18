"use client"
import React, { useState } from 'react';
import { 
  Shield, 
  Upload, 
  ClipboardList, 
  ArrowRight, 
  CheckCircle, 
  Info, 
  Clock, 
  ChevronDown, 
  ChevronUp,
  Camera,
  FileText,
  BadgeCheck,
  RefreshCw
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-3">
      <button 
        className="w-full flex justify-between items-center p-4 bg-white hover:bg-orange-50 text-left transition-colors"
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${question.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <span className="font-medium text-gray-800">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-orange-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-orange-500 flex-shrink-0" />
        )}
      </button>
      <div 
        id={`faq-answer-${question.replace(/\s+/g, '-').toLowerCase()}`}
        className={`bg-gray-50 px-4 transition-all duration-300 ease-in-out ${
          isOpen ? 'py-4 max-h-80 opacity-100' : 'py-0 max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <p className="text-gray-700">{answer}</p>
      </div>
    </div>
  );
};

const InsuranceEntryPoint: React.FC = () => {
  // State for FAQ accordions
  const [openFAQs, setOpenFAQs] = useState<{[key: string]: boolean}>({});

  const toggleFAQ = (id: string) => {
    setOpenFAQs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqs = [
    {
      id: "coverage-check",
      question: "How do I know if my insurance will cover therapy?",
      answer: "Most insurance plans cover mental health services, but coverage varies by plan. By uploading your insurance card or entering your details, we can verify your exact benefits before your first session and explain any out-of-pocket costs."
    },
    {
      id: "verification-time",
      question: "How long does insurance verification take?",
      answer: "Generally insurance verification will be done in 48 hours but sometimes it can take longer. Your care coordinator will try to get the details verified as soon as they can."
    },
    {
      id: "info-security",
      question: "How is my insurance information stored securely?",
      answer: "We use best in the industry encryption practices and HIPAA-compliant storage systems to protect your data. Your information is only accessed by authorized staff for verification purposes and is never shared with third parties without your consent."
    },
    {
      id: "out-of-network",
      question: "What if my insurance is out-of-network?",
      answer: "If your plan is out-of-network, we'll explain your out-of-network benefits and provide cost estimates. Many plans offer partial reimbursement for out-of-network services, and we can help you submit claims."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 p-4 md:p-8">
      {/* Subtle background texture */}
      <div className="fixed inset-0 -z-20 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'12\' height=\'12\' viewBox=\'0 0 12 12\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'1\' cy=\'1\' r=\'0.5\' fill=\'%23f97316\' fill-opacity=\'0.6\'/%3E%3C/svg%3E")',
          backgroundSize: '12px 12px'
        }}></div>
      </div>
      
      {/* Subtle accent shapes */}
      <div className="fixed top-0 right-0 w-80 h-80 bg-orange-100 rounded-bl-full opacity-20 -z-10 blur-xl"></div>
      <div className="fixed bottom-0 left-0 w-80 h-80 bg-blue-100 rounded-tr-full opacity-15 -z-10 blur-xl"></div>

      <div className="w-full max-w-5xl mx-auto relative bg-white/80 backdrop-blur-sm rounded-xl shadow-sm px-4 md:px-8 py-6 md:py-8 border border-gray-100">

        {/* Header with logo and enhanced styling */}
        <div className="flex flex-col items-center mb-8 md:mb-10">
          <div className="flex items-center mb-8">
            <img 
              src="https://therawin.health/Logo.svg" 
              alt="TheraWin Health Logo" 
              className="h-10 md:h-12"
            />
          </div>
          
          <div className="mb-8 md:mb-12 text-center relative">
            <div className="py-8 px-6 md:px-10">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6" id="page-heading">
                Insurance Verification
              </h2>
              <div className="w-24 h-1 bg-orange-400 mx-auto mb-4 rounded-full"></div>
              <p className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg">
                Please select how you'd like to provide your insurance information. Your care coordinator will verify the information get back to you soon!
              </p>
            </div>
          </div>
        </div>
        
        {/* Enhanced info banner */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-5 rounded-xl mb-8 md:mb-10 flex items-center border border-orange-200 shadow-sm relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute right-0 top-0 w-24 h-24 bg-orange-200 rounded-full transform translate-x-1/2 -translate-y-1/2 opacity-20"></div>
          
          <div className="bg-orange-300 rounded-full p-2 mr-4 flex-shrink-0 shadow-sm">
            <Info className="w-5 h-5 text-orange-800" aria-hidden="true" />
          </div>
          <p className="text-gray-800 relative z-10 text-base md:text-lg">
            <span className="font-medium">Quick tip:</span> Uploading photos of your insurance card is usually the fastest way to verify your coverage.
          </p>
        </div>
        
        {/* Main options cards with improved readability */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-10">
          {/* Photo Upload Option */}
          <Card className="border border-gray-200 shadow-md hover:shadow-xl transition-all flex flex-col h-full overflow-hidden rounded-lg transform hover:scale-[1.02] duration-300">
            {/* Distinct top accent */}
            <div className="h-2 bg-orange-500"></div>
            
            <CardHeader className="pb-2 pt-6">
              <CardTitle className="text-xl flex items-center text-gray-800">
                <div className="bg-orange-100 p-3 rounded-full mr-3">
                  <Upload className="w-5 h-5 text-orange-700" aria-hidden="true" />
                </div>
                <span id="upload-card-title">Upload Insurance Card Photos</span>
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
                    <span>Our team will verify your coverage and get back to you</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start bg-orange-50 p-3 rounded-lg">
                  <div className="bg-orange-200 rounded-full p-1 mr-2 flex-shrink-0 mt-0.5">
                    <Camera className="w-4 h-4 text-orange-700" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Best option</span> if you have your physical insurance card or its pictures handy. No need to manually type policy details.
                  </p>
                </div>
                
                <div className="flex items-start bg-orange-50 p-3 rounded-lg">
                  <div className="bg-orange-200 rounded-full p-1 mr-2 flex-shrink-0 mt-0.5">
                    <BadgeCheck className="w-4 h-4 text-orange-700" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Reduces errors</span> since our team reads information directly from your card.
                  </p>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="p-6">
              <Button 
                onClick={() => window.location.href = '/insurancefrm/upload'}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-6 md:py-7 text-lg rounded-lg"
                aria-labelledby="upload-card-title"
              >
                Upload Card Photos
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Button>
            </CardFooter>
          </Card>
          
          {/* Manual Entry Option */}
          <Card className="border border-gray-200 shadow-md hover:shadow-xl transition-all flex flex-col h-full overflow-hidden rounded-lg transform hover:scale-[1.02] duration-300">
            {/* Different color accent */}
            <div className="h-2 bg-blue-500"></div>
            
            <CardHeader className="pb-2 pt-6">
              <CardTitle className="text-xl flex items-center text-gray-800">
                <div className="bg-blue-100 p-3 rounded-full mr-3">
                  <ClipboardList className="w-5 h-5 text-blue-700" aria-hidden="true" />
                </div>
                <span id="manual-entry-title">Enter Insurance Details Manually</span>
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
                    <span className="bg-blue-200 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">•</span>
                    <span>Insurance company name and plan type</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-200 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">•</span>
                    <span>Member ID number (required)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-200 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">•</span>
                    <span>Group ID number (if available)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-200 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">•</span>
                    <span>EAP ID (if available)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-200 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">•</span>
                    <span>Your personal information</span>
                  </li>
                </ul>
              </div>
              
            </CardContent>
            
            <CardFooter className="p-6">
              <Button 
                onClick={() => window.location.href = '/insurancefrm/form'}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-6 md:py-7 text-lg rounded-lg"
                aria-labelledby="manual-entry-title"
              >
                Enter Details Manually
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Enhanced FAQ Section */}
        <div className="mb-10 bg-gray-50 rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -right-12 -top-12 w-36 h-36 bg-orange-100 rounded-full opacity-30"></div>
          <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-blue-100 rounded-full opacity-30"></div>
          
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Info className="w-6 h-6 mr-3 text-orange-500" aria-hidden="true" />
            Frequently Asked Questions
          </h3>
          
          <div className="space-y-3 relative z-10">
            {faqs.map(faq => (
              <FAQItem 
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
                isOpen={!!openFAQs[faq.id]}
                toggleOpen={() => toggleFAQ(faq.id)}
              />
            ))}
          </div>
        </div>
        
        {/* Enhanced footer */}
        <div className="text-center rounded-xl border border-gray-200 bg-gradient-to-r from-gray-50 via-white to-gray-50 p-8 shadow-sm mb-6 relative overflow-hidden">
          
          <div className="flex justify-center mb-4">
            <div className="bg-orange-100 p-3 rounded-full">
              <Shield className="w-6 h-6 text-orange-500" aria-hidden="true" />
            </div>
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-3">Your Data is Protected</h3>
          <div className="w-16 h-1 bg-orange-300 mx-auto mb-4 rounded-full"></div>
          <p className="text-gray-700 mb-3 max-w-md mx-auto">
            Your privacy is important to us. All information is encrypted and securely stored according to HIPAA guidelines.
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