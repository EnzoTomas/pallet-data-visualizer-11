
import React from 'react';

export const AnimatedBox = () => {
  return (
    // Posição inicial da caixa, de onde ela será pega
    <div className="absolute top-4 left-4">
      <div 
        className="w-4 h-4 bg-amber-600 border-2 border-amber-700 rounded-sm shadow-lg"
        style={{
          animation: 'box-path 4s ease-in-out infinite'
        }}
      ></div>
    </div>
  );
};
