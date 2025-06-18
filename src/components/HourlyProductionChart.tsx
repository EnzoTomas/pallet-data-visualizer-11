
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { useIsMobile } from "@/hooks/use-mobile";

interface HourlyProductionChartProps {
  hourlyData: {
    hour: number;
    inseridos: number;
    rejeitos: number;
    total: number;
    eficiencia: number;
    turno: string;
  }[];
}

export const HourlyProductionChart = ({ hourlyData }: HourlyProductionChartProps) => {
  const isMobile = useIsMobile();
  
  const chartConfig = {
    inseridos: {
      label: "Inseridos",
      color: "#3b82f6", // Azul para dados gerais
    },
    rejeitos: {
      label: "Rejeitos", 
      color: "#f97316", // Laranja para rejeitos
    },
  };

  // Função para determinar a cor do turno
  const getTurnoColor = (hour: number) => {
    if (hour >= 6 && hour < 14) return "#3b82f6"; // Azul - Turno 1
    if (hour >= 14 && hour < 22) return "#f97316"; // Laranja - Turno 2
    return "#8b5cf6"; // Roxo - Turno 3
  };

  const formatHour = (hour: number) => `${String(hour).padStart(2, '0')}h`;

  return (
    <Card className="hover-lift shadow-lg border-primary/10">
      <CardHeader className="pb-3 md:pb-4 px-4 md:px-6">
        <CardTitle className="text-lg md:text-xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Produção por Hora - Análise Detalhada
        </CardTitle>
        <p className="text-xs md:text-sm text-muted-foreground text-center mt-2">
          Distribuição de inseridos e rejeitos ao longo do dia
        </p>
      </CardHeader>
      <CardContent className="p-2 md:p-6">
        <div className="w-full overflow-x-auto">
          <ChartContainer 
            config={chartConfig} 
            className={`w-full ${isMobile ? 'h-[320px] min-w-[600px]' : 'h-[400px]'}`}
          >
            <BarChart 
              data={hourlyData} 
              margin={{ 
                top: 20, 
                right: isMobile ? 15 : 30, 
                left: isMobile ? 15 : 20, 
                bottom: isMobile ? 30 : 40 
              }}
              barCategoryGap={isMobile ? "10%" : "15%"}
            >
              <XAxis 
                dataKey="hour" 
                tickFormatter={formatHour}
                tick={{ fontSize: isMobile ? 10 : 11, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0', strokeWidth: 1 }}
                tickLine={{ stroke: '#e2e8f0' }}
                interval={isMobile ? 1 : 0}
              />
              <YAxis 
                tick={{ fontSize: isMobile ? 10 : 11, fill: '#64748b' }} 
                axisLine={{ stroke: '#e2e8f0', strokeWidth: 1 }}
                tickLine={{ stroke: '#e2e8f0' }}
                width={isMobile ? 35 : 40}
              />
              <ChartTooltip 
                content={<ChartTooltipContent 
                  formatter={(value, name) => {
                    const formattedValue = typeof value === 'number' ? Math.round(value) : value;
                    const label = name === 'inseridos' ? 'Inseridos' : 'Rejeitos';
                    return [formattedValue, label];
                  }}
                  labelFormatter={(hour) => {
                    const hourNum = Number(hour);
                    const turnoName = hourNum >= 6 && hourNum < 14 ? '1º Turno' : 
                                     hourNum >= 14 && hourNum < 22 ? '2º Turno' : '3º Turno';
                    return `${formatHour(hourNum)} - ${turnoName}`;
                  }}
                  className="bg-white/95 backdrop-blur-sm border border-primary/20 shadow-xl text-xs"
                />} 
              />
              
              {/* Linhas de referência sutis para mudanças de turno - ocultas no mobile */}
              {!isMobile && (
                <>
                  <ReferenceLine x={6} stroke="#94a3b8" strokeDasharray="2 2" strokeOpacity={0.5} />
                  <ReferenceLine x={14} stroke="#94a3b8" strokeDasharray="2 2" strokeOpacity={0.5} />
                  <ReferenceLine x={22} stroke="#94a3b8" strokeDasharray="2 2" strokeOpacity={0.5} />
                </>
              )}
              
              {/* Barras para inseridos com cores por turno */}
              <Bar
                dataKey="inseridos"
                radius={[2, 2, 0, 0]}
                stroke="none"
              >
                {hourlyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getTurnoColor(entry.hour)} />
                ))}
              </Bar>
              
              {/* Barras para rejeitos com cor fixa */}
              <Bar
                dataKey="rejeitos"
                radius={[2, 2, 0, 0]}
                fill="#ef4444"
                stroke="none"
                opacity={0.8}
              />
            </BarChart>
          </ChartContainer>
        </div>
        
        {/* Legenda otimizada para mobile */}
        <div className="mt-4 md:mt-6 space-y-3 md:space-y-4">
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-2 gap-4'}`}>
            <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'flex-wrap justify-center md:justify-start gap-4'} text-xs md:text-sm`}>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-blue-500 rounded"></div>
                <span className="font-medium">1º Turno (06h-14h)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-orange-500 rounded"></div>
                <span className="font-medium">2º Turno (14h-22h)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-purple-500 rounded"></div>
                <span className="font-medium">3º Turno (22h-06h)</span>
              </div>
            </div>
            <div className={`flex ${isMobile ? 'justify-start' : 'justify-center md:justify-end'} items-center gap-4 text-xs md:text-sm`}>
              <div className="flex items-center gap-2">
                <div className="w-3 h-2 md:w-4 md:h-2 bg-red-500 rounded opacity-80"></div>
                <span className="font-medium text-red-600">Rejeitos</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center border-t pt-2 md:pt-3">
            {isMobile 
              ? "Deslize horizontalmente para ver todos os horários • Toque para detalhes"
              : "Linhas tracejadas indicam mudanças de turno • Hover para ver valores detalhados"
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
