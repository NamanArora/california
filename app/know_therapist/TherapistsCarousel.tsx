"use client"
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Award, ArrowRight } from 'lucide-react';

const TherapistsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const therapists = [
    {
      name: "Dr. Sarah Patel",
      title: "Clinical Psychologist",
      image: "/api/placeholder/800/1000",
      specialties: ["Anxiety & Depression", "Cultural Identity", "Trauma Recovery"],
      bio: "Dr. Patel brings 15 years of experience in multicultural therapy, specializing in helping individuals navigate cultural identity and transition challenges.",
      education: "Ph.D. in Clinical Psychology, Stanford University",
      languages: ["English", "Hindi", "Gujarati"]
    },
    {
      name: "Dr. Michael Chen",
      title: "Licensed Therapist",
      image: "/api/placeholder/800/1000",
      specialties: ["Couples Therapy", "Family Relations", "Stress Management"],
      bio: "With expertise in relationship dynamics and family therapy, Dr. Chen helps couples and families build stronger, more meaningful connections.",
      education: "Psy.D. in Clinical Psychology, UCLA",
      languages: ["English", "Mandarin", "Cantonese"]
    },
    {
      name: "Dr. Maya Rodriguez",
      title: "Mental Health Counselor",
      image: "/api/placeholder/800/1000",
      specialties: ["EMDR Therapy", "Anxiety Treatment", "Personal Growth"],
      bio: "Dr. Rodriguez specializes in EMDR therapy and anxiety treatment, helping clients overcome past trauma and build resilience.",
      education: "Ph.D. in Counseling Psychology, Columbia University",
      languages: ["English", "Spanish"]
    }
  ];

  const nextTherapist = () => {
    setActiveIndex((prev) => (prev + 1) % therapists.length);
  };

  const prevTherapist = () => {
    setActiveIndex((prev) => (prev - 1 + therapists.length) % therapists.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-yellow-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-5xl font-bold text-purple-900 mb-6">
            Your Mental Health Partners
          </h2>
          <p className="text-xl text-gray-600">
            Meet our experienced therapists dedicated to your well-being
          </p>
        </div>

        {/* Carousel Section */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10">
            <button
              onClick={prevTherapist}
              className="p-2 rounded-full bg-white shadow-lg hover:bg-purple-50 transition-colors"
              aria-label="Previous therapist"
            >
              <ChevronLeft className="w-8 h-8 text-purple-600" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10">
            <button
              onClick={nextTherapist}
              className="p-2 rounded-full bg-white shadow-lg hover:bg-purple-50 transition-colors"
              aria-label="Next therapist"
            >
              <ChevronRight className="w-8 h-8 text-purple-600" />
            </button>
          </div>

          {/* Therapist Display */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Image Section */}
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={therapists[activeIndex].image}
                alt={therapists[activeIndex].name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/20 to-transparent" />
              
              {/* Image Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="space-y-2">
                  <h3 className="text-4xl font-bold">{therapists[activeIndex].name}</h3>
                  <p className="text-xl text-purple-200">{therapists[activeIndex].title}</p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              {/* Specialties */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-purple-900 mb-4">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {therapists[activeIndex].specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-purple-900 mb-4">About</h4>
                <p className="text-gray-600 leading-relaxed">{therapists[activeIndex].bio}</p>
              </div>

              {/* Education & Languages */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="text-lg font-semibold text-purple-900 mb-2">Education</h4>
                  <p className="text-gray-600">{therapists[activeIndex].education}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-purple-900 mb-2">Languages</h4>
                  <p className="text-gray-600">{therapists[activeIndex].languages.join(", ")}</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex gap-4">
                <button className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                  Schedule Consultation
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="flex-1 border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors">
                  View Full Profile
                </button>
              </div>
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {therapists.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-purple-600' : 'bg-purple-200'
                }`}
                aria-label={`Go to therapist ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TherapistsCarousel;