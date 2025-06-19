
import React from 'react';
import { HourlyCarouselCard } from './HourlyCarouselCard';

interface HourlyCarouselGridProps {
  currentPageItems: Array<{
    hour: number;
    inseridos: number;
    rejeitos: number;
    eficiencia: number;
  }>;
  currentPage: number;
  isAnimating: boolean;
  animationDirection: 'next' | 'prev' | null;
}

export const HourlyCarouselGrid = ({
  currentPageItems,
  currentPage,
  isAnimating,
  animationDirection
}: HourlyCarouselGridProps) => {
  // Animation classes based on direction
  const getAnimationClasses = () => {
    if (!isAnimating) return 'opacity-100 translate-x-0';
    
    if (animationDirection === 'next') {
      return 'opacity-0 -translate-x-4 scale-95';
    } else {
      return 'opacity-0 translate-x-4 scale-95';
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Animated container for grid */}
      <div 
        className={`transition-all duration-400 ease-out ${getAnimationClasses()}`}
        style={{
          transform: `${isAnimating 
            ? animationDirection === 'next' 
              ? 'translateX(-16px) scale(0.95)' 
              : 'translateX(16px) scale(0.95)'
            : 'translateX(0) scale(1)'
          }`,
          opacity: isAnimating ? 0 : 1
        }}
      >
        {/* Grid 2 columns for mobile with staggered animations */}
        <div className="grid grid-cols-2 gap-3">
          {currentPageItems.map((hourData, index) => (
            <HourlyCarouselCard
              key={`${hourData.hour}-${currentPage}`}
              hourData={hourData}
              index={index}
              currentPage={currentPage}
              isAnimating={isAnimating}
            />
          ))}
        </div>
      </div>

      {/* Loading overlay during animation */}
      {isAnimating && (
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center pointer-events-none">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};
