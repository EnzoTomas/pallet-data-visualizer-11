
import React from 'react';

export const RobotGripper = () => {
  return (
    // Este container agora dita o CAMINHO da garra
    <div 
      className="absolute top-2 left-1/2 transform -translate-x-1/2"
      style={{
        animation: 'gripperPath 4s ease-in-out infinite'
      }}
    >
      <div className="relative">
        {/* Centro da garra */}
        <div className="w-3 h-2 bg-gray-600 rounded border border-gray-700"></div>

        {/* Garras laterais, que cuidam da AÇÃO de abrir/fechar */}
        <div 
          className="absolute -left-1 top-0 w-1 h-2 bg-gray-500 rounded-l border border-gray-600 origin-right"
          style={{
            animation: 'gripperGrabAction 4s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="absolute -right-1 top-0 w-1 h-2 bg-gray-500 rounded-r border border-gray-600 origin-left"
          style={{
            animation: 'gripperGrabAction 4s ease-in-out infinite'
          }}
        ></div>
      </div>
    </div>
  );
};
