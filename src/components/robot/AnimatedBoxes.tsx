
import React from 'react';

export const AnimatedBoxes = () => {
  return (
    // Posição inicial das caixas, antes de serem pegas
    <div className="absolute top-10 left-1 w-3 h-3">
      {/* A caixa usa a MESMA animação de caminho da garra, mas com delays diferentes */}
      <div 
        className="absolute w-full h-full bg-amber-600 border-2 border-amber-700 rounded-sm shadow-lg"
        style={{
          animation: 'gripperPath 4s ease-in-out infinite',
          animationDelay: '0s'
        }}
      ></div>
      
      <div 
        className="absolute w-full h-full bg-orange-500 border-2 border-orange-600 rounded-sm shadow-lg"
        style={{
          animation: 'gripperPath 4s ease-in-out infinite',
          animationDelay: '-1.3s' // Atraso negativo para simular que já completou parte do ciclo
        }}
      ></div>
      
      <div 
        className="absolute w-full h-full bg-red-500 border-2 border-red-600 rounded-sm shadow-lg"
        style={{
          animation: 'gripperPath 4s ease-in-out infinite',
          animationDelay: '-2.6s'
        }}
      ></div>
    </div>
  );
};
