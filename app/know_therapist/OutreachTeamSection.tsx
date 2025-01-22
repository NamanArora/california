import React from 'react';
import { MessageCircle, Heart, Users } from 'lucide-react';

interface OutreachMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  focus: string[];
 }

const OutreachMemberCard = ({ member }: { member: OutreachMember }) => {
  return (
    <div className="relative group">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-yellow-100 rounded-2xl transform transition-transform group-hover:scale-105" />
      
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/90 transition-colors">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Image */}
          <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 mx-auto md:mx-0">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-semibold text-purple-900 mb-1">
              {member.name}
            </h3>
            <p className="text-purple-600 font-medium mb-3">{member.role}</p>
            <p className="text-gray-600 mb-4 leading-relaxed">{member.bio}</p>

            {/* Areas of Focus */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {member.focus.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OutreachTeamSection = () => {
  const outreachTeam = [
    {
      name: "Naman Solanki",
      role: "Community Outreach Manager",
      image: "/api/placeholder/200/200",
      bio: "Priya leads our community engagement initiatives, ensuring mental health resources reach diverse communities effectively.",
      focus: ["Community Partnerships", "Cultural Programs", "Education"]
    },
    {
      name: "Harika Grandhi",
      role: "Patient Care Coordinator",
      image: "/api/placeholder/200/200",
      bio: "James helps connect clients with the right therapist and ensures a smooth care journey from start to finish.",
      focus: ["Care Navigation", "Insurance Support", "Client Success"]
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
            Meet Our Outreach Team
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dedicated to making mental health care accessible and inclusive
          </p>
        </div>

        {/* Team Stats */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <MessageCircle className="w-8 h-8 text-purple-600" />,
              stat: "24/7",
              label: "Support Available"
            },
            {
              icon: <Heart className="w-8 h-8 text-purple-600" />,
              stat: "1000+",
              label: "Lives Impacted"
            },
            {
              icon: <Users className="w-8 h-8 text-purple-600" />,
              stat: "15+",
              label: "Community Partners"
            }
          ].map((item, index) => (
            <div key={index} className="text-center bg-purple-50 rounded-xl p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                {item.icon}
              </div>
              <h3 className="text-3xl font-bold text-purple-900 mb-1">{item.stat}</h3>
              <p className="text-gray-600">{item.label}</p>
            </div>
          ))}
        </div> */}

        {/* Team Members */}
        <div className="space-y-8">
          {outreachTeam.map((member, index) => (
            <OutreachMemberCard key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OutreachTeamSection;