
import React from 'react';

export const PalletRobot = () => {
  return (
    <div className="relative w-16 h-16 mx-4">
      {/* Corpo do robô */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Cabeça do robô */}
        <div className="relative">
          <div className="w-8 h-6 bg-primary rounded-t-lg border-2 border-primary/20 shadow-lg">
            {/* Olhos */}
            <div className="flex justify-center items-center pt-1 space-x-1">
              <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
              <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
          
          {/* Corpo */}
          <div className="w-10 h-8 bg-primary rounded-b-lg border-2 border-primary/20 shadow-lg -mt-1">
            {/* Painel central */}
            <div className="flex justify-center pt-1">
              <div className="w-4 h-3 bg-secondary/80 rounded border border-secondary/40"></div>
            </div>
          </div>
          
          {/* Braços */}
          <div className="absolute top-2 -left-3 w-2 h-4 bg-primary rounded border border-primary/20 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="absolute top-2 -right-3 w-2 h-4 bg-primary rounded border border-primary/20 animate-pulse" style={{ animationDelay: '0.8s' }}></div>
          
          {/* Base/Rodas */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-2 bg-primary/80 rounded-full border border-primary/20"></div>
          </div>
        </div>
      </div>
      
      {/* Caixas sendo paletizadas - animação em loop */}
      <div className="absolute top-0 right-0">
        <div className="relative">
          {/* Caixa 1 */}
          <div 
            className="absolute w-3 h-3 bg-secondary border border-secondary/40 rounded-sm shadow-sm"
            style={{
              animation: 'palletize 3s ease-in-out infinite',
              animationDelay: '0s'
            }}
          ></div>
          
          {/* Caixa 2 */}
          <div 
            className="absolute w-3 h-3 bg-accent/70 border border-accent/40 rounded-sm shadow-sm"
            style={{
              animation: 'palletize 3s ease-in-out infinite',
              animationDelay: '1s'
            }}
          ></div>
          
          {/* Caixa 3 */}
          <div 
            className="absolute w-3 h-3 bg-primary/60 border border-primary/40 rounded-sm shadow-sm"
            style={{
              animation: 'palletize 3s ease-in-out infinite',
              animationDelay: '2s'
            }}
          ></div>
        </div>
      </div>
      
      {/* Partículas de movimento */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute w-1 h-1 bg-accent/60 rounded-full"
          style={{
            top: '20%',
            left: '80%',
            animation: 'particle 2s ease-in-out infinite',
            animationDelay: '0.5s'
          }}
        ></div>
        <div 
          className="absolute w-1 h-1 bg-secondary/60 rounded-full"
          style={{
            top: '60%',
            left: '85%',
            animation: 'particle 2s ease-in-out infinite',
            animationDelay: '1.5s'
          }}
        ></div>
      </div>
      
      <style jsx>{`
        @keyframes palletize {
          0% {
            transform: translateY(-10px) translateX(0) rotate(0deg);
            opacity: 0;
          }
          20% {
            transform: translateY(-8px) translateX(-5px) rotate(5deg);
            opacity: 1;
          }
          50% {
            transform: translateY(0) translateX(-10px) rotate(0deg);
            opacity: 1;
          }
          80% {
            transform: translateY(5px) translateX(-12px) rotate(-2deg);
            opacity: 0.8;
          }
          100% {
            transform: translateY(10px) translateX(-15px) rotate(0deg);
            opacity: 0;
          }
        }
        
        @keyframes particle {
          0%, 100% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          50% {
            transform: translateY(-8px) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
