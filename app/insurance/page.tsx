"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Shield, Check, ArrowRight, PhoneCall, ClipboardCheck, Heart, Users, Brain, Sparkles, ChevronDown, DollarSign, Fingerprint, HeartHandshake } from 'lucide-react';
import { Globe2, MessageCircle, BookOpen } from 'lucide-react';

const OceanHero = () => (
    <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-cyan-100" />
        <div className="absolute -top-20 -right-20 md:-top-40 md:-right-40 w-40 h-40 md:w-[600px] md:h-[600px] bg-blue-200 rounded-full opacity-20" />
        <div className="absolute -bottom-10 -left-10 md:-bottom-20 md:-left-20 w-32 h-32 md:w-[400px] md:h-[400px] bg-cyan-200 rounded-full opacity-20" />

        <div className="relative px-6 md:px-8 py-10 md:py-16 max-w-7xl mx-auto">
            <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
                <div className="space-y-6 md:space-y-8">
                    <img
                        src="https://1000logos.net/wp-content/uploads/2016/10/Aetna-Logo-1024x640.png"
                        alt="Aetna Logo"
                        className="h-20 md:h-24 mx-auto md:mx-0"
                    />

                    <div className="space-y-2 md:space-y-4 text-center md:text-left">
                        <h1 className="text-4xl md:text-6xl font-bold text-blue-900">
                            Mental Health Care with
                            <span className="block mt-1 md:mt-2 text-blue-600">Aetna Insurance</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600">
                            Access quality mental healthcare with your Aetna insurance coverage
                        </p>
                    </div>

                    <div className="flex flex-col items-center md:items-start gap-2 md:gap-3">
                        {[
                            'Quick coverage verification in minutes',
                            'Low to no copay with most Aetna plans',
                            'Access to 2000+ in-network providers'
                        ].map((text, i) => (
                            <div key={i} className="flex items-center gap-2 md:gap-3 text-gray-700">
                                <Check className="w-5 h-5 md:w-6 md:h-6 text-cyan-500" />
                                <span className="text-sm md:text-lg">{text}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center md:justify-start">
                        <button className="bg-blue-600 text-white px-6 md:px-8 py-4 rounded-full font-semibold inline-flex items-center gap-2 hover:bg-blue-700 transition-colors">
                            Get A Call From Us
                            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                    </div>
                </div>

                <div className="hidden md:block relative">
                    <img
                        src="https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg"
                        alt="Therapy Session"
                        className="rounded-2xl shadow-2xl"
                    />
                </div>
            </div>
        </div>
    </div>
);

interface Stat {
    value: string;
    label: string;
    icon: React.ReactNode;
}

interface StatsTwoColumnLayoutProps {
    stats: Stat[];
}

// Option 4: Two Column Grid
const StatsTwoColumnLayout: React.FC<StatsTwoColumnLayoutProps> = ({ stats }) => (
    <div className="grid grid-cols-3 gap-4 mb-12 px-4">
        {stats.map((stat, index) => (
            <div key={index} className="bg-purple-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-purple-600 mb-1">
                    {stat.value}
                </p>
                <p className="text-xs text-gray-600">
                    {stat.label}
                </p>
            </div>
        ))}
    </div>
);

// Example usage
const StatLayouts = () => {
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

    return (
        <div>
            <StatsTwoColumnLayout stats={stats} />
        </div>
    );
};


const CulturalCompetencyCommitment = () => {
    const stats = [
        {
            value: "15+",
            label: "Languages Supported"
        },
        {
            value: "1000+",
            label: "Clients Served"
        },
    ];

    return (
        <section className="bg-white py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-2xl md:text-4xl font-bold text-purple-900 mb-3">
                        Our Commitment to Cultural Competency
                    </h2>
                    <StatLayouts />
                    <p className="text-xl text-gray-600">
                        We believe that effective therapy must acknowledge and embrace cultural differences. Our commitment to cultural competency ensures that your unique background and experiences are understood and valued throughout your healing journey.
                    </p>
                </div>
            </div>
        </section>
    );
};

const Hero = () => (
    <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50 to-purple-100" />
        <div className="absolute -top-20 -right-20 md:-top-40 md:-right-40 w-40 h-40 md:w-[600px] md:h-[600px] bg-purple-200 rounded-full opacity-20" />
        <div className="absolute -bottom-10 -left-10 md:-bottom-20 md:-left-20 w-32 h-32 md:w-[400px] md:h-[400px] bg-yellow-200 rounded-full opacity-20" />

        <div className="relative px-6 md:px-8 py-10 md:py-16 max-w-7xl mx-auto">
            <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
                <div className="space-y-6 md:space-y-8">
                    {/* Aetna Logo */}
                    <img
                        src="/api/placeholder/80/80"
                        alt="Aetna Logo"
                        className="h-20 md:h-24 mx-auto md:mx-0"
                    />

                    <div className="space-y-2 md:space-y-4 text-center md:text-left">
                        <h1 className="text-4xl md:text-6xl font-bold text-purple-900">
                            Mental Health Care with
                            <span className="block mt-1 md:mt-2 text-purple-600">Aetna Insurance</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600">
                            Access quality mental healthcare with your Aetna insurance coverage
                        </p>
                    </div>

                    <div className="flex flex-col items-center md:items-start gap-2 md:gap-3">
                        {[
                            'Quick coverage verification in minutes',
                            'Low to no copay with most Aetna plans',
                            'Access to 2000+ in-network providers'
                        ].map((t, i) => (
                            <div key={i} className="flex items-center gap-2 md:gap-3 text-gray-700">
                                <Check className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
                                <span className="text-sm md:text-lg">{t}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center md:justify-start">
                        <button className="bg-purple-600 text-white px-6 md:px-8 py-4 rounded-full font-semibold inline-flex items-center gap-2 hover:bg-purple-700 transition-colors">
                            Verify Your Aetna Coverage
                            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                    </div>
                </div>

                <div className="hidden md:block relative">
                    <img
                        src="/api/placeholder/600/500"
                        alt="Therapy Session"
                        className="rounded-2xl shadow-2xl"
                    />
                    <div className="absolute bottom-8 right-8 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3">
                        <Shield className="w-6 h-6 text-purple-600" />
                        <span className="text-gray-600 font-medium">HIPAA Compliant & Secure</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Copay Section
const Copay = () => (
    <div className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
                <h2 className="text-2xl md:text-4xl font-bold text-purple-900 mb-3 md:mb-4">
                    Transparent Coverage with Aetna
                </h2>
                <div className="space-y-4">
                    <p className="text-sm md:text-xl text-gray-600">
                        We believe in complete transparency about mental health care costs. A copay is your share of the cost for each therapy session, while Aetna covers the rest.
                    </p>
                    <p className="text-sm md:text-lg text-gray-600">
                        At TheraWin, we verify your exact coverage before your first session, so you'll never face surprise bills. We work directly with Aetna to ensure a seamless experience, letting you focus on what matters most - your mental health journey.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl md:rounded-2xl p-4 md:p-8 text-center">
                    <div className="inline-flex justify-center items-center w-12 h-12 md:w-16 md:h-16 bg-purple-600 rounded-full mb-4 md:mb-6">
                        <Shield className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-3xl md:text-5xl font-bold text-purple-900 mb-2">$0</h3>
                    <p className="text-sm md:text-lg text-purple-700">Minimum Copay</p>
                </div>

                <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl md:rounded-2xl p-4 md:p-8 text-center md:transform md:scale-105">
                    <div className="inline-flex justify-center items-center w-12 h-12 md:w-16 md:h-16 bg-purple-600 rounded-full mb-4 md:mb-6">
                        <Shield className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-3xl md:text-5xl font-bold text-purple-900 mb-2">$15-$25</h3>
                    <p className="text-sm md:text-lg text-purple-700">Typical Range</p>
                </div>

                <div className="col-span-2 md:col-span-1 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl md:rounded-2xl p-4 md:p-8 text-center">
                    <div className="inline-flex justify-center items-center w-12 h-12 md:w-16 md:h-16 bg-purple-600 rounded-full mb-4 md:mb-6">
                        <Shield className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-3xl md:text-5xl font-bold text-purple-900 mb-2">$40</h3>
                    <p className="text-sm md:text-lg text-purple-700">Maximum Copay</p>
                </div>
            </div>

            <div className="max-w-xl mx-auto">
                <button className="w-full bg-purple-600 text-white py-4 rounded-xl text-sm md:text-lg font-semibold hover:bg-purple-700 transition-colors">
                    Check Your Aetna Coverage
                </button>
            </div>
        </div>
    </div>
);

interface AccordionItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}


const AccordionItem: React.FC<AccordionItemProps> = ({
    question,
    answer,
    isOpen,
    onClick
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <button
                className="w-full px-4 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                onClick={onClick}
                aria-expanded={isOpen}
            >
                <span className="text-gray-900 font-semibold text-sm pr-4">
                    {question}
                </span>
                <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'transform rotate-180' : ''
                        }`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-200 ease-in-out ${isOpen ? 'max-h-48' : 'max-h-0'
                    }`}
            >
                <div className="px-4 pb-4 text-gray-600 text-sm">
                    {answer}
                </div>
            </div>
        </div>
    );
};

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "Does [Insurance Name] cover therapy?",
            answer: "Yes, [Insurance Name] covers mental health services including therapy sessions. Coverage details and copay amounts vary based on your specific plan. We'll verify your exact benefits during your free consultation."
        },
        {
            question: "How much will I pay per session?",
            answer: "With [Insurance Name], most clients pay between $0-$25 per session. Your exact copay depends on your specific plan benefits. We'll verify your coverage before your first session so you know exactly what to expect."
        },
        {
            question: "How long are therapy sessions?",
            answer: "Standard therapy sessions are 50 minutes long. Some specialized treatments like EMDR may require longer sessions, which we'll discuss during your consultation if relevant to your needs."
        },
        {
            question: "Can I see a therapist virtually?",
            answer: "Yes, we offer both virtual and in-person therapy sessions. [Insurance Name] covers both types of sessions, and you can choose the format that works best for you."
        },
        {
            question: "How quickly can I start therapy?",
            answer: "Most clients can start therapy within 1-2 weeks of their initial consultation. After verifying your insurance, we'll match you with a therapist and help you schedule your first session promptly."
        },
        {
            question: "What if I need to cancel a session?",
            answer: "We understand that things come up. We ask for 24 hours notice for cancellations to avoid any cancellation fees. You can easily reschedule through our platform or by contacting your therapist directly."
        }
    ];

    const handleClick = (index: any) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="px-6 py-12 bg-gray-50">
            {/* Section Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-purple-900 text-center mb-3">
                    Common Questions
                </h2>
                <p className="text-gray-600 text-center text-sm">
                    Everything you need to know about getting started
                </p>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <AccordionItem
                        key={index}
                        question={faq.question}
                        answer={faq.answer}
                        isOpen={openIndex === index}
                        onClick={() => handleClick(index)}
                    />
                ))}
            </div>

            {/* Additional Support Note */}
            <div className="mt-8 bg-white rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600">
                    Have more questions? Our care team is here to help.
                </p>
                <button className="mt-3 text-purple-600 font-semibold text-sm hover:text-purple-700">
                    Contact Support
                </button>
            </div>
        </div>
    );
};
const OceanCoverageSection = () => (
    <div className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
                <h2 className="text-2xl md:text-4xl font-bold text-blue-900 mb-3 md:mb-4">
                    Transparent Coverage with Aetna
                </h2>
                <div className="space-y-4">
                    <p className="text-sm md:text-xl text-gray-600">
                        We believe in complete transparency about mental health care costs. A copay is your share of the cost for each therapy session, while Aetna covers the rest.
                    </p>
                    <p className="text-sm md:text-lg text-gray-600">
                        At TheraWin, we verify your exact coverage before your first session, so you'll never face surprise bills.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16">
                {/* Minimum Copay Card */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl md:rounded-2xl p-4 md:p-8 text-center relative overflow-hidden group hover:shadow-lg transition-all">
                    {/* Decorative wave pattern */}
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0 50 Q 25 40, 50 50 T 100 50 V100 H0 Z" fill="currentColor" className="text-blue-500" />
                        </svg>
                    </div>

                    <div className="relative z-10">
                        <div className="inline-flex justify-center items-center w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-full mb-4 md:mb-6">
                            <Shield className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        </div>
                        <h3 className="text-3xl md:text-5xl font-bold text-blue-900 mb-2">$0</h3>
                        <p className="text-sm md:text-lg text-blue-700">Minimum Copay</p>
                    </div>
                </div>

                {/* Typical Range Card */}
                <div className="bg-gradient-to-br from-cyan-100 to-blue-200 rounded-xl md:rounded-2xl p-4 md:p-8 text-center md:transform md:scale-105 relative overflow-hidden group hover:shadow-lg transition-all">
                    {/* Decorative wave pattern */}
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0 50 Q 25 40, 50 50 T 100 50 V100 H0 Z" fill="currentColor" className="text-cyan-500" />
                        </svg>
                    </div>

                    <div className="relative z-10">
                        <div className="inline-flex justify-center items-center w-12 h-12 md:w-16 md:h-16 bg-cyan-600 rounded-full mb-4 md:mb-6">
                            <Shield className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        </div>
                        <h3 className="text-3xl md:text-5xl font-bold text-blue-900 mb-2">$15-$25</h3>
                        <p className="text-sm md:text-lg text-blue-700">Typical Range</p>
                    </div>
                </div>

                {/* Maximum Copay Card */}
                <div className="col-span-2 md:col-span-1 bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl md:rounded-2xl p-4 md:p-8 text-center relative overflow-hidden group hover:shadow-lg transition-all">
                    {/* Decorative wave pattern */}
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0 50 Q 25 40, 50 50 T 100 50 V100 H0 Z" fill="currentColor" className="text-blue-500" />
                        </svg>
                    </div>

                    <div className="relative z-10">
                        <div className="inline-flex justify-center items-center w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-full mb-4 md:mb-6">
                            <Shield className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        </div>
                        <h3 className="text-3xl md:text-5xl font-bold text-blue-900 mb-2">$40</h3>
                        <p className="text-sm md:text-lg text-blue-700">Maximum Copay</p>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-xl mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-10"></div>
                <button className="w-full relative bg-blue-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="relative z-10">Check Your Aetna Coverage</span>
                </button>
            </div>
        </div>
    </div>
);
const OceanTherapyTypes = () => {
    const [isAutoScrolling, setIsAutoScrolling] = useState(true);
    const scrollContainerRef = useRef(null);

    const therapyTypes = [
        {
            name: "Anxiety",
            icon: <Sparkles className="w-6 h-6 md:w-8 md:h-8" />,
            description: "Overcome anxiety and stress with evidence-based techniques",
            color: "bg-blue-100",
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            benefits: ["Stress management", "Panic attack control", "Worry reduction"]
        },
        {
            name: "Depression",
            icon: <Heart className="w-6 h-6 md:w-8 md:h-8" />,
            description: "Find support and healing through personalized care",
            color: "bg-cyan-50",
            iconBg: "bg-cyan-100",
            iconColor: "text-cyan-600",
            benefits: ["Mood improvement", "Energy restoration", "Life engagement"]
        },
        {
            name: "Couples",
            icon: <Users className="w-6 h-6 md:w-8 md:h-8" />,
            description: "Strengthen relationships and improve communication",
            color: "bg-blue-100",
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            benefits: ["Better communication", "Conflict resolution", "Deeper connection"]
        },
        {
            name: "Individual",
            icon: <Brain className="w-6 h-6 md:w-8 md:h-8" />,
            description: "Personal growth journey tailored to your needs",
            color: "bg-cyan-50",
            iconBg: "bg-cyan-100",
            iconColor: "text-cyan-600",
            benefits: ["Self-discovery", "Personal growth", "Life transitions"]
        }
    ];

    useEffect(() => {
        let scrollInterval: NodeJS.Timeout | undefined;

        if (isAutoScrolling && scrollContainerRef.current && window.innerWidth < 768) {
            scrollInterval = setInterval(() => {
                const container = scrollContainerRef.current as HTMLDivElement | null;

                if (container) {
                    const isAtEnd: boolean = container.scrollLeft + container.clientWidth >= container.scrollWidth;

                    if (isAtEnd) {
                        container.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        container.scrollBy({ left: 280, behavior: 'smooth' });
                    }
                }
            }, 3000);
        }
        return () => clearInterval(scrollInterval);
    }, [isAutoScrolling]);

    return (
        <div className="px-6 md:px-8 py-12 md:py-20 bg-gradient-to-b from-blue-50 to-blue-50">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-4xl font-bold text-blue-900 mb-3">
                        Covered Therapy Types with Aetna
                    </h2>
                    <div className="space-y-2">
                        <p className="text-lg text-gray-600">
                            Your Aetna insurance plan covers a wide range of therapy services
                        </p>
                        <p className="text-blue-600 text-sm md:text-base">
                            All services provided by licensed professionals
                        </p>
                    </div>
                </div>

                {/* Therapy Types Grid */}
                <div
                    ref={scrollContainerRef}
                    onTouchStart={() => setIsAutoScrolling(false)}
                    className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-4 -mx-6 px-6 md:mx-0 md:px-0 no-scrollbar"
                >
                    {therapyTypes.map((therapy, index) => (
                        <div
                            key={index}
                            className={`flex-none w-[280px] md:w-auto ${therapy.color} rounded-xl p-6 snap-center 
                                relative overflow-hidden group hover:shadow-lg transition-all duration-300`}
                        >
                            {/* Decorative wave pattern
                            <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <path d="M0 50 Q 25 40, 50 50 T 100 50 V100 H0 Z" fill="currentColor" 
                                          className={therapy.iconColor}/>
                                </svg>
                            </div> */}

                            {/* Content */}
                            <div className="relative z-10">
                                {/* Icon */}
                                <div className={`${therapy.iconBg} ${therapy.iconColor} w-12 h-12 rounded-xl 
                                    flex items-center justify-center mb-4 transition-transform 
                                    group-hover:scale-110`}>
                                    {therapy.icon}
                                </div>

                                {/* Text Content */}
                                <h3 className="font-semibold text-blue-900 mb-2 text-lg">
                                    {therapy.name} Therapy
                                </h3>
                                <p className="text-gray-600 mb-4 text-sm">
                                    {therapy.description}
                                </p>

                                {/* Benefits */}
                                <ul className="space-y-2 mb-4">
                                    {therapy.benefits.map((benefit, i) => (
                                        <li key={i} className="flex items-center text-sm text-gray-600">
                                            <div className="w-1 h-1 rounded-full bg-blue-400 mr-2"></div>
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>

                                {/* Learn More Link */}
                                <a href="#" className={`inline-flex items-center ${therapy.iconColor} 
                                    text-sm font-medium group-hover:gap-2 transition-all`}>
                                    Learn More
                                    <ArrowRight className="w-4 h-4 ml-1 transition-transform 
                                        group-hover:translate-x-1" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-12 text-center">
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-full 
                        font-semibold inline-flex items-center gap-2 hover:bg-blue-700 
                        transition-colors group relative overflow-hidden">
                        <span className="relative z-10">Schedule Your First Session</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 
                            to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                </div>
            </div>
        </div>
    );
};

const OceanHowItWorks = () => {
    const steps = [
        {
            icon: <PhoneCall className="w-6 h-6 md:w-8 md:h-8" />,
            title: "Book Free Consultation",
            description: "Schedule a free call with our care team to verify your insurance coverage.",
            color: "bg-blue-50",
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            accent: "from-blue-500"
        },
        {
            icon: <ClipboardCheck className="w-6 h-6 md:w-8 md:h-8" />,
            title: "Match with Therapist",
            description: "Our experts understand your needs and match you with the right therapist.",
            color: "bg-cyan-50",
            iconBg: "bg-cyan-100",
            iconColor: "text-cyan-600",
            accent: "from-cyan-500"
        },
        {
            icon: <Heart className="w-6 h-6 md:w-8 md:h-8" />,
            title: "Begin Your Journey",
            description: "Start your therapy sessions and get the support you deserve.",
            color: "bg-blue-50",
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            accent: "from-blue-500"
        }
    ];

    return (
        <div className="px-6 md:px-8 py-12 md:py-20">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-2xl md:text-4xl font-bold text-blue-900 mb-3">
                        How It Works
                    </h2>
                    <p className="text-lg text-gray-600">
                        Start your therapy journey in three simple steps
                    </p>
                </div>

                {/* Steps */}
                <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`${step.color} rounded-xl p-6 md:p-8 relative group 
                                hover:shadow-lg transition-all duration-300`}
                        >
                            {/* Wave Pattern Background */}
                            {/* <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <path d="M0 50 Q 25 40, 50 50 T 100 50 V100 H0 Z" 
                                          fill="currentColor" 
                                          className={step.iconColor} />
                                </svg>
                            </div> */}

                            {/* Step Number */}
                            <div className="absolute -left-2 -top-2 w-8 h-8 md:w-10 md:h-10 
                                rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 
                                text-white flex items-center justify-center text-sm md:text-base 
                                font-bold z-10">
                                {index + 1}
                            </div>

                            {/* Content */}
                            <div className="relative z-10 ml-4">
                                {/* Icon */}
                                <div className={`${step.iconBg} ${step.iconColor} w-12 h-12 md:w-16 
                                    md:h-16 rounded-xl flex items-center justify-center mb-4 
                                    md:mb-6 transition-transform group-hover:scale-110`}>
                                    {step.icon}
                                </div>

                                {/* Text */}
                                <h3 className="text-lg md:text-xl font-semibold text-blue-900 mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600">
                                    {step.description}
                                </p>
                            </div>

                            {/* Connector Line - Only on mobile */}
                            {index < steps.length - 1 && (
                                <div className="absolute left-4 bottom-0 w-0.5 h-8 
                                    bg-gradient-to-b from-blue-200 to-transparent 
                                    transform translate-y-full md:hidden" />
                            )}
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-10 md:mt-16 space-y-4 max-w-xl mx-auto">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 
                        text-white py-4 rounded-xl font-semibold hover:opacity-90 
                        transition-all duration-300 group relative overflow-hidden">
                        <span className="relative z-10">Start Free Consultation</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 
                            to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                    <p className="text-sm text-gray-500 text-center">
                        Free consultation includes insurance verification and therapist matching
                    </p>
                </div>
            </div>
        </div>
    );
};

const OceanCommitment = () => {
    const stats = [
        {
            value: "15+",
            label: "Languages Supported",
            icon: <Globe2 className="w-6 h-6 text-blue-600" />
        },
        {
            value: "1000+",
            label: "Clients Served",
            icon: <Users className="w-6 h-6 text-cyan-600" />
        },
        {
            value: "98%",
            label: "Client Satisfaction",
            icon: <Heart className="w-6 h-6 text-blue-600" />
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
        <section className="bg-gradient-to-b from-blue-50 to-blue-50 py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-2xl md:text-4xl font-bold text-blue-900 mb-3">
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
                                            className="text-blue-600" />
                                    </svg>
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <div className="flex justify-center mb-4">
                                        <div className="w-12 h-12 rounded-full bg-blue-50 
                                            flex items-center justify-center">
                                            {stat.icon}
                                        </div>
                                    </div>
                                    <p className="text-3xl font-bold text-blue-600 mb-1">
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
                                    <div className="w-12 h-12 rounded-full bg-blue-50 
                                        flex items-center justify-center mb-4 text-blue-600 
                                        group-hover:scale-110 transition-transform">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
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


const InsurancePage = () => (
    <div className="bg-white">
        <OceanHero />
        <OceanCoverageSection />
        <OceanTherapyTypes />
        <OceanHowItWorks />
        <OceanCommitment />
    </div>
);

export default InsurancePage;