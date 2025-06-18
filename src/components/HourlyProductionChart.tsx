
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';

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
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Produção por Hora - Análise Detalhada
        </CardTitle>
        <p className="text-sm text-muted-foreground text-center mt-2">
          Distribuição de inseridos e rejeitos ao longo do dia
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <BarChart 
            data={hourlyData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
            barCategoryGap="15%"
          >
            <XAxis 
              dataKey="hour" 
              tickFormatter={formatHour}
              tick={{ fontSize: 11, fill: '#64748b' }}
              axisLine={{ stroke: '#e2e8f0', strokeWidth: 1 }}
              tickLine={{ stroke: '#e2e8f0' }}
              interval={0}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: '#64748b' }} 
              axisLine={{ stroke: '#e2e8f0', strokeWidth: 1 }}
              tickLine={{ stroke: '#e2e8f0' }}
              width={40}
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
                className="bg-white/95 backdrop-blur-sm border border-primary/20 shadow-xl"
              />} 
            />
            
            {/* Linhas de referência sutis para mudanças de turno */}
            <ReferenceLine x={6} stroke="#94a3b8" strokeDasharray="2 2" strokeOpacity={0.5} />
            <ReferenceLine x={14} stroke="#94a3b8" strokeDasharray="2 2" strokeOpacity={0.5} />
            <ReferenceLine x={22} stroke="#94a3b8" strokeDasharray="2 2" strokeOpacity={0.5} />
            
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
        
        {/* Legenda atualizada com cores corretas */}
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="font-medium">1º Turno (06h-14h)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="font-medium">2º Turno (14h-22h)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span className="font-medium">3º Turno (22h-06h)</span>
              </div>
            </div>
            <div className="flex justify-center md:justify-end items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-2 bg-red-500 rounded opacity-80"></div>
                <span className="font-medium text-red-600">Rejeitos</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center border-t pt-3">
            Linhas tracejadas indicam mudanças de turno • Hover para ver valores detalhados
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
