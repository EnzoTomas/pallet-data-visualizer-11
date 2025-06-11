
import React from 'react';

export const RobotGripper = () => {
  return (
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
  );
};
