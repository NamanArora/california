import React from 'react';
import { Play } from 'lucide-react';

const VideoHero = () => {
  return (
    <div className="relative bg-gradient-to-br from-yellow-300 to-orange-400 py-16">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-300 opacity-90" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-purple-900 mb-4">
            Meet Our Care Team
          </h1>
          <p className="text-xl text-purple-800 max-w-2xl mx-auto">
            Dedicated professionals committed to your mental well-being
          </p>
        </div>
        
        {/* Video Placeholder Container */}
        <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
          {/* Placeholder Image with Team Photo */}
          <div className="relative aspect-video bg-purple-100">
            <img 
              src="/api/placeholder/1280/720"
              alt="Our therapy team introduction video"
              className="w-full h-full object-cover"
            />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group hover:bg-black/30 transition-colors">
              <div className="flex flex-col items-center">
                <div className="bg-purple-600 rounded-full p-4 md:p-6 transform transition-all 
                  group-hover:scale-110 group-hover:bg-purple-700">
                  <Play className="w-8 h-8 md:w-12 md:h-12 text-white" fill="white" />
                </div>
                <span className="mt-4 text-white text-lg md:text-xl font-medium">
                  Watch Team Introduction
                </span>
              </div>
            </div>

            {/* Video Duration Badge */}
            <div className="absolute bottom-4 right-4 bg-black/70 px-2 py-1 rounded text-white text-sm">
              2:15
            </div>
          </div>

          {/* Video Description */}
          <div className="bg-white p-4 text-center">
            <p className="text-gray-600">
              Learn about our approach to culturally-competent mental health care
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoHero;