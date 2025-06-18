
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Clock, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { ProcessedDataItem } from "@/hooks/useProcessedData";
import { useHourlyAnalysis } from "@/hooks/useHourlyAnalysis";
import { HourlyProductionChart } from "@/components/HourlyProductionChart";
import { ShiftComparisonChart } from "@/components/ShiftComparisonChart";

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

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover-lift bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Melhor Eficiência
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">
              {String(analysis.bestEfficiencyHour.hour).padStart(2, '0')}:00
            </div>
            <p className="text-xs text-green-600">
              {analysis.bestEfficiencyHour.eficiencia.toFixed(1)}% de eficiência
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Pico de Produção
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">
              {String(analysis.peakProductionHour.hour).padStart(2, '0')}:00
            </div>
            <p className="text-xs text-blue-600">
              {analysis.peakProductionHour.inseridos} inseridos
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 flex items-center gap-2">
              <TrendingDown className="h-4 w-4" />
              Menor Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">
              {String(analysis.lowestVolumeHour.hour).padStart(2, '0')}:00
            </div>
            <p className="text-xs text-orange-600">
              {analysis.lowestVolumeHour.total} total
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Média/Hora
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-purple-800">
              {Math.round(analysis.averagePerHour.inseridos)}
            </div>
            <p className="text-xs text-purple-600">
              {Math.round(analysis.averagePerHour.rejeitos)} rejeitos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Anomalias */}
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

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HourlyProductionChart hourlyData={analysis.hourlyData} />
        <ShiftComparisonChart shifts={analysis.shifts} />
      </div>
    </div>
  );
};
