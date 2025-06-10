
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { Activity } from 'lucide-react';

interface VolumeData {
  date: string;
  totalInseridos: number;
  totalRejeitos: number;
}

interface VolumeChartProps {
  volumeData: VolumeData[];
}

const CustomBarLabel = ({ x, y, width, height, value }: any) => {
  if (value === 0) return null;
  
  return (
    <text 
      x={x + width / 2} 
      y={y + height / 2} 
      fill="white" 
      textAnchor="middle" 
      dominantBaseline="middle"
      fontSize="11"
      fontWeight="bold"
      style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
    >
      {value}
    </text>
  );
};

export const VolumeChart = ({ volumeData }: VolumeChartProps) => {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-accent/5 border-t-4 border-t-accent scroll-animate">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-card-foreground flex items-center">
          <Activity className="h-5 w-5 mr-2 text-accent" />
          Volume de Produção
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={volumeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorInseridos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.7}/>
              </linearGradient>
              <linearGradient id="colorRejeitos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0.7}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 11, fill: '#6b7280' }}
              tickFormatter={(value) => {
                const [day, month] = value.split('/');
                return `${day}/${month}`;
              }}
            />
            <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value: number, name: string) => {
                if (name === 'totalInseridos') return [value, 'Inseridos'];
                if (name === 'totalRejeitos') return [value, 'Rejeitos'];
                return [value, name];
              }}
              labelFormatter={(label) => `Data: ${label}`}
            />
            <Bar 
              dataKey="totalInseridos" 
              fill="url(#colorInseridos)" 
              radius={[4, 4, 0, 0]}
              name="totalInseridos"
            >
              {volumeData.map((entry, index) => (
                <Cell key={`cell-${index}`} />
              ))}
              <CustomBarLabel />
            </Bar>
            <Bar 
              dataKey="totalRejeitos" 
              fill="url(#colorRejeitos)" 
              radius={[4, 4, 0, 0]}
              name="totalRejeitos"
            >
              {volumeData.map((entry, index) => (
                <Cell key={`cell-${index}`} />
              ))}
              <CustomBarLabel />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
