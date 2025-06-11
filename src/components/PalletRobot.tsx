
import React from 'react';

export const PalletRobot = () => {
  return (
    <div className="relative w-20 h-20 mx-4">
      {/* Base do robô */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <div className="w-12 h-3 bg-gray-700 rounded-sm border border-gray-600"></div>
      </div>
      
      {/* Corpo principal do robô (amarelo) */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
        <div className="relative w-8 h-10 bg-yellow-500 rounded-t-lg border-2 border-yellow-600 shadow-lg">
          {/* Detalhes do corpo */}
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-yellow-600 rounded"></div>
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rounded-full"></div>
          
          {/* Logo/marca */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-800">
            R
          </div>
        </div>
      </div>
      
      {/* Braço articulado - Ombro */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div 
          className="w-2 h-6 bg-yellow-500 border border-yellow-600 origin-bottom transition-transform duration-2000"
          style={{
            animation: 'shoulderMove 4s ease-in-out infinite'
          }}
        >
        </div>
      </div>
      
      {/* Braço articulado - Antebraço */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div 
          className="w-1.5 h-8 bg-yellow-400 border border-yellow-500 origin-bottom transition-transform duration-2000"
          style={{
            animation: 'armMove 4s ease-in-out infinite',
            animationDelay: '0.5s'
          }}
        >
        </div>
      </div>
      
      {/* Garra/Efetuador */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
        <div 
          className="relative"
          style={{
            animation: 'gripperMove 4s ease-in-out infinite',
            animationDelay: '1s'
          }}
        >
          {/* Centro da garra */}
          <div className="w-3 h-2 bg-gray-600 rounded border border-gray-700"></div>
          {/* Garras laterais */}
          <div className="absolute -left-1 top-0 w-1 h-2 bg-gray-500 rounded-l border border-gray-600"></div>
          <div className="absolute -right-1 top-0 w-1 h-2 bg-gray-500 rounded-r border border-gray-600"></div>
        </div>
      </div>
      
      {/* Caixas sendo paletizadas */}
      <div className="absolute top-0 right-0">
        <div className="relative">
          {/* Caixa 1 - sendo movimentada */}
          <div 
            className="absolute w-4 h-4 bg-amber-600 border-2 border-amber-700 rounded-sm shadow-lg"
            style={{
              animation: 'boxPalletize 4s ease-in-out infinite',
              animationDelay: '0s'
            }}
          ></div>
          
          {/* Caixa 2 */}
          <div 
            className="absolute w-4 h-4 bg-orange-500 border-2 border-orange-600 rounded-sm shadow-lg"
            style={{
              animation: 'boxPalletize 4s ease-in-out infinite',
              animationDelay: '1.3s'
            }}
          ></div>
          
          {/* Caixa 3 */}
          <div 
            className="absolute w-4 h-4 bg-red-500 border-2 border-red-600 rounded-sm shadow-lg"
            style={{
              animation: 'boxPalletize 4s ease-in-out infinite',
              animationDelay: '2.6s'
            }}
          ></div>
        </div>
      </div>
      
      {/* Pallet (base onde as caixas são colocadas) */}
      <div className="absolute bottom-0 right-2">
        <div className="w-8 h-1 bg-amber-800 border border-amber-900 rounded-sm"></div>
        {/* Ripas do pallet */}
        <div className="absolute top-0 left-0 w-full h-full flex justify-between">
          <div className="w-0.5 h-1 bg-amber-900"></div>
          <div className="w-0.5 h-1 bg-amber-900"></div>
          <div className="w-0.5 h-1 bg-amber-900"></div>
        </div>
      </div>
      
      {/* Partículas de movimento/trabalho */}
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
      
      <style jsx>{`
        @keyframes shoulderMove {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(-15deg); }
          50% { transform: rotate(10deg); }
          75% { transform: rotate(-5deg); }
          100% { transform: rotate(0deg); }
        }
        
        @keyframes armMove {
          0% { transform: rotate(0deg) translateY(0); }
          30% { transform: rotate(-20deg) translateY(-2px); }
          60% { transform: rotate(15deg) translateY(-4px); }
          80% { transform: rotate(-10deg) translateY(-1px); }
          100% { transform: rotate(0deg) translateY(0); }
        }
        
        @keyframes gripperMove {
          0% { 
            transform: translateX(0) translateY(0) rotate(0deg);
            opacity: 1;
          }
          20% { 
            transform: translateX(10px) translateY(-5px) rotate(5deg);
            opacity: 1;
          }
          40% { 
            transform: translateX(20px) translateY(-8px) rotate(-3deg);
            opacity: 1;
          }
          60% { 
            transform: translateX(25px) translateY(5px) rotate(2deg);
            opacity: 1;
          }
          80% { 
            transform: translateX(15px) translateY(8px) rotate(-1deg);
            opacity: 1;
          }
          100% { 
            transform: translateX(0) translateY(0) rotate(0deg);
            opacity: 1;
          }
        }
        
        @keyframes boxPalletize {
          0% {
            transform: translateX(-15px) translateY(-20px) rotate(0deg);
            opacity: 0;
          }
          15% {
            transform: translateX(-10px) translateY(-15px) rotate(2deg);
            opacity: 1;
          }
          35% {
            transform: translateX(5px) translateY(-10px) rotate(-1deg);
            opacity: 1;
          }
          55% {
            transform: translateX(15px) translateY(-5px) rotate(1deg);
            opacity: 1;
          }
          75% {
            transform: translateX(20px) translateY(5px) rotate(0deg);
            opacity: 1;
          }
          90% {
            transform: translateX(25px) translateY(12px) rotate(0deg);
            opacity: 0.8;
          }
          100% {
            transform: translateX(30px) translateY(15px) rotate(0deg);
            opacity: 0;
          }
        }
        
        @keyframes workParticle {
          0%, 100% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          40% {
            transform: translateY(-10px) scale(1);
            opacity: 1;
          }
          80% {
            transform: translateY(-15px) scale(0.8);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
};
```
