
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Clock, BarChart3, AlertTriangle, ChevronLeft, ChevronRight, Target, TrendingUp, TrendingDown } from 'lucide-react';
import { ProcessedDataItem } from "@/hooks/useProcessedData";
import { useHourlyAnalysis } from "@/hooks/useHourlyAnalysis";
import { HourlyProductionChart } from "@/components/HourlyProductionChart";
import { useIsMobile } from "@/hooks/use-mobile";

interface HourlyAnalysisDashboardProps {
  filteredData: ProcessedDataItem[];
}

export const HourlyAnalysisDashboard = ({ filteredData }: HourlyAnalysisDashboardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const analysis = useHourlyAnalysis(filteredData);
  const isMobile = useIsMobile();

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

  // Paginação para mobile - 6 itens por página (3x2)
  const itemsPerPage = 6;
  const totalPages = Math.ceil(analysis.hourlyData.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentPageItems = analysis.hourlyData.slice(startIndex, startIndex + itemsPerPage);

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

  if (!isExpanded) {
    return (
      <Card className="hover-lift bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border-2 border-primary/20 shadow-lg">
        <CardContent className="p-6">
          <Button
            onClick={() => setIsExpanded(true)}
            variant="ghost"
            className="w-full flex items-center justify-between text-primary hover:bg-primary/10 h-auto py-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <span className="font-bold text-lg block">Análise Hora a Hora</span>
                {isMobile ? (
                  <div className="text-sm text-muted-foreground">
                    <div>Clique para ver insights</div>
                    <div>detalhados de produção</div>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Clique para ver insights detalhados de produção
                  </span>
                )}
              </div>
            </div>
            <ChevronDown className="h-5 w-5" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Header com botão para fechar - título responsivo */}
      <Card className="bg-gradient-to-r from-primary/15 via-accent/10 to-primary/15 border-2 border-primary/30 shadow-lg">
        <CardContent className="p-4 md:p-6">
          <Button
            onClick={() => setIsExpanded(false)}
            variant="ghost"
            className="w-full flex items-center justify-between text-primary hover:bg-primary/10 h-auto py-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <span className="font-bold text-lg md:text-xl block">Dashboard Hora a Hora</span>
                {isMobile ? (
                  <div className="text-xs text-muted-foreground">
                    <div>Análise detalhada baseada em</div>
                    <div>{filteredData.length} dias de dados</div>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Análise detalhada baseada em {filteredData.length} dias de dados
                  </span>
                )}
              </div>
            </div>
            <ChevronUp className="h-5 w-5" />
          </Button>
        </CardContent>
      </Card>

      {/* Cards de destaques - layout horizontal para mobile */}
      <div className={`grid ${isMobile ? 'grid-cols-3 gap-2' : 'grid-cols-1 md:grid-cols-3 gap-4'}`}>
        <Card className="hover:shadow-lg transition-all duration-300 border-primary/10">
          <CardContent className={`${isMobile ? 'p-2' : 'p-3 md:p-4'} text-center`}>
            <Target className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6 md:h-8 md:w-8'} mx-auto mb-1 md:mb-2 text-green-600`} />
            <h3 className={`font-semibold ${isMobile ? 'text-xs' : 'text-xs md:text-sm'} text-muted-foreground mb-1`}>Pico de Eficiência</h3>
            <div className={`${isMobile ? 'text-sm' : 'text-xl md:text-2xl'} font-bold text-primary`}>{formatHour(analysis.bestEfficiencyHour.hour)}</div>
            <div className={`${isMobile ? 'text-xs' : 'text-xs md:text-sm'} text-muted-foreground`}>{analysis.bestEfficiencyHour.eficiencia.toFixed(1)}%</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-primary/10">
          <CardContent className={`${isMobile ? 'p-2' : 'p-3 md:p-4'} text-center`}>
            <TrendingUp className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6 md:h-8 md:w-8'} mx-auto mb-1 md:mb-2 text-blue-600`} />
            <h3 className={`font-semibold ${isMobile ? 'text-xs' : 'text-xs md:text-sm'} text-muted-foreground mb-1`}>Maior Produção</h3>
            <div className={`${isMobile ? 'text-sm' : 'text-xl md:text-2xl'} font-bold text-primary`}>{formatHour(analysis.peakProductionHour.hour)}</div>
            <div className={`${isMobile ? 'text-xs' : 'text-xs md:text-sm'} text-muted-foreground`}>{analysis.peakProductionHour.inseridos} inseridos</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-primary/10">
          <CardContent className={`${isMobile ? 'p-2' : 'p-3 md:p-4'} text-center`}>
            <TrendingDown className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6 md:h-8 md:w-8'} mx-auto mb-1 md:mb-2 text-red-600`} />
            <h3 className={`font-semibold ${isMobile ? 'text-xs' : 'text-xs md:text-sm'} text-muted-foreground mb-1`}>Menor Volume</h3>
            <div className={`${isMobile ? 'text-sm' : 'text-xl md:text-2xl'} font-bold text-primary`}>{formatHour(analysis.lowestVolumeHour.hour)}</div>
            <div className={`${isMobile ? 'text-xs' : 'text-xs md:text-sm'} text-muted-foreground`}>{analysis.lowestVolumeHour.total} total</div>
          </CardContent>
        </Card>
      </div>

      {/* Visualização principal - Carrossel no mobile, gráfico no desktop */}
      {isMobile ? (
        <Card className="border-primary/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Dados por Hora
            </CardTitle>
            <p className="text-xs text-muted-foreground text-center">
              Produção detalhada por período ({currentPage + 1}/{totalPages})
            </p>

            {/* Controles de navegação - movidos para cima */}
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
            {/* Grid 2 colunas (3x2) para mobile */}
            <div className="grid grid-cols-2 gap-3">
              {currentPageItems.map((hourData, index) => (
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
      ) : (
        <div className="w-full">
          <HourlyProductionChart hourlyData={analysis.hourlyData} />
        </div>
      )}

      {/* Estatísticas de média */}
      <Card className="hover-lift border-primary/10">
        <CardHeader className="pb-3 md:pb-4">
          <CardTitle className="text-base md:text-lg font-semibold text-primary flex items-center gap-2">
            <BarChart3 className="h-4 w-4 md:h-5 md:w-5" />
            Médias Operacionais
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            <div className="text-center p-3 md:p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <div className="text-lg md:text-2xl font-bold text-green-700">
                {Math.round(analysis.averagePerHour.inseridos)}
              </div>
              <div className="text-xs md:text-sm text-green-600 font-medium">Inseridos/Hora</div>
            </div>
            
            <div className="text-center p-3 md:p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
              <div className="text-lg md:text-2xl font-bold text-red-700">
                {Math.round(analysis.averagePerHour.rejeitos)}
              </div>
              <div className="text-xs md:text-sm text-red-600 font-medium">Rejeitos/Hora</div>
            </div>
            
            <div className="text-center p-3 md:p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <div className="text-lg md:text-2xl font-bold text-blue-700">
                {Math.round(analysis.averagePerHour.inseridos + analysis.averagePerHour.rejeitos)}
              </div>
              <div className="text-xs md:text-sm text-blue-600 font-medium">Total/Hora</div>
            </div>
            
            <div className="text-center p-3 md:p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <div className="text-lg md:text-2xl font-bold text-purple-700">
                {((analysis.averagePerHour.inseridos / (analysis.averagePerHour.inseridos + analysis.averagePerHour.rejeitos)) * 100).toFixed(1)}%
              </div>
              <div className="text-xs md:text-sm text-purple-600 font-medium">Eficiência Média</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Anomalias (se existirem) */}
      {analysis.anomalies.length > 0 && (
        <Card className="border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50 shadow-lg">
          <CardHeader className="pb-3 md:pb-4">
            <CardTitle className="text-yellow-800 flex items-center gap-2 text-base md:text-lg">
              <AlertTriangle className="h-4 w-4 md:h-5 md:w-5" />
              Anomalias Detectadas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {analysis.anomalies.map((anomaly, index) => (
                <div key={index} className="flex items-center justify-between bg-white/70 p-3 rounded-lg border border-yellow-200">
                  <div>
                    <span className="font-semibold text-yellow-800 text-sm md:text-base">
                      {String(anomaly.hour).padStart(2, '0')}:00
                    </span>
                    <p className="text-xs md:text-sm text-yellow-700">{anomaly.type}</p>
                  </div>
                  <span className="text-red-600 font-bold bg-red-100 px-2 py-1 rounded text-xs md:text-sm">
                    {anomaly.value} rejeitos
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
