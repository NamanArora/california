import React from 'react';
import { 
  Rocket, 
  Sparkles, 
  Laptop, 
  Target,
  Crown,
  ArrowRight,
  User,
  TrendingUp,
  Briefcase,
  Clock,
  Smartphone,
  Brain,
  Cpu,
  Search,
  Dumbbell,
  Zap,
  Heart,
  Shield,
  Palette,
  Leaf,
  CircleUser,
  Smile,
  Award,
  Star,
  Flame
} from 'lucide-react';

const categories = {
  "Personal Growth Accelerator": {
    icon: Rocket,
    color: "indigo",
    shortcuts: [
      {
        name: "Personal Brand Builder",
        color: "indigo",
        baseColor: "indigo",
        icon: User
      },
      {
        name: "Career Growth Accelerator",
        color: "violet",
        baseColor: "indigo",
        icon: TrendingUp
      },
      {
        name: "Financial Wellness",
        color: "fuchsia",
        baseColor: "indigo",
        icon: Briefcase
      },
      {
        name: "Dating Confidence Builder",
        color: "purple",
        baseColor: "indigo",
        icon: Heart
      }
    ]
  },
  "Digital Wellness Master": {
    icon: Laptop,
    color: "sky",
    shortcuts: [
      {
        name: "Digital Detox",
        color: "sky",
        baseColor: "sky",
        icon: Smartphone
      },
      {
        name: "Social Media Mindfulness",
        color: "cyan",
        baseColor: "sky",
        icon: Brain
      },
      {
        name: "Become Iron Man/Tech Genius",
        color: "teal",
        baseColor: "sky",
        icon: Cpu
      },
      {
        name: "Social Media Mindfulness",
        color: "blue",
        baseColor: "sky",
        icon: Search
      }
    ]
  },
  "Body & Mind Champion": {
    icon: Crown,
    color: "amber",
    shortcuts: [
      {
        name: "Superhero Physique",
        color: "amber",
        baseColor: "amber",
        icon: Dumbbell
      },
      {
        name: "Become Batman Training",
        color: "orange",
        baseColor: "amber",
        icon: Zap
      },
      {
        name: "Confidence & Charisma Builder",
        color: "yellow",
        baseColor: "amber",
        icon: Shield
      },
      {
        name: "Creative Expression",
        color: "lime",
        baseColor: "amber",
        icon: Palette
      }
    ]
  },
  "Sustainable Growth": {
    icon: Sparkles,
    color: "rose",
    shortcuts: [
      {
        name: "Creative Expression",
        color: "rose",
        baseColor: "rose",
        icon: Palette
      },
      {
        name: "Sustainable Living",
        color: "pink",
        baseColor: "rose",
        icon: Leaf
      },
      {
        name: "Side Hustle Starter",
        color: "fuchsia",
        baseColor: "rose",
        icon: Briefcase
      },
      {
        name: "Career Growth Accelerator",
        color: "purple",
        baseColor: "rose",
        icon: TrendingUp
      }
    ]
  },
  "New Year Success": {
    icon: Target,
    color: "emerald",
    shortcuts: [
      {
        name: "New Year Reset",
        color: "emerald",
        baseColor: "emerald",
        icon: Target
      },
      {
        name: "December Preparation Protocol",
        color: "green",
        baseColor: "emerald",
        icon: Star
      },
      {
        name: "January Jump-Start",
        color: "teal",
        baseColor: "emerald",
        icon: Award
      },
      {
        name: "Time Management Superhero",
        color: "cyan",
        baseColor: "emerald",
        icon: Clock
      }
    ]
  }
};

const ShortcutCategories = () => {
  return (
    <div className="space-y-8 bg-white min-h-screen py-6">
      {Object.entries(categories).map(([categoryName, category]) => {
        const IconComponent = category.icon;
        
        return (
          <div key={categoryName} className="space-y-4">
            <div className="px-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-full bg-${category.color}-100 text-${category.color}-600`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <h2 className="font-bold text-2xl text-white">{categoryName}</h2>
              </div>
            </div>

            <div className="relative">
              <div className="flex overflow-x-auto pb-4 gap-4 px-4 hide-scrollbar">
                {category.shortcuts.map((shortcut, index) => (
                  <button 
                    key={index}
                    className="relative flex-shrink-0 group 
                      w-64 h-32 rounded-2xl overflow-hidden
                      shadow-lg hover:shadow-xl transition-all duration-300
                      hover:scale-[1.02]"
                  >
                    <div className={`absolute inset-0 bg-${shortcut.color}-500`}>
                      {/* Icon in top left */}
                      <div className="absolute top-3 left-3">
                        {React.createElement(shortcut.icon, { 
                          className: "w-6 h-6 text-white/90" 
                        })}
                      </div>
                    </div>
                    
                    <div className={`absolute bottom-0 left-0 right-0 h-12
                      bg-${shortcut.color}-600/90 border-t border-white/10`}>
                      <div className="relative h-full w-full flex items-center justify-center">
                        <h3 className="text-white font-semibold text-lg leading-tight text-center flex items-center gap-2">
                          {shortcut.name}
                          <ArrowRight className="w-5 h-5 text-white/90 
                            transform transition-transform duration-300
                            group-hover:translate-x-1" />
                        </h3>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {/* <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style> */}
    </div>
  );
};

export default ShortcutCategories;