
import React from 'react';

export const AnimatedBoxes = () => {
  return (
    <div className="absolute top-1 left-2">
      <div className="relative">
        {/* Caixa 1 - sendo movimentada */}
        <div 
          className="absolute w-3 h-3 bg-amber-600 border-2 border-amber-700 rounded-sm shadow-lg"
          style={{
            animation: 'boxPalletize 4s ease-in-out infinite',
            animationDelay: '0s'
          }}
        ></div>
        
        {/* Caixa 2 */}
        <div 
          className="absolute w-3 h-3 bg-orange-500 border-2 border-orange-600 rounded-sm shadow-lg"
          style={{
            animation: 'boxPalletize 4s ease-in-out infinite',
            animationDelay: '1.3s'
          }}
        ></div>
        
        {/* Caixa 3 */}
        <div 
          className="absolute w-3 h-3 bg-red-500 border-2 border-red-600 rounded-sm shadow-lg"
          style={{
            animation: 'boxPalletize 4s ease-in-out infinite',
            animationDelay: '2.6s'
          }}
        ></div>
      </div>
    </div>
  );
};
