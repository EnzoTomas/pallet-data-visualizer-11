
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HourlyAnalysis } from "@/hooks/useHourlyAnalysis";
import { useCarouselAnimation } from "@/hooks/useCarouselAnimation";

interface HourlyDataCarouselProps {
  analysis: HourlyAnalysis;
}

export const HourlyDataCarousel = ({ analysis }: HourlyDataCarouselProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const { isAnimating, animationDirection, triggerAnimation } = useCarouselAnimation(currentPage);
  
  const itemsPerPage = 6;
  const totalPages = Math.ceil(analysis.hourlyData.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentPageItems = analysis.hourlyData.slice(startIndex, startIndex + itemsPerPage);

  const formatHour = (hour: number) => `${String(hour).padStart(2, '0')}h`;

  const getTurnoColor = (hour: number) => {
    if (hour >= 6 && hour < 14) return 'bg-blue-50 border-blue-200 text-blue-700';
    if (hour >= 14 && hour < 22) return 'bg-orange-50 border-orange-200 text-orange-700';
    return 'bg-purple-50 border-purple-200 text-purple-700';
  };

  const getTurnoName = (hour: number) => {
    if (hour >= 6 && hour < 14) return '1º Turno';
    if (hour >= 14 && hour < 22) return '2º Turno';
    return '3º Turno';
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1 && !isAnimating) {
      triggerAnimation('next');
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
      }, 200);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isAnimating) {
      triggerAnimation('prev');
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
      }, 200);
    }
  };

  const goToPage = (pageIndex: number) => {
    if (pageIndex !== currentPage && !isAnimating) {
      const direction = pageIndex > currentPage ? 'next' : 'prev';
      triggerAnimation(direction);
      setTimeout(() => {
        setCurrentPage(pageIndex);
      }, 200);
    }
  };

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
    <Card className="border-primary/10 overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Dados por Hora
        </CardTitle>
        <p className="text-xs text-muted-foreground text-center">
          Produção detalhada por período ({currentPage + 1}/{totalPages})
        </p>

        {/* Navigation controls with enhanced animations */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-2">
            <Button
              onClick={prevPage}
              disabled={currentPage === 0 || isAnimating}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 transition-all duration-300 hover:scale-105 disabled:hover:scale-100 hover:shadow-md active:scale-95"
            >
              <ChevronLeft className={`h-4 w-4 transition-transform duration-300 ${isAnimating && animationDirection === 'prev' ? '-translate-x-1' : ''}`} />
              Anterior
            </Button>
            
            {/* Enhanced pagination dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i)}
                  disabled={isAnimating}
                  className={`relative w-2 h-2 rounded-full transition-all duration-500 ease-out transform hover:scale-150 ${
                    i === currentPage 
                      ? 'bg-primary shadow-lg shadow-primary/30' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                >
                  {i === currentPage && (
                    <div className="absolute inset-0 rounded-full bg-primary animate-pulse opacity-50"></div>
                  )}
                </button>
              ))}
            </div>

            <Button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1 || isAnimating}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 transition-all duration-300 hover:scale-105 disabled:hover:scale-100 hover:shadow-md active:scale-95"
            >
              Próximo
              <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${isAnimating && animationDirection === 'next' ? 'translate-x-1' : ''}`} />
            </Button>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="p-4 relative overflow-hidden">
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
              <Card 
                key={`${hourData.hour}-${currentPage}`}
                className={`border-2 ${getTurnoColor(hourData.hour)} transition-all duration-300 hover:scale-105 hover:shadow-lg transform`}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: !isAnimating ? `fadeInUp 0.6s ease-out ${index * 50}ms both` : 'none'
                }}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-base transition-colors duration-200">{formatHour(hourData.hour)}</span>
                    <span className="text-xs px-2 py-1 bg-white/60 rounded transition-all duration-200 hover:bg-white/80">
                      {getTurnoName(hourData.hour)}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-center p-2 bg-white/50 rounded transition-all duration-200 hover:bg-white/70 hover:scale-105">
                      <div className="font-bold text-green-600 text-sm">{hourData.inseridos}</div>
                      <div className="text-xs text-muted-foreground">Inseridos</div>
                    </div>
                    <div className="text-center p-2 bg-white/50 rounded transition-all duration-200 hover:bg-white/70 hover:scale-105">
                      <div className="font-bold text-red-600 text-sm">{hourData.rejeitos}</div>
                      <div className="text-xs text-muted-foreground">Rejeitados</div>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-center text-xs text-muted-foreground">
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                      {hourData.eficiencia.toFixed(1)}% eficiência
                    </span>
                  </div>
                </CardContent>
              </Card>
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
      </CardContent>
    </Card>
  );
};

