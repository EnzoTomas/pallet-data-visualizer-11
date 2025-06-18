
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Clock, BarChart3, Download, AlertTriangle } from 'lucide-react';
import { ProcessedDataItem } from "@/hooks/useProcessedData";
import { useHourlyAnalysis } from "@/hooks/useHourlyAnalysis";
import { HourlyProductionChart } from "@/components/HourlyProductionChart";
import { ShiftSummaryCards } from "@/components/ShiftSummaryCards";
import { ShiftComparisonChart } from "@/components/ShiftComparisonChart";
import { useDownloadHandlers } from "@/hooks/useDownloadHandlers";

interface HourlyAnalysisDashboardProps {
  filteredData: ProcessedDataItem[];
}

export const HourlyAnalysisDashboard = ({ filteredData }: HourlyAnalysisDashboardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const analysis = useHourlyAnalysis(filteredData);
  const { handlePNGDownload, handlePDFDownload } = useDownloadHandlers(filteredData, {} as any);

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
                <span className="text-sm text-muted-foreground">
                  Clique para ver insights detalhados de produção
                </span>
              </div>
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
      <Card className="bg-gradient-to-r from-primary/15 via-accent/10 to-primary/15 border-2 border-primary/30 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => setIsExpanded(false)}
              variant="ghost"
              className="flex-1 flex items-center justify-between text-primary hover:bg-primary/10 h-auto py-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <span className="font-bold text-xl block">Dashboard Hora a Hora</span>
                  <span className="text-sm text-muted-foreground">
                    Análise detalhada baseada em {filteredData.length} dias de dados
                  </span>
                </div>
              </div>
              <ChevronUp className="h-5 w-5" />
            </Button>
            
            {/* Botões de exportação */}
            <div className="flex gap-2 ml-4">
              <Button
                onClick={handlePNGDownload}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                PNG
              </Button>
              <Button
                onClick={handlePDFDownload}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cards de resumo dos turnos e destaques */}
      <ShiftSummaryCards 
        shifts={analysis.shifts}
        bestEfficiencyHour={analysis.bestEfficiencyHour}
        peakProductionHour={analysis.peakProductionHour}
        lowestVolumeHour={analysis.lowestVolumeHour}
      />

      {/* Gráfico principal de produção hora a hora */}
      <div className="w-full">
        <HourlyProductionChart hourlyData={analysis.hourlyData} />
      </div>

      {/* Gráfico de comparação entre turnos */}
      <div className="w-full">
        <ShiftComparisonChart shifts={analysis.shifts} />
      </div>

      {/* Estatísticas de média */}
      <Card className="hover-lift border-primary/10">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Médias Operacionais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <div className="text-2xl font-bold text-green-700">
                {Math.round(analysis.averagePerHour.inseridos)}
              </div>
              <div className="text-sm text-green-600 font-medium">Inseridos/Hora</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
              <div className="text-2xl font-bold text-red-700">
                {Math.round(analysis.averagePerHour.rejeitos)}
              </div>
              <div className="text-sm text-red-600 font-medium">Rejeitos/Hora</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <div className="text-2xl font-bold text-blue-700">
                {Math.round(analysis.averagePerHour.inseridos + analysis.averagePerHour.rejeitos)}
              </div>
              <div className="text-sm text-blue-600 font-medium">Total/Hora</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <div className="text-2xl font-bold text-purple-700">
                {((analysis.averagePerHour.inseridos / (analysis.averagePerHour.inseridos + analysis.averagePerHour.rejeitos)) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-purple-600 font-medium">Eficiência Média</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Anomalias (se existirem) */}
      {analysis.anomalies.length > 0 && (
        <Card className="border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-yellow-800 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Anomalias Detectadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {analysis.anomalies.map((anomaly, index) => (
                <div key={index} className="flex items-center justify-between bg-white/70 p-3 rounded-lg border border-yellow-200">
                  <div>
                    <span className="font-semibold text-yellow-800">
                      {String(anomaly.hour).padStart(2, '0')}:00
                    </span>
                    <p className="text-sm text-yellow-700">{anomaly.type}</p>
                  </div>
                  <span className="text-red-600 font-bold bg-red-100 px-2 py-1 rounded">
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
