"use client"
import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Heart, Globe2, Users, Brain, MessageCircle, Star, BookOpen, Filter, Search, ArrowRight, ChevronLeft, ChevronRight, ChevronDown, Home } from 'lucide-react';

const LanguageTag = ({ language }) => (
  <div className="bg-purple-50 text-purple-700 text-xs font-medium px-3 py-1 rounded-full flex items-center">
    <Globe2 className="w-3 h-3 mr-1" aria-hidden="true" />
    <span>{language}</span>
  </div>
);

const SpecialtyTag = ({ specialty }) => (
  <div className="bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full flex items-center">
    <Brain className="w-3 h-3 mr-1" aria-hidden="true" />
    <span>{specialty}</span>
  </div>
);

const TestimonialCarousel = ({ testimonials, therapistName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const nextSlide = () => {
    if (currentIndex < testimonials.length - 1) {
      setCurrentIndex(currentIndex + 1);
      scrollRef.current.scrollTo({
        left: (currentIndex + 1) * scrollRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      scrollRef.current.scrollTo({
        left: (currentIndex - 1) * scrollRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative" aria-labelledby="testimonials-heading">
      <h4 id="testimonials-heading" className="sr-only">Client Testimonials for {therapistName}</h4>
      <div 
        ref={scrollRef}
        className="flex overflow-x-hidden snap-x snap-mandatory scroll-smooth"
        aria-live="polite"
      >
        {testimonials.map((testimonial, index) => (
          <div 
            key={index} 
            className="min-w-full snap-center"
            aria-hidden={index !== currentIndex}
          >
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mx-2">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex" aria-label={`5 star rating`}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
              </div>
              <blockquote>
                <p className="text-gray-600 text-sm italic mb-4">{testimonial.quote}</p>
                <footer className="flex items-center">
                </footer>
              </blockquote>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation buttons */}
      <button 
        onClick={prevSlide} 
        className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white p-2 rounded-full shadow-md z-10 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
        disabled={currentIndex === 0}
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-5 h-5 text-purple-600" aria-hidden="true" />
      </button>
      <button 
        onClick={nextSlide} 
        className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-white p-2 rounded-full shadow-md z-10 ${currentIndex === testimonials.length - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
        disabled={currentIndex === testimonials.length - 1}
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-5 h-5 text-purple-600" aria-hidden="true" />
      </button>
      
      {/* Indicator dots */}
      <div className="flex justify-center mt-4 space-x-2" role="tablist">
        {testimonials.map((_, index) => (
          <button 
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              scrollRef.current.scrollTo({
                left: index * scrollRef.current.offsetWidth,
                behavior: 'smooth'
              });
            }}
            className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-purple-600' : 'bg-gray-300'}`}
            aria-label={`Go to testimonial ${index + 1}`}
            role="tab"
            aria-selected={index === currentIndex}
          />
        ))}
      </div>
    </section>
  );
};

const OutreachTeamMember = ({ member }) => (
  <article className="bg-white p-4 rounded-xl shadow-sm text-center">
    <div className="w-24 h-24 mx-auto mb-3">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover rounded-full border-2 border-purple-100"
        loading="lazy"
      />
    </div>
    <h3 className="text-md font-semibold text-gray-900">{member.name}</h3>
    <p className="text-xs text-purple-600 mb-2">{member.title}</p>
    <p className="text-xs text-gray-500 line-clamp-3">{member.bio}</p>
  </article>
);

const TherapistCard = ({ therapist }) => {
  return (
    <article className="bg-white rounded-xl shadow-sm overflow-hidden mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Left Column - Image */}
        <div className="h-full bg-gradient-to-br from-purple-600 to-purple-800 p-8 flex flex-col justify-center items-center text-center">
          <div className="w-48 h-48 mb-6">
            <img
              src={therapist.image}
              alt={therapist.name}
              className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
            />
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">{therapist.name}</h2>
          <p className="text-purple-200 mb-4">{therapist.title}</p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {therapist.languages.map((language, index) => (
              <span key={index} className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
                {language}
              </span>
            ))}
          </div>
          
          <Link href="https://calendly.com/contact-therawin/consult?utm_source=home_page&utm_medium=website&utm_campaign=know_therapist" className="w-full bg-white text-purple-700 px-4 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors inline-block text-center">
            Schedule Appointment
          </Link>
        </div>
        
        {/* Right Column - Details */}
        <div className="lg:col-span-2 p-8">
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-purple-900 mb-4">About</h3>
            <p className="text-gray-600 mb-4">{therapist.bio}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-900 mb-3">Education</h3>
              <ul className="space-y-2">
                {therapist.education.map((edu, index) => (
                  <li key={index} className="flex items-start">
                    <BookOpen className="w-4 h-4 text-purple-600 mt-1 mr-2 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-600">{edu}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-purple-900 mb-3">Specialties and Expertise</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Brain className="w-4 h-4 text-purple-600 mt-1 mr-2 flex-shrink-0" aria-hidden="true" />
                  <Link href="https://therawin.health/anxiety-therapy" className="text-sm text-gray-600 hover:text-purple-600">Anxiety</Link>
                </li>
                <li className="flex items-start">
                  <Brain className="w-4 h-4 text-purple-600 mt-1 mr-2 flex-shrink-0" aria-hidden="true" />
                  <Link href="https://therawin.health/couple-therapy" className="text-sm text-gray-600 hover:text-purple-600">Couple</Link>
                </li>
                <li className="flex items-start">
                  <Brain className="w-4 h-4 text-purple-600 mt-1 mr-2 flex-shrink-0" aria-hidden="true" />
                  <Link href="https://therawin.health/teen-therapy" className="text-sm text-gray-600 hover:text-purple-600">Teen</Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-purple-900 mb-4">Client Testimonials</h3>
            <TestimonialCarousel testimonials={therapist.testimonials} therapistName={therapist.name} />
          </div>
        </div>
      </div>
    </article>
  );
};

const TherapistPage = () => {
  // Sample data - this would come from your database in a real application
  const therapists = [
    {
      id: 1,
      name: "Geetanjali Vij, LPCC",
      title: "Licensed Professional Clinical Counselor",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
      bio: "Geetanjali specializes in culturally-responsive care for immigrants and first-generation Americans. With 10+ years of experience, she combines evidence-based therapeutic techniques with mindfulness practices to help clients navigate cultural identity, trauma, and life transitions. Her work with South Asian populations has been particularly focused on addressing mental health challenges faced by immigrant communities.",
      languages: ["English", "Hindi", "Punjabi"],
      education: [
        "Master's degree, Mental Health Counseling, Boston College (2018-2020)",
        "BA, Middle East/South Asia Studies, Religious Studies, University of California, Davis (2009-2014)",
        "Certificate in Positive Youth Development, Boston College"
      ],
      approaches: [
        "Dialectical Behavior Therapy (DBT)",
        "Trauma Informed Care",
        "Acceptance & Commitment Therapy"
      ],
      testimonials: [
        {
          quote: "I am having a really good time with geet and our conversations have been going really well!",
        }
      ],
      schema: {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Geetanjali Vij",
        "jobTitle": "Licensed Professional Clinical Counselor",
        "description": "Specializes in culturally-responsive care for immigrants and first-generation Americans",
        "knowsLanguage": ["English", "Hindi", "Punjabi"],
        "alumniOf": [
          {
            "@type": "CollegeOrUniversity",
            "name": "Boston College"
          },
          {
            "@type": "CollegeOrUniversity",
            "name": "University of California, Davis"
          }
        ],
        "healthSpecialty": ["Anxiety", "Cultural Identity", "Trauma", "EMDR"]
      }
    },
    {
      id: 2,
      name: "Meera Bhadra, AMFT",
      title: "Associate Marriage and Family Therapist",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
      bio: "Meera Bhadra is an Associate Marriage and Family Therapist (AMFT) and an experienced psychology professor with over six years of teaching at community colleges, including Chabot College and Ohlone College. Her multicultural perspective, enriched by her previous work as a Clinical Psychologist in India, allows her to develop and deliver personalized individual and group therapy sessions for children, adolescents, and young adults. Meera is passionate about empowering others and is committed to fostering a safe and empathetic environment where clients can build resilience, enhance self-awareness, and achieve meaningful personal growth.",
      languages: ["English", "Hindi"],
      education: [
        "MS, Marriage and Family Therapy, California State University (2021-2023)",
        "Master's degree, Clinical Psychology, SNDT Women's University (2009-2011)",
      ],
      approaches: [
        "Teen",
        "Family",
        "Couple"
      ],
      testimonials: [],
      schema: {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Meera Bhadra",
        "jobTitle": "Associate Marriage and Family Therapist",
        "description": "Specializes in personalized individual and group therapy sessions for children, adolescents, and young adults",
        "knowsLanguage": ["English", "Hindi"],
        "alumniOf": [
          {
            "@type": "CollegeOrUniversity",
            "name": "California State University"
          },
          {
            "@type": "CollegeOrUniversity",
            "name": "SNDT Women's University"
          }
        ],
        "healthSpecialty": ["Teen", "Family", "Couple"]
      }
    },
    {
      id: 3,
      name: "Geeta Magesh, Clinical Psychologist",
      title: "Clinical Psychologist",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
      bio: "Geeta Magesh is a licensed Clinical Psychologist registered with the Rehabilitation Council of India (RCI). She holds a gold medal in Clinical Psychology from Osmania University and has been honored with the Vocational Service Award by the Rotary Club for her contributions to mental health. With over a decade of experience, Ms. Magesh specializes in conducting comprehensive psychological assessments and providing evidence-based psychotherapies to individuals, couples, children, and families facing a wide range of mental health challenges. Her person-centered approach emphasizes integrated psychotherapies aimed at enhancing resilience, emotion regulation, effective communication, stress management, and overall well-being.",
      languages: ["English", "Hindi", "Telegu"],
      education: [
        "Doctoral Researcher, BITS Pilani (2023-Present)",
        "M.Phil, Clinical Psychologist, Osmania University (2019)",
      ],
      approaches: [
        "Anxiety",
        "Couple",
        "Trauma",
      ],
      testimonials: [],
      schema: {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Geeta Magesh",
        "jobTitle": "Clinical Psychologist",
        "description": "Specializes in evidence-based psychotherapies to individuals, couples, children, and families facing a wide range of mental health challenges",
        "knowsLanguage": ["English", "Hindi", "Telegu"],
        "alumniOf": [
          {
            "@type": "CollegeOrUniversity",
            "name": "BITS Pilani"
          },
          {
            "@type": "CollegeOrUniversity",
            "name": "Osmania University"
          }
        ],
        "healthSpecialty": ["Anxiety", "Couple", "Trauma"]
      }
    }
  ];

  const outreachTeam = [
    {
      id: 1,
      name: "Naman Solanki",
      title: "Client Outreach",
      image: "/api/placeholder/100/100",
      bio: "Naman connects potential clients with TheraWin's therapeutic services, ensuring they find the right therapy options for their specific needs."
    },
    {
      id: 2,
      name: "Grandhi L Harika",
      title: "Client Outreach",
      image: "/api/placeholder/100/100",
      bio: "Harika helps individuals navigate the process of starting therapy, addressing concerns about insurance coverage and cultural fit."
    },
    {
      id: 3,
      name: "Kanna Deguchi",
      title: "Community Outreach",
      image: "/api/placeholder/100/100",
      bio: "Kanna builds relationships with immigrant community organizations to increase awareness of mental health resources and services."
    }
  ];

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "TheraWin Health",
    "description": "Culturally competent mental health care platform specifically designed to support immigrants",
    "url": "https://therawin.com",
    "sameAs": [
      "https://www.facebook.com/therawin",
      "https://www.instagram.com/therawin",
      "https://twitter.com/therawin"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "USA",
      "addressRegion": "CA"
    },
    "medicalSpecialty": "Psychiatry"
  };

  // Combined Schema
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      ...therapists.map(therapist => therapist.schema)
    ]
  };

  return (
    <>
      <Head>
        <title>Meet Our Culturally Competent Therapists | TheraWin Health</title>
        <meta name="description" content="Get to know TheraWin's licensed therapists who specialize in culturally competent mental health care for immigrants and their families." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://therawin.com/therapists" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://therawin.com/therapists" />
        <meta property="og:title" content="Meet Our Culturally Competent Therapists | TheraWin Health" />
        <meta property="og:description" content="Get to know TheraWin's licensed therapists who specialize in culturally competent mental health care for immigrants and their families." />
        <meta property="og:image" content="https://therawin.com/images/therapist-team.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://therawin.com/therapists" />
        <meta property="twitter:title" content="Meet Our Culturally Competent Therapists | TheraWin Health" />
        <meta property="twitter:description" content="Get to know TheraWin's licensed therapists who specialize in culturally competent mental health care for immigrants and their families." />
        <meta property="twitter:image" content="https://therawin.com/images/therapist-team.jpg" />
        
        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify(combinedSchema)}
        </script>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-yellow-300 to-orange-400">
        {/* Background Gradient Animation (from Hero.tsx) */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-300 animate-gradient"
          style={{
            backgroundSize: '200% 200%',
            animation: 'gradient 15s ease infinite',
            opacity: 0.9,
            zIndex: 0
          }}>
          <style>{`
            @keyframes gradient {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}</style>
        </div>

        {/* Skip to main content link for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-purple-700 focus:top-0 focus:left-0">
          Skip to main content
        </a>


        {/* Hero Section */}
        <header className="relative z-10 bg-purple-900/90 backdrop-blur-md py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-1/2 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Meet Our <span className="text-yellow-300">Therapist</span>
                </h1>
                <p className="text-lg text-purple-100 max-w-xl">
                  Our licensed therapist specializes in culturally competent care, helping immigrants and their families navigate life's challenges with compassion and understanding.
                </p>
              </div>
              
              {/* <div className="md:w-1/2 flex justify-center">
                <div className="relative rounded-xl overflow-hidden shadow-xl w-full max-w-md">
                  <img
                    src="https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?q=80&w=1000&auto=format&fit=crop"
                    alt="Smiling woman representing our welcoming therapy environment"
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent"></div>
                </div>
              </div> */}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main id="main-content" className="relative max-w-7xl mx-auto px-6 py-10 z-10">
          {/* Introduction Section */}
          <section className="bg-white/80 backdrop-blur-sm rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold text-purple-900 mb-4">Culturally Competent Mental Health Care</h2>
            <p className="text-gray-700 mb-6">
            At TheraWin Health, we know that good therapy means understanding different cultures. Our therapist gets the challenges immigrants and their families face - like adjusting to a new culture or conflicts between generations. We make sure your cultural background matters in your therapy, so you feel truly understood during your healing process.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-purple-50 rounded-lg p-4">
                <Globe2 className="w-8 h-8 text-purple-600 mx-auto mb-2" aria-hidden="true" />
                <h3 className="font-semibold text-purple-900 mb-1">100+ Clients</h3>
                <p className="text-sm text-gray-600">Therapy in your preferred language</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <Brain className="w-8 h-8 text-purple-600 mx-auto mb-2" aria-hidden="true" />
                <h3 className="font-semibold text-purple-900 mb-1">Specialized Training</h3>
                <p className="text-sm text-gray-600">In immigrant-focused mental health</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <Heart className="w-8 h-8 text-purple-600 mx-auto mb-2" aria-hidden="true" />
                <h3 className="font-semibold text-purple-900 mb-1">Compassionate Care</h3>
                <p className="text-sm text-gray-600">Creating safe spaces for healing</p>
              </div>
            </div>
          </section>

          {/* Therapist Profiles Section */}
          <section aria-labelledby="therapist-profiles-heading">
            <h2 id="therapist-profiles-heading" className="text-2xl font-semibold text-purple-900 mb-6">Our Therapist</h2>
            <div className="space-y-12">
              {therapists.map(therapist => (
                <TherapistCard key={therapist.id} therapist={therapist} />
              ))}
            </div>
          </section>
          
          {/* Outreach Team Section */}
          <section className="bg-white/80 backdrop-blur-sm rounded-xl p-8 mb-8 mt-16" aria-labelledby="outreach-team-heading">
            <h2 id="outreach-team-heading" className="text-2xl font-semibold text-purple-900 mb-2">Our Outreach Team</h2>
            <p className="text-gray-600 mb-6">
              Meet the dedicated professionals connecting our services with immigrant communities.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {outreachTeam.map(member => (
                <OutreachTeamMember key={member.id} member={member} />
              ))}
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="bg-purple-600 rounded-xl p-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-3">Ready to begin your healing journey?</h2>
                <p className="mb-6 text-purple-100">
                  Schedule a free consultation with our therapist to discuss your needs and start your path to better mental health.
                </p>
                <Link href="https://calendly.com/contact-therawin/consult?utm_source=home_page&utm_medium=website&utm_campaign=know_therapist" className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors inline-flex items-center">
                  Schedule Free Consultation
                  <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default TherapistPage;