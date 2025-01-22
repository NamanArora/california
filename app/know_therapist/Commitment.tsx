import { Shield, Check, ArrowRight, PhoneCall, ClipboardCheck, Heart, Users, Brain, Sparkles, ChevronDown, DollarSign, Fingerprint, HeartHandshake } from 'lucide-react';
import { Globe2, MessageCircle, BookOpen } from 'lucide-react';

const OceanCommitment = () => {
    const stats = [
        {
            value: "15+",
            label: "Languages Supported",
            icon: <Globe2 className="w-6 h-6 text-purple-600" />
        },
        {
            value: "1000+",
            label: "Clients Served",
            icon: <Users className="w-6 h-6 text-purple-600" />
        },
        {
            value: "98%",
            label: "Client Satisfaction",
            icon: <Heart className="w-6 h-6 text-purple-600" />
        }
    ];

    const features = [
        {
            icon: <MessageCircle className="w-6 h-6" />,
            title: "Culturally-Aware Communication",
            description: "Our therapists understand and respect diverse cultural backgrounds."
        },
        {
            icon: <Brain className="w-6 h-6" />,
            title: "Specialized Expertise",
            description: "Experience in addressing unique challenges faced by diverse communities."
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Inclusive Environment",
            description: "Creating a welcoming space for people of all backgrounds."
        }
    ];

    return (
        <section className="bg-gradient-to-b from-purple-50 to-yellow-50 py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-2xl md:text-4xl font-bold text-purple-900 mb-3">
                        Our Commitment to Cultural Competency
                    </h2>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        {stats.map((stat, index) => (
                            <div key={index}
                                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md 
                                    transition-shadow relative overflow-hidden group">
                                {/* Wave Pattern Background */}
                                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 
                                    transition-opacity">
                                    <svg className="w-full h-full" viewBox="0 0 100 100"
                                        preserveAspectRatio="none">
                                        <path d="M0 50 Q 25 40, 50 50 T 100 50 V100 H0 Z"
                                            fill="currentColor"
                                            className="text-purple-600" />
                                    </svg>
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <div className="flex justify-center mb-4">
                                        <div className="w-12 h-12 rounded-full bg-purple-50 
                                            flex items-center justify-center">
                                            {stat.icon}
                                        </div>
                                    </div>
                                    <p className="text-3xl font-bold text-purple-600 mb-1">
                                        {stat.value}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {stat.label}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-sm 
                                hover:shadow-md transition-all group">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-12 h-12 rounded-full bg-purple-50 
                                        flex items-center justify-center mb-4 text-purple-600 
                                        group-hover:scale-110 transition-transform">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold text-purple-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We believe that effective therapy must acknowledge and embrace cultural
                        differences. Our commitment to cultural competency ensures that your
                        unique background and experiences are understood and valued throughout
                        your healing journey.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default OceanCommitment;