import React from 'react';
import { MessageCircle, Clock, Mail } from 'lucide-react';

const CompactOutreachTeamSection = () => {
  const outreachTeam = [
    {
      name: "Priya Kumar",
      role: "Community Outreach Manager",
      image: "/api/placeholder/150/150",
      contact: "priya.k@therawin.com",
      focus: ["Community Partnerships", "Cultural Programs"]
    },
    {
      name: "James Wilson",
      role: "Patient Care Coordinator",
      image: "/api/placeholder/150/150",
      contact: "james.w@therawin.com",
      focus: ["Care Navigation", "Insurance Support"]
    },
    {
      name: "Lisa Chen",
      role: "Wellness Program Director",
      image: "/api/placeholder/150/150",
      contact: "lisa.c@therawin.com",
      focus: ["Program Development", "Resource Creation"]
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - More subtle than therapist section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Support & Outreach Team
          </h2>
          <p className="text-gray-600 mt-2">
            Our dedicated team helping you navigate your mental health journey
          </p>
        </div>

        {/* Compact Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {outreachTeam.map((member, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg p-4 flex items-start gap-4 hover:shadow-md transition-shadow"
            >
              {/* Smaller Image */}
              <img
                src={member.image}
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
              
              {/* Content */}
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                <p className="text-sm text-purple-600 mb-2">{member.role}</p>
                
                {/* Focus Areas - More compact */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {member.focus.map((area, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-md"
                    >
                      {area}
                    </span>
                  ))}
                </div>
                
                {/* Contact - Subtle */}
                <div className="flex items-center text-sm text-gray-500">
                  <Mail className="w-4 h-4 mr-1" />
                  <span className="truncate">{member.contact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Contact Info - Compact Banner */}
        <div className="mt-8 bg-purple-50 rounded-lg p-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-600" />
              <span>Available Mon-Fri, 9AM-5PM PST</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-purple-600" />
              <span>Quick Response within 24 hours</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompactOutreachTeamSection;