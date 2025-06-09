
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, User, Wrench } from 'lucide-react';

interface RejectAnalysisChartsProps {
  data: any[];
}

export const RejectAnalysisCharts = ({ data }: RejectAnalysisChartsProps) => {
  // Processar dados de rejeitos por tipo
  const rejectTypeData = data.reduce((acc, item) => {
    const rejects = {
      'Erro de leitura da etiqueta': item.erroLeituraEtiqueta || 0,
      'Madeira dos pés do pallet': item.madeiraPesPallet || 0,
      'Área livre nos pés': item.areaLivrePes || 0,
      'Erro de contorno: Altura': item.erroContornoAltura || 0,
      'Erro de contorno: Direita': item.erroContornoDireita || 0,
      'Erro de contorno: Esquerda': item.erroContornoEsquerda || 0,
      'Erro de contorno: Frente': item.erroContornoFrente || 0,
      'Erro de contorno: Traseira': item.erroContornoTraseira || 0,
    };

    Object.entries(rejects).forEach(([type, count]) => {
      if (!acc[type]) acc[type] = 0;
      acc[type] += count;
    });

    return acc;
  }, {} as Record<string, number>);

  // Processar dados de responsáveis
  const responsibleData = data.reduce((acc, item) => {
    const responsible = {
      'Falha no Sensor': item.falhaSensor || 0,
      'Pallet': item.pallet || 0,
      'RN': item.rn || 0,
    };

    Object.entries(responsible).forEach(([type, count]) => {
      if (!acc[type]) acc[type] = 0;
      acc[type] += count;
    });

    return acc;
  }, {} as Record<string, number>);

  const rejectChartData = Object.entries(rejectTypeData)
    .map(([name, value]) => ({ name, value }))
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value);

  const responsibleChartData = Object.entries(responsibleData)
    .map(([name, value]) => ({ name, value }))
    .filter(item => item.value > 0);

  const colors = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6'];
  const responsibleColors = ['#ef4444', '#f59e0b', '#10b981'];

  const getResponsibleIcon = (name: string) => {
    switch(name) {
      case 'Falha no Sensor': return <Wrench className="h-4 w-4" />;
      case 'Pallet': return <AlertTriangle className="h-4 w-4" />;
      case 'RN': return <User className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Gráfico de Tipos de Rejeitos */}
      <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-red-50 border-t-4 border-t-red-500 scroll-animate">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
            Análise de Rejeitos por Tipo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={rejectChartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <defs>
                {colors.map((color, index) => (
                  <linearGradient key={index} id={`colorReject${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.9}/>
                    <stop offset="95%" stopColor={color} stopOpacity={0.7}/>
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#fee2e2" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 10, fill: '#6b7280' }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                }}
                formatter={(value: any, name: any) => [value, 'Quantidade']}
                labelFormatter={(label: any) => `Tipo: ${label}`}
              />
              <Bar 
                dataKey="value" 
                fill="url(#colorReject0)"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Responsáveis */}
      <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-orange-50 border-t-4 border-t-orange-500 scroll-animate">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
            <User className="h-5 w-5 mr-2 text-orange-500" />
            Responsabilidade por Rejeitos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={responsibleChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  animationDuration={1500}
                >
                  {responsibleChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={responsibleColors[index % responsibleColors.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                  }}
                  formatter={(value: any, name: any) => [value, 'Rejeitos']}
                />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="space-y-3">
              {responsibleChartData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border">
                  <div 
                    className="w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: responsibleColors[index % responsibleColors.length] }}
                  >
                    <span className="text-white text-xs">{getResponsibleIcon(item.name)}</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{item.name}</div>
                    <div className="text-sm text-gray-600">{item.value} rejeitos</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
