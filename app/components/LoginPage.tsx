import React from 'react';
import { Brain } from 'lucide-react';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo and Title */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100">
            <Brain className="w-8 h-8 text-orange-600" />
          </div>
          
          <h1 className="text-3xl font-bold">
            <span className="text-gray-900">thera</span>
            <span className="text-orange-600">win</span>
          </h1>
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          {/* Login Button */}
          <button 
            className="w-full py-3 px-4 rounded-lg bg-orange-600 text-white font-bold
              hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 
              focus:ring-offset-2 transition-colors duration-200"
          >
            Login
          </button>

          {/* Register Button */}
          <button 
            className="w-full py-3 px-4 rounded-lg bg-white text-orange-600 font-bold 
              border-2 border-orange-200 hover:border-orange-300 
              focus:outline-none focus:ring-2 focus:ring-orange-500 
              focus:ring-offset-2 transition-colors duration-200"
          >
            Register
          </button>

          {/* Continue as Guest Button */}
          <button 
            className="w-full py-2 text-gray-600 hover:text-gray-900 text-sm font-medium
              focus:outline-none focus:ring-2 focus:ring-gray-500 
              focus:ring-offset-2 transition-colors duration-200"
          >
            Continue as guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;