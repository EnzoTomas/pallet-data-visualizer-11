
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, Line, ComposedChart, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from 'recharts';

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
      label: "Armazenagem",
      color: "#3b82f6", // Azul similar à imagem
    },
    rejeitos: {
      label: "Rejeitos", 
      color: "#f97316", // Laranja similar à imagem
    },
  };

  const formatHour = (hour: number) => `${String(hour).padStart(2, '0')}`;

  return (
    <Card className="hover-lift">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primary">
          Rejeitos x Armazenagem (hora a hora)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ComposedChart data={hourlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="hour" 
              tickFormatter={formatHour}
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: '#000', strokeWidth: 2 }}
              tickLine={{ stroke: '#000' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              axisLine={{ stroke: '#000', strokeWidth: 2 }}
              tickLine={{ stroke: '#000' }}
            />
            <ChartTooltip 
              content={<ChartTooltipContent 
                formatter={(value, name) => [
                  typeof value === 'number' ? Math.round(value) : value, 
                  name === 'inseridos' ? 'Armazenagem' : 'Rejeitos'
                ]}
                labelFormatter={(hour) => `Hora ${formatHour(Number(hour))}:00`}
              />} 
            />
            
            {/* Linhas de referência para turnos */}
            <ReferenceLine x={6} stroke="#666" strokeDasharray="5 5" />
            <ReferenceLine x={14} stroke="#666" strokeDasharray="5 5" />
            <ReferenceLine x={22} stroke="#666" strokeDasharray="5 5" />
            
            {/* Barras para armazenagem (inseridos) */}
            <Bar
              dataKey="inseridos"
              fill="#3b82f6"
              stroke="#3b82f6"
              strokeWidth={1}
            />
            
            {/* Linha para rejeitos */}
            <Line
              type="monotone"
              dataKey="rejeitos"
              stroke="#f97316"
              strokeWidth={3}
              dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#f97316' }}
            />
          </ComposedChart>
        </ChartContainer>
        
        <div className="mt-4 text-xs text-muted-foreground space-y-1">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Armazenagem</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-orange-500 rounded"></div>
              <span>Rejeitos</span>
            </div>
          </div>
          <p>Linhas tracejadas indicam mudanças de turno (06:00, 14:00, 22:00)</p>
        </div>
      </CardContent>
    </Card>
  );
};
