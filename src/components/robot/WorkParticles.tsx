
import React from 'react';

export const WorkParticles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div 
        className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-60"
        style={{
          top: '40%',
          left: '70%',
          animation: 'workParticle 3s ease-in-out infinite',
          animationDelay: '0.5s'
        }}
      ></div>
      <div 
        className="absolute w-0.5 h-0.5 bg-orange-400 rounded-full opacity-80"
        style={{
          top: '60%',
          left: '75%',
          animation: 'workParticle 3s ease-in-out infinite',
          animationDelay: '1.8s'
        }}
      ></div>
    </div>
  );
};
