import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../images/loading/loading.json';

const LoadingScreen = ({ theme = 'dark' }) => {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' 
        : 'bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200'
    }`}>
      {/* Background particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              theme === 'dark' ? 'bg-indigo-400/20' : 'bg-indigo-600/20'
            } animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Loading animation container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Lottie animation */}
        <div className="w-96 h-48 mb-8">
          <Lottie 
            animationData={loadingAnimation}
            loop={true}
            autoplay={true}
            className="w-full h-full"
          />
        </div>
        
        {/* Loading text */}
        <div className={`text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          <h2 className="text-2xl font-bold mb-2">Welcome to My Portfolio</h2>
          <p className="text-lg opacity-80">Preparing something amazing...</p>
        </div>
        
        {/* Progress bar */}
        <div className="mt-8 w-80 h-2 bg-gray-300/20 rounded-full overflow-hidden relative">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full absolute top-0 left-0 shadow-lg"
            style={{
              animation: 'loading-progress 3s ease-in-out infinite'
            }}
          />
          {/* Glow effect */}
          <div 
            className="h-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full absolute top-0 left-0 blur-sm opacity-60"
            style={{
              animation: 'loading-progress 3s ease-in-out infinite'
            }}
          />
        </div>
        
        {/* Loading dots */}
        <div className="flex gap-2 mt-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                theme === 'dark' ? 'bg-indigo-400' : 'bg-indigo-600'
              }`}
              style={{
                animation: `pulse 1.5s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 