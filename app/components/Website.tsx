"use client";
import React, { useState } from 'react';

import { ArrowRight } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import StepButtons from './StepButtons';

const Website = () => {
  const [activeModal, setActiveModal] = useState(null);

  // const sections = [
  //   { id: 'survival', title: 'Daily Survival Guide', color: 'from-orange-400 to-red-400' },
  //   { id: 'tips', title: 'Practical Tips', color: 'from-blue-400 to-blue-500' },
  //   { id: 'legal', title: 'Legal Checklist', color: 'from-green-400 to-green-500' },
  //   { id: 'emergency', title: 'Emergency Info', color: 'from-yellow-400 to-orange-400' },
  //   { id: 'therawin', title: 'Therawin CTA', color: 'from-purple-400 to-pink-400' }
  // ];

  const survivalGuideContent = {
    banking: {
      title: "Banking",
      content: [
        "Choose the Right Bank: Look into national banks like Chase, Wells Fargo, or Bank of America, as well as local credit unions, which often have lower fees. Many banks offer checking accounts with minimal charges for newcomers.",
        "Set Up a Checking Account: This will be your main account for daily spending. Debit cards are widely used, and some banks offer overdraft protection to avoid accidental fees.",
        "Consider Building Credit Early: Having a credit history is essential for getting loans, better credit cards, or even renting an apartment. Start with a secured credit card if you’re new to the U.S.",
        "Use Online Banking Apps: Banks have user-friendly apps for managing your money, transferring funds, and depositing checks by taking a photo."
      ]
    },
    housing: {
      title: "Housing",
      content: [
        "Understand Rental Market Basics: Rent in California, especially in cities, can be high. It’s common to pay the first month’s rent and a security deposit upfront. Websites like Zillow, Apartments.com, and Craigslist are good places to find rentals.",
        "Lease Terms: Most rentals require a lease of at least 12 months. Check for any “move-in specials” that offer lower deposits or free months, especially if you’re looking for housing in the winter when demand is lower.",
        "Check Neighborhoods for Convenience: California cities have a range of neighborhoods, each with its own vibe. If you don’t own a car, consider places near public transit or with amenities within walking distance.",
        "Utilities: Often, renters pay for electricity, gas, internet, and sometimes water. Be sure to budget for these on top of rent."
      ]
    },
    healthcare: {
      title: "Healthcare",
      content: [
        "Health Insurance is Essential: The healthcare system here can be costly. Check if your employer offers health insurance or consider a plan through the Covered California marketplace if you’re purchasing on your own.",
        "Find a Primary Care Doctor: It’s helpful to register with a doctor early. They’ll be your go-to for non-emergencies, and many clinics can refer you to specialists if needed.",
        "Understand Urgent Care vs. ER: For non-life-threatening issues (like a mild fever or minor injury), go to an urgent care clinic. Emergency Rooms (ERs) should be saved for serious health emergencies, as they’re more expensive.",
        "Pharmacies are Everywhere: Chains like CVS and Walgreens fill prescriptions, sell health essentials, and often have in-store clinics."
      ]
    },
    transportation: {
      title: "Transportation",
      content: [
        "Consider Getting a Driver’s License: California has many beautiful places to explore, but public transport isn’t always convenient outside major cities. The California DMV (Department of Motor Vehicles) will issue a state license once you pass the tests.",
        "Public Transit: Cities like San Francisco and Los Angeles have BART, Muni, and Metro for commuting. Apps like Google Maps or Transit can help you track schedules and plan routes.",
        "Ridesharing: Services like Uber and Lyft are popular, especially if you’re in a hurry or live in a suburban area. They’re great for getting around without the hassle of parking.",
        "Cycling: California is bike-friendly in many areas. If you’re comfortable cycling, it’s a great way to save money and avoid traffic."
      ]
    }
  };

  const practicalTips = [
    {
      title: 'Grocery Stores',
      content: 'Types of Stores: California has a range of grocery stores, from budget-friendly chains like Walmart and Aldi to higher-end stores like Whole Foods and Trader Joe\'s.',
      image: '/api/placeholder/400/300'
    },
    {
      title: 'Restaurants',
      content: 'California is a food paradise! You\'ll find authentic Mexican, Asian fusion, vegan/vegetarian options, and everything in between.',
      image: '/api/placeholder/400/300'
    },
    {
      title: 'Cultural Etiquettes',
      content: 'Californians are friendly but value personal space. A simple "Hi" or "Hello" with a smile is a common greeting.',
      image: '/api/placeholder/400/300'
    },
    {
      title: 'Environmental Tips',
      content: 'Californians are environmentally conscious, so recycling and conserving water are encouraged.',
      image: '/api/placeholder/400/300'
    }
  ];

  // const scrollToSection = (id) => {
  //   document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  // };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-orange-500 to-red-500">
        <img
          src="/api/placeholder/1200/400"
          alt="California"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Your Guide to California Living
          </h1>
        </div>
      </div>

      {/* Navigation
      <div className="bg-white">
  <div className="container mx-auto py-6 px-4 flex flex-wrap justify-around gap-4">
    {sections.map((section) => (
      <button
        key={section.id}
        onClick={() => scrollToSection(section.id)}
        aria-label={`Scroll to ${section.title}`}
        className={`px-8 py-3 rounded-lg font-semibold text-white shadow-md 
                    bg-gradient-to-r ${section.color} hover:scale-105 
                    hover:shadow-lg transition-transform duration-200 ease-in-out`}
      >
        {section.title}
      </button>
    ))}
  </div>
</div> */}

      <StepButtons></StepButtons>


      {/* Daily Survival Guide */}
      <section id="survival" className="py-16 bg-gradient-to-br from-orange-50 to-red-100">
        <div className="container mx-auto px-4">
          {/* Banking Section */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
            <img src="/api/placeholder/400/300" alt="Banking" className="w-full md:w-1/2 rounded-lg shadow-lg" />
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Banking</h3>
              <ul className="space-y-2">
                {survivalGuideContent.banking.content.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <ArrowRight className="mt-1 flex-shrink-0 text-orange-500" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Housing Section */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-16">
            <img src="/api/placeholder/400/300" alt="Housing" className="w-full md:w-1/2 rounded-lg shadow-lg" />
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Housing</h3>
              <ul className="space-y-2">
                {survivalGuideContent.housing.content.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <ArrowRight className="mt-1 flex-shrink-0 text-orange-500" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Healthcare Section */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img src="/api/placeholder/400/300" alt="Healthcare" className="w-full md:w-1/2 rounded-lg shadow-lg" />
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Healthcare</h3>
              <ul className="space-y-2">
                {survivalGuideContent.healthcare.content.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <ArrowRight className="mt-1 flex-shrink-0 text-orange-500" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-16">
            <img src="/api/placeholder/400/300" alt="Transportation" className="w-full md:w-1/2 rounded-lg shadow-lg" />
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Transportation</h3>
              <ul className="space-y-2">
                {survivalGuideContent.transportation.content.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <ArrowRight className="mt-1 flex-shrink-0 text-orange-500" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Practical Tips */}
      <section id="tips" className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Practical Tips for Settling In</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {practicalTips.map((tip, index) => (
              <div key={index} className="group bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={tip.image}
                  alt={tip.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 relative">
                  <h3 className="text-xl font-bold mb-2">{tip.title}</h3>
                  <p className="text-gray-600">{tip.content.substring(0, 100)}...</p>
                  <button
                    onClick={() => setActiveModal(index)}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg 
                             hover:bg-blue-600 transition-colors flex items-center gap-2"
                  >
                    Read More <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Dialog open={activeModal !== null} onOpenChange={() => setActiveModal(null)}>
          <DialogContent className="sm:max-w-lg">
            <div className="p-6">
              {activeModal !== null && (
                <>
                  <h3 className="text-2xl font-bold mb-4">{practicalTips[activeModal].title}</h3>
                  <p className="text-gray-600">{practicalTips[activeModal].content}</p>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </section>

      {/* Legal Checklist */}
      <section id="legal" className="py-16 bg-gradient-to-br from-green-50 to-green-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img src="/api/placeholder/500/400" alt="Legal" className="w-full md:w-1/2 rounded-lg shadow-lg" />
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Legal Checklist</h2>
              <p className="mb-8 text-gray-600">Important documents and legal requirements for settling in California:</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <ArrowRight size={16} className="text-green-500" />
                  Valid passport and visa documentation
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight size={16} className="text-green-500" />
                  Social Security Card application
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight size={16} className="text-green-500" />California Drivers License requirements</li>
                <li className="flex items-center gap-2">
                  <ArrowRight size={16} className="text-green-500" />
                  Employment authorization documents
                </li>
              </ul>
              <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2">
                <ArrowRight size={20} />
                Download Checklist
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Information */}
      <section id="emergency" className="py-16 bg-gradient-to-br from-yellow-50 to-orange-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Emergency Information</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Emergency Numbers</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <ArrowRight size={16} className="text-orange-500" />
                    911 - General Emergency
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight size={16} className="text-orange-500" />
                    1-800-222-1222 - Poison Control
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Natural Disaster Preparedness</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <ArrowRight size={16} className="text-orange-500" />
                    Earthquake: Drop, Cover, Hold On
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight size={16} className="text-orange-500" />
                    Wildfire: Know evacuation routes
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Therawin CTA */}
      <section id="therawin" className="py-16 bg-gradient-to-br from-purple-50 to-pink-100">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Therawin CTA Section</h2>
          <p className="text-lg">Reserved space for future content</p>
        </div>
      </section>
    </div>
  );
};

export default Website;
