
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { TrendingUp, Target, Zap, Activity } from 'lucide-react';

interface TrendData {
  date: string;
  eficiencia: number;
  meta: number;
}

interface TrendChartProps {
  trendData: TrendData[];
  currentEfficiency: number;
}

export const TrendChart = ({ trendData, currentEfficiency }: TrendChartProps) => {
  return (
    <Card className="hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white via-blue-50/30 to-blue-100/50 border-0 shadow-xl overflow-hidden scroll-animate">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-green-500 to-blue-600"></div>
      <CardHeader className="pb-6 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-gray-800">
                Análise de Performance
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">Eficiência vs Meta (75%)</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {currentEfficiency.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-500">Atual</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Indicadores de Performance */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <Target className="h-5 w-5 mx-auto text-green-600 mb-1" />
            <div className="text-lg font-bold text-green-600">75%</div>
            <div className="text-xs text-gray-600">Meta</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <Zap className="h-5 w-5 mx-auto text-yellow-600 mb-1" />
            <div className="text-lg font-bold text-yellow-600">50%</div>
            <div className="text-xs text-gray-600">Crítico</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Activity className="h-5 w-5 mx-auto text-blue-600 mb-1" />
            <div className={`text-lg font-bold ${currentEfficiency >= 75 ? 'text-green-600' : currentEfficiency >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
              {currentEfficiency >= 75 ? 'Excelente' : currentEfficiency >= 50 ? 'Atenção' : 'Crítico'}
            </div>
            <div className="text-xs text-gray-600">Status</div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorEficiencia" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorCritica" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
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
            <YAxis 
              tick={{ fontSize: 11, fill: '#6b7280' }}
              domain={[0, 100]}
            />
            
            {/* Área da zona crítica */}
            <Area
              type="monotone"
              dataKey={() => 50}
              stroke="none"
              fill="url(#colorCritica)"
              fillOpacity={0.3}
            />
            
            {/* Linha da meta */}
            <Line
              type="monotone"
              dataKey="meta"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
            
            {/* Área principal da eficiência */}
            <Area
              type="monotone"
              dataKey="eficiencia"
              stroke="#3b82f6"
              strokeWidth={3}
              fill="url(#colorEficiencia)"
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#ffffff' }}
            />
            
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
              }}
              formatter={(value: number, name: string) => {
                if (name === 'eficiencia') return [`${value.toFixed(1)}%`, 'Eficiência'];
                if (name === 'meta') return [`${value}%`, 'Meta'];
                return [value, name];
              }}
              labelFormatter={(label) => `Data: ${label}`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
