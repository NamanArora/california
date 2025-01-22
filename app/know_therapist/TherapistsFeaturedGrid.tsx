import React from 'react';
import { Calendar, Star, Shield, ArrowRight, Clock } from 'lucide-react';

const TherapistCard = ({ therapist }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
      {/* Image Section - Larger and more prominent */}
      <div className="relative h-96">
        <img
          src={therapist.image}
          alt={therapist.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/40 to-transparent" />
        
        {/* Overlay Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="flex items-center gap-2 mb-2">
            {Array(5).fill(0).map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <h3 className="text-3xl font-bold mb-1">{therapist.name}</h3>
          <p className="text-xl text-purple-200">{therapist.title}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8">
        {/* Specialties Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {therapist.specialties.map((specialty, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
            >
              {specialty}
            </span>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-600" />
            <span className="text-gray-600">10+ Years Experience</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-600" />
            <span className="text-gray-600">Licensed Professional</span>
          </div>
        </div>

        <p className="text-gray-600 mb-8 leading-relaxed">{therapist.bio}</p>

        {/* CTAs */}
        <div className="flex gap-4">
          <button className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
            Book Session
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="flex-1 border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

const TherapistsFeaturedGrid = () => {
  const therapists = [
    {
      name: "Dr. Sarah Patel",
      title: "Clinical Psychologist",
      image: "/api/placeholder/600/800",
      specialties: ["Anxiety & Depression", "Cultural Identity", "Trauma Recovery"],
      bio: "Dr. Patel brings 15 years of experience in multicultural therapy, specializing in helping individuals navigate cultural identity and transition challenges."
    },
    {
      name: "Dr. Michael Chen",
      title: "Licensed Therapist",
      image: "/api/placeholder/600/800",
      specialties: ["Couples Therapy", "Family Relations", "Stress Management"],
      bio: "With expertise in relationship dynamics and family therapy, Dr. Chen helps couples and families build stronger, more meaningful connections."
    },
    {
      name: "Dr. Maya Rodriguez",
      title: "Mental Health Counselor",
      image: "/api/placeholder/600/800",
      specialties: ["EMDR Therapy", "Anxiety Treatment", "Personal Growth"],
      bio: "Dr. Rodriguez specializes in EMDR therapy and anxiety treatment, helping clients overcome past trauma and build resilience."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with enhanced styling */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-5xl font-bold text-purple-900 mb-6">
            Meet Our Expert Therapists
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Our licensed professionals bring years of experience and diverse expertise 
            to provide you with the highest quality mental health care.
          </p>
        </div>

        {/* Therapist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {therapists.map((therapist, index) => (
            <TherapistCard key={index} therapist={therapist} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TherapistsFeaturedGrid;