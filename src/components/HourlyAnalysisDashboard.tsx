
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Clock, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { ProcessedDataItem } from "@/hooks/useProcessedData";
import { useHourlyAnalysis } from "@/hooks/useHourlyAnalysis";
import { HourlyProductionChart } from "@/components/HourlyProductionChart";

interface HourlyAnalysisDashboardProps {
  filteredData: ProcessedDataItem[];
}

export const HourlyAnalysisDashboard = ({ filteredData }: HourlyAnalysisDashboardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const analysis = useHourlyAnalysis(filteredData);

  if (!isExpanded) {
    return (
      <Card className="hover-lift bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
        <CardContent className="p-4">
          <Button
            onClick={() => setIsExpanded(true)}
            variant="ghost"
            className="w-full flex items-center justify-between text-primary hover:bg-primary/10"
          >
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span className="font-medium">Análise Hora a Hora</span>
            </div>
            <ChevronDown className="h-5 w-5" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header com botão para fechar */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
        <CardContent className="p-4">
          <Button
            onClick={() => setIsExpanded(false)}
            variant="ghost"
            className="w-full flex items-center justify-between text-primary hover:bg-primary/10"
          >
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span className="font-medium">Análise Hora a Hora - Dashboard Detalhado</span>
            </div>
            <ChevronUp className="h-5 w-5" />
          </Button>
        </CardContent>
      </Card>

      {/* Dashboard único consolidado */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary text-center">
            Média por Hora - {filteredData.length} Dias
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Baseado em {filteredData.length} dias de dados
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Gráfico principal */}
          <div className="w-full">
            <HourlyProductionChart hourlyData={analysis.hourlyData} />
          </div>

          {/* Estatísticas principais - Linha inferior similar à imagem */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {String(analysis.peakProductionHour.hour).padStart(2, '0')}h
              </div>
              <div className="text-sm text-muted-foreground">Hora Pico</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {Math.round(analysis.averagePerHour.inseridos)}
              </div>
              <div className="text-sm text-muted-foreground">Média/Hora</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {analysis.bestEfficiencyHour.eficiencia.toFixed(0)}%
              </div>
              <div className="text-sm text-muted-foreground">Pico Eficiência</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {String(analysis.lowestVolumeHour.hour).padStart(2, '0')}h
              </div>
              <div className="text-sm text-muted-foreground">Menor Volume</div>
            </div>
          </div>

          {/* Legenda dos turnos */}
          <div className="flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>Turno 1 (06h-14h)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span>Turno 2 (14h-22h)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span>Turno 3 (22h-06h)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-red-500 rounded"></div>
              <span>Rejeitos</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Anomalias (se existirem) */}
      {analysis.anomalies.length > 0 && (
        <Card className="border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardHeader>
            <CardTitle className="text-yellow-800 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Anomalias Detectadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analysis.anomalies.map((anomaly, index) => (
                <div key={index} className="flex items-center justify-between bg-white/50 p-2 rounded">
                  <span className="text-sm font-medium">
                    {String(anomaly.hour).padStart(2, '0')}:00 - {anomaly.type}
                  </span>
                  <span className="text-sm text-red-600 font-bold">
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
