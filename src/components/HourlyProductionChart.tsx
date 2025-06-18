
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from 'recharts';

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
      color: "hsl(var(--chart-2))",
    },
    rejeitos: {
      label: "Rejeitos",
      color: "hsl(var(--destructive))",
    },
    eficiencia: {
      label: "Eficiência (%)",
      color: "hsl(var(--chart-1))",
    },
  };

  const formatHour = (hour: number) => `${String(hour).padStart(2, '0')}:00`;

  return (
    <Card className="hover-lift">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primary">
          Produção ao Longo do Dia
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <AreaChart data={hourlyData}>
            <XAxis 
              dataKey="hour" 
              tickFormatter={formatHour}
              tick={{ fontSize: 12 }}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <ChartTooltip 
              content={<ChartTooltipContent 
                formatter={(value, name, props) => [
                  typeof value === 'number' ? Math.round(value) : value, 
                  name === 'eficiencia' ? 'Eficiência (%)' : name === 'inseridos' ? 'Inseridos' : 'Rejeitos'
                ]}
                labelFormatter={(hour) => `${formatHour(Number(hour))} - ${hourlyData[Number(hour)]?.turno || ''}`}
              />} 
            />
            
            {/* Linhas de referência para turnos */}
            <ReferenceLine x={6} stroke="#666" strokeDasharray="5 5" />
            <ReferenceLine x={14} stroke="#666" strokeDasharray="5 5" />
            <ReferenceLine x={22} stroke="#666" strokeDasharray="5 5" />
            
            <Area
              type="monotone"
              dataKey="inseridos"
              stackId="1"
              stroke="hsl(var(--chart-2))"
              fill="hsl(var(--chart-2))"
              fillOpacity={0.8}
            />
            <Area
              type="monotone"
              dataKey="rejeitos"
              stackId="1"
              stroke="hsl(var(--destructive))"
              fill="hsl(var(--destructive))"
              fillOpacity={0.8}
            />
          </AreaChart>
        </ChartContainer>
        
        <div className="mt-4 text-xs text-muted-foreground space-y-1">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-chart-2 rounded"></div>
              <span>Inseridos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-destructive rounded"></div>
              <span>Rejeitos</span>
            </div>
          </div>
          <p>Linhas tracejadas indicam mudanças de turno (06:00, 14:00, 22:00)</p>
        </div>
      </CardContent>
    </Card>
  );
};
