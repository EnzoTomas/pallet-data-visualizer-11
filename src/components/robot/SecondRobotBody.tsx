
import React from 'react';

export const SecondRobotBody = () => {
  return (
    <>
      {/* Base do robô - formato hexagonal */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <div className="w-10 h-4 bg-gray-600 border border-gray-700" 
             style={{clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)'}}>
        </div>
      </div>

      {/* Corpo do robô - formato mais angular */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="relative w-7 h-9 bg-blue-500 border-2 border-blue-600 shadow-lg"
             style={{clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)'}}>
          {/* Detalhes do corpo */}
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-blue-400"></div>
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full"></div>
          
          {/* Logo/marca diferente */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white">
            P
          </div>
        </div>
      </div>

      {/* Sistema de braços articulados */}
      <div className="absolute bottom-9 left-1/2 transform -translate-x-1/2">
        {/* Braço principal */}
        <div 
          className="w-1.5 h-7 bg-blue-400 border border-blue-500 origin-bottom"
          style={{
            transformOrigin: 'bottom center',
            animation: 'second-arm-sweep 5s ease-in-out infinite'
          }}
        >
          {/* Antebraço */}
          <div 
            className="absolute top-0 left-[-1px] w-1 h-6 bg-blue-300 border border-blue-400 origin-top"
            style={{
              transformOrigin: 'top center',
              animation: 'second-forearm-swing 5s ease-in-out infinite'
            }}
          >
            {/* Garra diferente - formato de pinça */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-[-2px]">
              <div className="relative">
                {/* Base da garra */}
                <div className="w-2 h-1.5 bg-gray-700 rounded-sm border border-gray-800"></div>
                {/* Pinças */}
                <div 
                  className="absolute -left-0.5 top-0 w-0.5 h-1.5 bg-gray-600 border-gray-700"
                  style={{ 
                    transformOrigin: 'right center',
                    animation: 'second-claw-action 5s ease-in-out infinite'
                  }}
                ></div>
                <div 
                  className="absolute -right-0.5 top-0 w-0.5 h-1.5 bg-gray-600 border-gray-700"
                  style={{
                    transformOrigin: 'left center',
                    animation: 'second-claw-action 5s ease-in-out infinite'
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Caixa sendo manipulada */}
      <div 
        className="absolute bottom-6 left-4 w-2 h-2 bg-orange-500 border border-orange-600 rounded-sm"
        style={{
          animation: 'second-box-movement 5s ease-in-out infinite'
        }}
      ></div>

      {/* Pallet de destino */}
      <div className="absolute bottom-2 right-4">
        <div className="w-6 h-1 bg-amber-700 border border-amber-800 rounded-sm"></div>
        <div className="absolute top-0 left-0 w-full h-full flex justify-between">
          <div className="w-0.5 h-1 bg-amber-900"></div>
          <div className="w-0.5 h-1 bg-amber-900"></div>
          <div className="w-0.5 h-1 bg-amber-900"></div>
        </div>
      </div>

      {/* Partículas de trabalho */}
      <div className="absolute bottom-6 left-6">
        <div 
          className="w-1 h-1 bg-yellow-400 rounded-full"
          style={{
            animation: 'second-work-sparkle 5s ease-in-out infinite',
            animationDelay: '0.5s'
          }}
        ></div>
      </div>
      <div className="absolute bottom-7 left-8">
        <div 
          className="w-0.5 h-0.5 bg-yellow-300 rounded-full"
          style={{
            animation: 'second-work-sparkle 5s ease-in-out infinite',
            animationDelay: '1.2s'
          }}
        ></div>
      </div>
    </>
  );
};
