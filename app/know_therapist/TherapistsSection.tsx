import React from 'react';
import { Calendar, Globe2, Award, ArrowRight } from 'lucide-react';

interface Therapist {
  name: string;
  title: string;
  image: string;
  specialties: string[];
  bio: string;
  languages?: string[];
  education?: string;
  achievements?: string[];
  contact?: {
    email?: string;
    phone?: string;
  };
 }

const TherapistCard = ({ therapist }: { therapist: Therapist }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] focus-within:scale-[1.02]">
      <div className="aspect-w-3 aspect-h-4 relative">
        <img
          src={therapist.image}
          alt={`${therapist.name}, ${therapist.title}`}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
      </div>
      
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-2xl font-bold text-purple-900 mb-1">{therapist.name}</h3>
          <p className="text-purple-600 font-medium">{therapist.title}</p>
        </div>

        <div className="space-y-3">
          {therapist.specialties.map((specialty, index) => (
            <div key={index} className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600 flex-shrink-0" />
              <span className="text-gray-700">{specialty}</span>
            </div>
          ))}
        </div>

        <p className="text-gray-600 leading-relaxed">{therapist.bio}</p>

        <div className="pt-4 flex flex-wrap gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 transition-colors">
            Book Session
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:text-purple-700 focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

const TherapistsSection = () => {
  const therapists = [
    {
      name: "Dr. Sarah Patel",
      title: "Clinical Psychologist",
      image: "/api/placeholder/400/500",
      specialties: [
        "Anxiety & Depression",
        "Cultural Identity",
        "Trauma Recovery"
      ],
      bio: "Dr. Patel brings 15 years of experience in multicultural therapy, specializing in helping individuals navigate cultural identity and transition challenges."
    },
    {
      name: "Dr. Michael Chen",
      title: "Licensed Therapist",
      image: "/api/placeholder/400/500",
      specialties: [
        "Couples Therapy",
        "Family Relations",
        "Stress Management"
      ],
      bio: "With expertise in relationship dynamics and family therapy, Dr. Chen helps couples and families build stronger, more meaningful connections."
    },
    {
      name: "Dr. Maya Rodriguez",
      title: "Mental Health Counselor",
      image: "/api/placeholder/400/500",
      specialties: [
        "EMDR Therapy",
        "Anxiety Treatment",
        "Personal Growth"
      ],
      bio: "Dr. Rodriguez specializes in EMDR therapy and anxiety treatment, helping clients overcome past trauma and build resilience."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
            Our Licensed Therapists
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert professionals dedicated to supporting your mental health journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {therapists.map((therapist, index) => (
            <TherapistCard key={index} therapist={therapist} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TherapistsSection;