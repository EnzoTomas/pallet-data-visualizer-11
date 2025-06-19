
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HourlyAnalysis } from "@/hooks/useHourlyAnalysis";

interface HourlyDataCarouselProps {
  analysis: HourlyAnalysis;
}

export const HourlyDataCarousel = ({ analysis }: HourlyDataCarouselProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  
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
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Card className="border-primary/10">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Dados por Hora
        </CardTitle>
        <p className="text-xs text-muted-foreground text-center">
          Produção detalhada por período ({currentPage + 1}/{totalPages})
        </p>

        {/* Navigation controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-2">
            <Button
              onClick={prevPage}
              disabled={currentPage === 0}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === currentPage ? 'bg-primary' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              Próximo
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4">
        {/* Grid 2 columns for mobile */}
        <div className="grid grid-cols-2 gap-3">
          {currentPageItems.map((hourData) => (
            <Card 
              key={hourData.hour} 
              className={`border-2 ${getTurnoColor(hourData.hour)} transition-all duration-200`}
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-base">{formatHour(hourData.hour)}</span>
                  <span className="text-xs px-2 py-1 bg-white/60 rounded">
                    {getTurnoName(hourData.hour)}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="text-center p-2 bg-white/50 rounded">
                    <div className="font-bold text-green-600 text-sm">{hourData.inseridos}</div>
                    <div className="text-xs text-muted-foreground">Inseridos</div>
                  </div>
                  <div className="text-center p-2 bg-white/50 rounded">
                    <div className="font-bold text-red-600 text-sm">{hourData.rejeitos}</div>
                    <div className="text-xs text-muted-foreground">Rejeitados</div>
                  </div>
                </div>
                
                <div className="mt-2 text-center text-xs text-muted-foreground">
                  {hourData.eficiencia.toFixed(1)}% eficiência
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
