
import React from 'react';

export const RobotGripper = () => {
  return (
    <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
      <div 
        className="relative"
        style={{
          animation: 'gripperMove 4s ease-in-out infinite'
        }}
      >
        {/* Centro da garra */}
        <div className="w-3 h-2 bg-gray-600 rounded border border-gray-700"></div>
        {/* Garras laterais com animação de abertura/fechamento */}
        <div 
          className="absolute -left-1 top-0 w-1 h-2 bg-gray-500 rounded-l border border-gray-600 origin-right"
          style={{
            animation: 'gripperGrab 4s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="absolute -right-1 top-0 w-1 h-2 bg-gray-500 rounded-r border border-gray-600 origin-left"
          style={{
            animation: 'gripperGrab 4s ease-in-out infinite'
          }}
        ></div>
      </div>
    </div>
  );
};
