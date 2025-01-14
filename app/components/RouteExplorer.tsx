import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Command, Rocket, Star, ExternalLink } from 'lucide-react';

const StarWarsPlayground = () => {
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch('/api/routes');
        if (!response.ok) throw new Error('Failed to fetch routes');
        const data = await response.json();
        
        // Clean and organize routes
        const cleanedRoutes = data.routes
          .filter(route => !route.startsWith('api/') && !route.startsWith('_'))
          .map(route => {
            const cleanPath = route
              .replace(/\/page$/, '')
              .replace(/^\/?/, '')
              .replace(/\/$/, '') || 'Home';
              
            // Convert route to display name
            const displayName = cleanPath
              .split('/')
              .pop()
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');

            return {
              path: cleanPath,
              displayName,
              depth: cleanPath.split('/').length - 1
            };
          });

        setRoutes(cleanedRoutes);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  const renderStarField = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );

  const renderRoute = (route) => {
    const indent = route.depth * 16;
    
    return (
      <Link
        key={route.path}
        href={`/${route.path === 'Home' ? '' : route.path}`}
        className="group relative flex items-center p-4 hover:bg-black/30 rounded-lg transition-all duration-300 overflow-hidden"
        style={{ marginLeft: `${indent}px` }}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-transparent" />
        </div>
        
        {route.depth > 0 ? (
          <Command className="w-5 h-5 text-yellow-500 mr-3" />
        ) : (
          <Rocket className="w-5 h-5 text-yellow-500 mr-3" />
        )}
        
        <span className="text-gray-100 group-hover:text-yellow-500 transition-colors duration-300 flex-1">
          {route.displayName}
        </span>
        
        <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-yellow-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
      </Link>
    );
  };

  if (error) {
    return (
      <div className="p-6 bg-red-900/50 text-red-200 rounded-lg border border-red-500">
        Error loading routes: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 relative overflow-hidden">
      {renderStarField()}
      
      <div className="max-w-4xl mx-auto p-6 relative z-10">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 tracking-tight">
            Naman's Playground
          </h1>
          <p className="text-lg text-gray-400">
            My crazy web designs for Therawin
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent rounded-xl" />
          
          <div className="relative bg-black/40 backdrop-blur-sm rounded-xl border border-yellow-500/20 shadow-2xl shadow-yellow-500/5">
            <div className="p-6 border-b border-yellow-500/20 flex items-center space-x-3">
              <Star className="w-5 h-5 text-yellow-500" />
              <h2 className="text-xl font-semibold text-yellow-500">Available Routes</h2>
            </div>
            
            <div className="divide-y divide-yellow-500/10">
              {isLoading ? (
                <div className="p-8 text-center text-gray-500">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mb-4" />
                  <p>Scanning the galaxy...</p>
                </div>
              ) : (
                routes.map(renderRoute)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarWarsPlayground;