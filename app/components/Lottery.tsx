"use client"
import React, { useState, useEffect } from 'react';
import { Gift, Star, Trophy, Coins, Sparkles, PartyPopper } from 'lucide-react';

const SlotMachine = () => {
  const [spin, setSpin] = useState(false);
  const [win, setWin] = useState(false);
  const [box, setBox] = useState(false);
  const [vals, setVals] = useState(['7', '7', '7']);
  const [speed, setSpeed] = useState(100);
  const [pts, setPts] = useState(1000);
  const [btn, setBtn] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  
  const syms = ['7', '💎', '🎰', '⭐', '🎁', '🌟', '💫', '🎯'];
  const prizes = [
    { Icon: Gift, txt: 'Free Session', sub: '30 min', color: 'from-pink-500 to-purple-500' },
    { Icon: Coins, txt: '$5 Gift Card', sub: 'Amazon', color: 'from-yellow-400 to-orange-500' },
    { Icon: PartyPopper, txt: 'Mystery Box', sub: 'Special Prize', color: 'from-blue-500 to-indigo-500' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSparklePos({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  
  const doSpin = () => {
    if (spin) return;
    setBtn(true);
    setTimeout(() => setBtn(false), 300);
    setSpin(true);
    setWin(false);
    setSpeed(50);
    setPts(prev => prev - 100); // Cost per spin
    
    let n = 0;
    const max = 40;
    
    const int = setInterval(() => {
      setVals(p => p.map(() => syms[~~(Math.random() * syms.length)]));
      n++;
      if (n > max * 0.5) setSpeed(p => Math.min(300, p + 10));
      if (n >= max) {
        clearInterval(int);
        setVals(['7', '7', '7']);
        setSpin(false);
        setBox(true);
      }
    }, speed);
  };

  useEffect(() => {
    if (box) setTimeout(() => {
      setBox(false);
      setWin(true);
      setPts(prev => prev + 500); // Win amount
    }, 2000);
  }, [box]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 relative overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.6
            }}
          />
        ))}
      </div>

      {/* Moving sparkle effect */}
      <div 
        className="absolute pointer-events-none transition-all duration-1000 ease-in-out"
        style={{ left: sparklePos.x, top: sparklePos.y }}
      >
        <Sparkles className="w-6 h-6 text-yellow-400 animate-spin" />
      </div>

      {/* Stats */}
      <div className="bg-gray-800/90 backdrop-blur-md p-4 fixed top-0 w-full z-50">
        <div className="flex justify-between max-w-md mx-auto">
          <div className="flex items-center gap-2 transition-all hover:scale-110">
            <Coins className="w-6 h-6 text-yellow-400 animate-pulse" />
            <span className="text-yellow-400 font-bold">{pts}</span>
          </div>
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 font-bold animate-pulse">
            Win Big Today!
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-12 transform hover:scale-105 transition-transform">
          <Trophy className="w-16 h-16 text-yellow-400 animate-bounce mx-auto" />
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-4">
            Lucky Spin!
          </h1>
        </div>

        {/* Machine */}
        <div className="max-w-md mx-auto bg-gray-800/90 backdrop-blur-md p-8 rounded-xl shadow-2xl transform hover:scale-105 transition-all">
          {/* Slots */}
          <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6 rounded-lg mb-6 relative overflow-hidden shadow-xl border-2 border-indigo-500/30">
            {/* Cosmic sparkle background */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`
                  }}
                />
              ))}
            </div>

            {/* Rotating light streak */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 animate-rotate-light">
                <div className="absolute top-0 left-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-sm transform -translate-x-1/2" />
                <div className="absolute top-1/2 right-0 w-1 h-32 bg-gradient-to-b from-transparent via-purple-400 to-transparent blur-sm transform -translate-y-1/2" />
                <div className="absolute bottom-0 left-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent blur-sm transform -translate-x-1/2" />
                <div className="absolute top-1/2 left-0 w-1 h-32 bg-gradient-to-b from-transparent via-indigo-400 to-transparent blur-sm transform -translate-y-1/2" />
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" />
            
            {/* Slot display */}
            <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-lg border-2 border-indigo-500/30">
              <div className="flex justify-center gap-4">
                {vals.map((s, i) => (
                  <div 
                    key={i} 
                    className="w-20 h-24 bg-white rounded-lg 
                      border-2 border-indigo-400/50 flex items-center justify-center transform 
                      relative overflow-hidden shadow-xl hover:border-indigo-400/80 transition-all"
                  >
                    {/* Highlight effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white/50" />
                    
                    {/* Symbol container */}
                    <div className={`relative ${spin ? 'animate-slot-spin' : ''} transform transition-all duration-300`}>
                      <span className="text-4xl filter drop-shadow-lg">{s}</span>
                      
                      {/* Blur effect during spin */}
                      {spin && (
                        <div className="absolute inset-0 backdrop-blur-sm" />
                      )}
                    </div>
                    
                    {/* Slot machine lines */}
                    <div className="absolute inset-0 flex flex-col justify-between opacity-30">
                      <div className="h-px bg-gray-400" />
                      <div className="h-px bg-gray-400" />
                      <div className="h-px bg-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Machine details */}
            <div className="mt-4 flex justify-between px-2">
              <div className="text-gray-500 text-sm">Triple 7 to win!</div>
              <div className="text-gray-500 text-sm">100 coins per spin</div>
            </div>
          </div>
          
          {/* Custom spinning keyframes */}
          <style jsx global>{`
            @keyframes slot-spin {
              0% { 
                transform: translateY(0);
                filter: blur(0);
              }
              50% { 
                transform: translateY(-200%);
                filter: blur(4px);
              }
              100% { 
                transform: translateY(-400%);
                filter: blur(0);
              }
            }
            
            .animate-slot-spin {
              animation: slot-spin 0.3s linear infinite;
            }

            @keyframes rotate-light {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
            
            .animate-rotate-light {
              animation: rotate-light 3s linear infinite;
            }

            @keyframes twinkle {
              0%, 100% { opacity: 0; }
              50% { opacity: 1; }
            }

            .animate-twinkle {
              animation: twinkle 2s ease-in-out infinite;
            }

            @keyframes glow {
              0%, 100% { opacity: 0.1; }
              50% { opacity: 0.3; }
            }

            .animate-glow {
              animation: glow 2s ease-in-out infinite;
            }
          `}</style>

          {/* Button */}
          <button
            onClick={doSpin}
            disabled={spin}
            className={`w-32 h-32 mx-auto block rounded-full bg-gradient-to-br from-red-500 to-red-700
              transition-all duration-300 relative overflow-hidden
              ${btn ? 'scale-95' : 'hover:scale-105'}
              ${spin ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-red-500/50'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent animate-pulse" />
            <span className="text-white font-bold text-2xl relative z-10">
              {spin ? '...' : 'SPIN!'}
            </span>
          </button>
        </div>

        {/* Prizes */}
        <div className="max-w-md mx-auto mt-8 bg-purple-900/50 backdrop-blur-md p-6 rounded-xl transform hover:scale-105 transition-all">
          <h3 className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 text-center mb-4">
            Prizes
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {prizes.map(({ Icon, txt, sub, color }, i) => (
              <div 
                key={i} 
                className={`bg-gradient-to-br ${color} p-4 rounded-lg text-center
                  transform hover:scale-110 transition-all hover:shadow-lg hover:shadow-purple-500/50`}
              >
                <Icon className="w-8 h-8 text-white mx-auto mb-2 animate-bounce" />
                <p className="text-white font-bold">{txt}</p>
                <p className="text-white/80 text-sm">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gift Box */}
      {box && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="w-64 h-64 animate-bounce">
            <Gift className="w-full h-full text-yellow-400 animate-pulse" />
          </div>
        </div>
      )}

      {/* Win Modal */}
      {win && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-8 rounded-xl text-center max-w-sm
            transform animate-modalPop shadow-2xl">
            <Star className="w-16 h-16 text-white mx-auto mb-4 animate-spin" />
            <h2 className="text-3xl font-bold text-white mb-4">You Won!</h2>
            <p className="text-white text-xl mb-6">Free Therapy Session</p>
            <button
              onClick={() => setWin(false)}
              className="bg-white text-yellow-600 px-8 py-3 rounded-lg font-bold 
                hover:scale-105 transition-transform hover:shadow-lg"
            >
              Claim
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlotMachine;