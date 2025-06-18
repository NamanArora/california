"use client"
import React, { useState } from 'react';
import { CheckCircle, Shield, Lock, Phone, ArrowRight, Loader, Star, Users, Heart } from 'lucide-react';

// Define Prop Types for Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose?: () => void; // onClose is optional if the modal can't be closed by itself
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 transform transition-all duration-300 scale-100 animate-in slide-in-from-bottom-4 shadow-2xl">
        {/* Only render close button if onClose is provided */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            aria-label="Close modal"
          >
            &times;
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

const LandingPage: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [showOtpModal, setShowOtpModal] = useState<boolean>(false);
  const [showLoadingModal, setShowLoadingModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const formatPhoneNumber = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      if (numbers.length === 10) {
        return `+1 (${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6)}`;
      } else if (numbers.length > 6) {
        return `+1 (${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6)}`;
      } else if (numbers.length > 3) {
        return `+1 (${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
      } else if (numbers.length > 0) {
        return `+1 (${numbers}`;
      }
    }
    return value; // Return original value if it exceeds 10 digits or is empty initially
  };

  const handlePhoneSubmit = async (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault(); // Use preventDefault directly on the event

    // Check for a fully formatted 10-digit number
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
    if (cleanedPhoneNumber.length !== 10) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowOtpModal(true);
    }, 1000);
  };

  const handleOtpVerification = () => {
    if (otp.length !== 6) {
      alert('Please enter the complete 6-digit code');
      return;
    }

    setShowOtpModal(false);
    setShowLoadingModal(true);

    // Simulate call completion
    setTimeout(() => {
      setShowLoadingModal(false);
      setShowSuccessModal(true);
    }, 5000);
  };

  // Define types for benefit and step objects
  interface Benefit {
    icon: string;
    title: string;
    description: string;
  }

  interface Step {
    number: string;
    title: string;
    description: string;
  }

  interface Testimonial {
    name: string;
    location: string;
    text: string;
    rating: number;
  }

  const benefits: Benefit[] = [
    {
      icon: "🗣️",
      title: "Natural Conversations",
      description: "Daily 10-15 minute therapeutic conversations"
    },
    {
      icon: "✍️",
      title: "No Typing Required",
      description: "Just speak naturally - no writing needed"
    },
    {
      icon: "🔒",
      title: "Private & Secure",
      description: "HIPAA compliant and completely private"
    },
    {
      icon: "📊",
      title: "Growth Insights",
      description: "Personalized insights into your patterns"
    }
  ];

  const steps: Step[] = [
    {
      number: "1",
      title: "Verify Your Number",
      description: "Enter your phone number and verify with OTP"
    },
    {
      number: "2",
      title: "Receive Your Call",
      description: "Get an immediate call from our AI therapist"
    },
    {
      number: "3",
      title: "Share Your Day",
      description: "Natural conversation about your experiences"
    },
    {
      number: "4",
      title: "Get Your Insights",
      description: "Access personalized wellness insights"
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Priya S.",
      location: "San Francisco, CA",
      text: "This has transformed my daily routine. Finally, a mental health tool that understands my cultural background.",
      rating: 5
    },
    {
      name: "Raj M.",
      location: "Austin, TX",
      text: "Speaking in my natural language about my experiences has been incredibly therapeutic.",
      rating: 5
    },
    {
      name: "Anisha K.",
      location: "Seattle, WA",
      text: "The AI therapist is so understanding. I feel heard and supported every day.",
      rating: 5
    }
  ];

  // Define type for badge objects in Privacy Section
  interface PrivacyBadge {
    icon: string;
    title: string;
    desc: string;
  }

  const privacyBadges: PrivacyBadge[] = [
    { icon: "🏥", title: "HIPAA Compliant", desc: "Healthcare-grade security" },
    { icon: "🔐", title: "End-to-End Encrypted", desc: "Military-level protection" },
    { icon: "🚫", title: "No Data Sharing", desc: "Your data stays private" }
  ];


  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 text-[#2B6CB8] font-bold text-xl">
              <div className="w-10 h-10 bg-gradient-to-br from-[#2B6CB8] to-blue-600 rounded-xl flex items-center justify-center text-white text-lg">
                🧘‍♀️
              </div>
              <span>MindfulJourney</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#how-it-works" className="text-gray-700 hover:text-[#2B6CB8] transition-colors duration-200 font-medium">How it Works</a>
              <a href="#privacy" className="text-gray-700 hover:text-[#2B6CB8] transition-colors duration-200 font-medium">Privacy</a>
              <a href="#contact" className="text-gray-700 hover:text-[#2B6CB8] transition-colors duration-200 font-medium">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2B6CB8] via-blue-600 to-indigo-700 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="animate-in slide-in-from-left duration-700">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Users className="h-4 w-4" />
                <span>Join 1000+ Indian immigrants</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Daily AI Journaling for Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400"> Mental Wellness</span>
              </h1>

              <p className="text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed">
                Speak your thoughts, track your growth. Designed for the Indian community in America.
              </p>

              {/* Enhanced Free Trial Badge */}
              <div className="inline-block bg-gradient-to-r from-[#E67E22] to-orange-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl mb-8 border-4 border-white/20">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 fill-current" />
                  <span>First 10 calls absolutely free!</span>
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="text-2xl mb-2">{benefit.icon}</div>
                    <h3 className="font-semibold text-sm mb-1">{benefit.title}</h3>
                    <p className="text-xs opacity-80">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Featured Phone Form */}
            <div className="animate-in slide-in-from-right duration-700 delay-300">
              {/* Hero Images */}
              <div className="relative mb-8">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {/* Using placeholder images that would represent diverse Indian professionals */}
                  <div className="relative group">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                      alt="Happy professional"
                      className="w-full h-24 object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                  </div>

                  <div className="relative group">
                    <img
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b524?w=150&h=150&fit=crop&crop=face"
                      alt="Peaceful woman"
                      className="w-full h-24 object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-blue-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                      <Heart className="h-3 w-3 text-white fill-current" />
                    </div>
                  </div>

                  <div className="relative group">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                      alt="Content man"
                      className="w-full h-24 object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-yellow-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                      <Star className="h-3 w-3 text-white fill-current" />
                    </div>
                  </div>
                </div>

                <div className="text-center text-sm opacity-80">
                  "Real people achieving mental wellness daily"
                </div>
              </div>

              {/* Featured Phone Form */}
              <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#2B6CB8] to-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    ⚡ Start in 30 seconds
                  </div>
                </div>

                <div className="text-center mb-8 pt-4">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">Get Your First Call</h2>
                  <p className="text-gray-600 text-lg">Join thousands on their wellness journey</p>
                </div>

                {/* Form element added for proper submission handling */}
                <form onSubmit={handlePhoneSubmit} className="space-y-6">
                  <div className="relative">
                    <Phone className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                      placeholder="Enter your phone number"
                      className="w-full pl-14 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#2B6CB8] focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-800 text-lg font-medium"
                      aria-label="Phone number input"
                    />
                  </div>

                  <button
                    type="submit" // Set type to submit for form handling
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#2B6CB8] to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-200 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 text-lg"
                  >
                    {isSubmitting ? (
                      <Loader className="h-6 w-6 animate-spin" />
                    ) : (
                      <>
                        <span>Start My Free Journey</span>
                        <ArrowRight className="h-6 w-6" />
                      </>
                    )}
                  </button>
                </form>

                  {/* Trust Indicators */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100 mt-6"> {/* Added margin top */}
                    <div className="text-center">
                      <Shield className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <div className="text-xs font-medium text-gray-600">HIPAA Secure</div>
                    </div>
                    <div className="text-center">
                      <Lock className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <div className="text-xs font-medium text-gray-600">Private</div>
                    </div>
                    <div className="text-center">
                      <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <div className="text-xs font-medium text-gray-600">No Storage</div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Indian-Americans Nationwide
            </h2>
            <p className="text-xl text-gray-600">Real stories from real people</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, private, and effective. Start your wellness journey in minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center border border-gray-100 group-hover:border-[#2B6CB8]/20">
                  <div className="bg-gradient-to-br from-[#E67E22] to-orange-500 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>

                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#2B6CB8] to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section id="privacy" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-gray-900">
            Your Privacy is Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2B6CB8] to-blue-600">Priority</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            We understand the cultural sensitivity around mental health discussions.
            Your conversations are completely private, secure, and never stored.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {privacyBadges.map((badge, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-[#2B6CB8]/20"
              >
                <div className="text-4xl mb-4">{badge.icon}</div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">{badge.title}</h3>
                <p className="text-gray-600">{badge.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-600 text-lg">
            Read our full <a href="#" className="text-[#2B6CB8] hover:underline font-medium">Privacy Policy</a> and
            <a href="#" className="text-[#2B6CB8] hover:underline font-medium"> Terms of Service</a>.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#2B6CB8] to-blue-600 rounded-xl flex items-center justify-center text-white text-lg">
                  🧘‍♀️
                </div>
                <span className="font-bold text-xl">MindfulJourney</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Supporting the mental wellness of Indian immigrants in America through AI-powered daily journaling.
              </p>
            </div>

            <div>
              <h4 className="text-[#E67E22] font-bold text-lg mb-6">Support</h4>
              <div className="space-y-3">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200">Help Center</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200">Contact Us</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200">Crisis Resources</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200">Community</a>
              </div>
            </div>

            <div>
              <h4 className="text-[#E67E22] font-bold text-lg mb-6">Legal</h4>
              <div className="space-y-3">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200">HIPAA Compliance</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200">Cookie Policy</a>
              </div>
            </div>

            <div>
              <h4 className="text-[#E67E22] font-bold text-lg mb-6">Connect</h4>
              <div className="space-y-3">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200">📧 hello@mindfuljourney.com</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200">📱 1-800-MINDFUL</a>
                <div className="pt-4">
                  <p className="text-gray-400 text-sm">Available 24/7 for support</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2025 MindfulJourney. All rights reserved. Made with ❤️ for the Indian-American community.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals remain the same */}
      <Modal isOpen={showOtpModal} onClose={() => setShowOtpModal(false)}>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-[#2B6CB8] mb-4">Verify Your Phone Number</h3>
          <p className="text-gray-600 mb-6">We've sent a 6-digit code to <span className="font-semibold">{phoneNumber}</span></p>

          <input
            type="text"
            value={otp}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="000000"
            className="w-full p-4 text-center text-2xl border-2 border-gray-200 rounded-xl focus:border-[#2B6CB8] focus:ring-4 focus:ring-blue-100 transition-all duration-200 mb-6 tracking-widest"
            maxLength={6} // Set maxLength for OTP input
            inputMode="numeric" // Suggest numeric keyboard
            pattern="[0-9]*" // Pattern for numeric input
            aria-label="OTP input"
          />

          <button
            onClick={handleOtpVerification}
            className="w-full bg-[#2B6CB8] hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 mb-4"
          >
            Verify & Start My First Call
          </button>

          <div className="flex justify-center space-x-4 text-sm">
            <button className="text-[#2B6CB8] hover:underline" onClick={() => {/* Resend OTP logic here */}}>Didn't receive code? Resend</button>
            <span className="text-gray-400">|</span>
            <button
              onClick={() => {
                setShowOtpModal(false);
                setOtp(''); // Clear OTP when editing number
              }}
              className="text-[#2B6CB8] hover:underline"
            >
              Wrong number? Edit
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showLoadingModal}> {/* Removed onClose for loading modal as it shouldn't be closable */}
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-[#2B6CB8] rounded-full animate-spin mx-auto mb-6"></div>
          <h3 className="text-2xl font-bold text-[#2B6CB8] mb-4">Verification successful!</h3>
          <p className="text-gray-600 mb-6">Our AI therapist will call you in the next 30 seconds.</p>

          <div className="bg-gray-50 p-6 rounded-xl">
            <h4 className="font-semibold text-[#2B6CB8] mb-4">Prepare for your call:</h4>
            <div className="text-left space-y-2 text-gray-600">
              <p>• Find a quiet, comfortable space</p>
              <p>• The call will last 10-15 minutes</p>
              <p>• Speak naturally about your day</p>
            </div>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showSuccessModal}> {/* Removed onClose for success modal as it likely leads to another page */}
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-green-600 mb-4">Great job completing your first journaling session!</h3>
          <p className="text-gray-600 mb-6">Your wellness journey has begun. Every day is a step forward.</p>

          <div className="space-y-3 mb-6">
            <button onClick={() => window.location.href = '/caller/login'} className="w-full bg-[#2B6CB8] hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105">
              View My Insights
            </button>
            <button className="w-full bg-[#E67E22] hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105">
              Schedule Tomorrow's Call
            </button>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
            <p className="text-[#2B6CB8] font-bold">9 free calls remaining</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;