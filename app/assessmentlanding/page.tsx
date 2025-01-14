import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ClipboardList, Clock, Lock, BrainCircuit } from 'lucide-react';

const WorkLifeBalanceAssessment = () => {
  return (
    <main className="min-h-screen bg-orange-50">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 grid grid-cols-6 gap-4 opacity-5">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="h-32 bg-orange-900"></div>
          ))}
        </div>
        
        <div className="relative container mx-auto px-6 py-20 max-w-6xl text-center">
          <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm mb-6">
            Cultural Integration Assessment
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-orange-950 max-w-3xl mx-auto leading-tight">
            Harmonize Your American Career with Indian Values
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Navigate the unique challenges of balancing your professional success in the US while maintaining your cultural identity. Our assessment helps Indian professionals find their optimal work-life harmony.
          </p>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 rounded-2xl text-lg shadow-lg transform transition hover:-translate-y-1">
            Begin Free Assessment
          </Button>
          
          <div className="mt-12 relative max-w-3xl mx-auto">
            <div className="absolute inset-0 bg-orange-100 rounded-2xl" style={{ transform: 'translate(8px, 8px)' }}></div>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
              alt="Diverse professionals collaborating in modern office" 
              className="relative rounded-2xl shadow-lg w-full object-cover h-[400px]"
            />
          </div>
        </div>
      </section>

      {/* Test Overview Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Quick Assessment Overview</h2>
          <Card className="p-8 rounded-2xl bg-white shadow-xl">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center">
                <ClipboardList className="mb-4 text-orange-600" size={40} />
                <h3 className="font-bold text-xl mb-3">Tailored Questions</h3>
                <p className="text-gray-600">10 culturally-sensitive questions addressing unique challenges</p>
              </div>
              <div className="flex flex-col items-center text-center border-l border-r border-gray-200">
                <Clock className="mb-4 text-orange-600" size={40} />
                <h3 className="font-bold text-xl mb-3">Quick Completion</h3>
                <p className="text-gray-600">Only 2 minutes needed for valuable insights</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <BrainCircuit className="mb-4 text-orange-600" size={40} />
                <h3 className="font-bold text-xl mb-3">Personalized Analysis</h3>
                <p className="text-gray-600">Custom insights for Indian professionals in the US</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="bg-white py-16 rounded-t-3xl">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Key Insights You'll Gain</h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative flex justify-center">
              <div className="absolute inset-0 bg-orange-100 rounded-2xl" style={{ transform: 'translate(8px, 8px)' }}></div>
              <img 
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=900&auto=format&fit=crop"
                alt="Professional in thoughtful moment" 
                className="relative rounded-2xl shadow-lg w-full max-w-md object-cover h-[400px]"
              />
            </div>
            <div className="max-w-xl">
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-orange-600 text-white p-2 rounded-full flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">Understand how to manage American work expectations while maintaining family traditions and cultural values.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-orange-600 text-white p-2 rounded-full flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">Discover strategies to bridge cultural differences in workplace communication and relationship building.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-orange-600 text-white p-2 rounded-full flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">Get actionable tips for maintaining cultural connections while advancing in your American career journey.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="bg-orange-50 py-16">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <div className="inline-block p-6 bg-orange-100 rounded-full mb-8">
            <Lock className="text-orange-600" size={48} />
          </div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Privacy is Our Priority</h2>
          <p className="text-gray-600 text-lg mb-10 leading-relaxed">
            We understand the sensitivity of cultural and professional insights. Your responses are 100% confidential and used solely to generate your personalized assessment report. No personal information is stored or shared.
          </p>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 rounded-2xl text-lg shadow-lg transform transition hover:-translate-y-1">
            Start Your Free Assessment
          </Button>
        </div>
      </section>
    </main>
  );
};

export default WorkLifeBalanceAssessment;