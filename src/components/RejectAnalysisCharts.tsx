import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LabelList } from 'recharts';
import { AlertTriangle, User, Wrench, Target, Zap } from 'lucide-react';
interface RejectAnalysisChartsProps {
  data: any[];
}
export const RejectAnalysisCharts = ({
  data
}: RejectAnalysisChartsProps) => {
  // Processar dados de rejeitos por tipo
  const rejectTypeData = data.reduce((acc, item) => {
    const rejects = {
      'Erro de leitura da etiqueta': Number(item.erroLeituraEtiqueta) || 0,
      'Madeira dos pés do pallet': Number(item.madeiraPesPallet) || 0,
      'Área livre nos pés': Number(item.areaLivrePes) || 0,
      'Erro de contorno: Altura': Number(item.erroContornoAltura) || 0,
      'Erro de contorno: Direita': Number(item.erroContornoDireita) || 0,
      'Erro de contorno: Esquerda': Number(item.erroContornoEsquerda) || 0,
      'Erro de contorno: Frente': Number(item.erroContornoFrente) || 0,
      'Erro de contorno: Traseira': Number(item.erroContornoTraseira) || 0
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
      'Falha no Sensor': Number(item.falhaSensor) || 0,
      'Pallet': Number(item.pallet) || 0,
      'RN': Number(item.rn) || 0
    };
    Object.entries(responsible).forEach(([type, count]) => {
      if (!acc[type]) acc[type] = 0;
      acc[type] += count;
    });
    return acc;
  }, {} as Record<string, number>);
  const rejectChartData = Object.entries(rejectTypeData).map(([name, value]) => ({
    name: name.replace('Erro de contorno: ', '').replace('Erro de ', ''),
    fullName: name,
    value: Number(value),
    percentage: 0
  })).filter(item => item.value > 0).sort((a, b) => b.value - a.value);

  // Calcular percentuais
  const totalRejects = rejectChartData.reduce((sum, item) => sum + item.value, 0);
  rejectChartData.forEach(item => {
    item.percentage = totalRejects > 0 ? item.value / totalRejects * 100 : 0;
  });
  const responsibleChartData = Object.entries(responsibleData).map(([name, value]) => ({
    name,
    value: Number(value)
  })).filter(item => item.value > 0);
  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'];
  const responsibleColors = ['#ef4444', '#f97316', '#3b82f6'];
  const getResponsibleIcon = (name: string) => {
    switch (name) {
      case 'Falha no Sensor':
        return <Wrench className="h-4 w-4" />;
      case 'Pallet':
        return <AlertTriangle className="h-4 w-4" />;
      case 'RN':
        return <User className="h-4 w-4" />;
      default:
        return null;
    }
  };
  const getRejectIcon = (name: string) => {
    if (name.includes('Contorno') || name.includes('Altura') || name.includes('Direita') || name.includes('Esquerda') || name.includes('Frente') || name.includes('Traseira')) {
      return <Target className="h-5 w-5" />;
    }
    if (name.includes('Etiqueta') || name.includes('leitura')) {
      return <Zap className="h-5 w-5" />;
    }
    return <AlertTriangle className="h-5 w-5" />;
  };
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    value
  }: any) => {
    if (percent < 0.05) return null;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="12" fontWeight="bold" style={{
      textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
    }}>
        {value}
      </text>;
  };
  return <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Dashboard de Rejeitos - Somente Cards */}
      <Card className="hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white via-red-50/30 to-red-100/50 border-0 shadow-xl overflow-hidden scroll-animate">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"></div>
        <CardHeader className="pb-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-red-500/10 rounded-xl">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  Análise de Rejeitos
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">Distribuição por categoria</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-red-600">{totalRejects}</div>
              <div className="text-xs text-gray-500">Total de rejeitos</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {rejectChartData.length > 0 ? <div className="grid grid-cols-1 gap-3">
              {rejectChartData.map((item, index) => <div key={item.name} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg" style={{
                backgroundColor: `${colors[index]}20`,
                color: colors[index]
              }}>
                      {getRejectIcon(item.fullName)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 text-sm">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.fullName}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold" style={{
                color: colors[index]
              }}>
                      {item.value}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.percentage.toFixed(1)}%
                    </div>
                  </div>
                </div>)}
            </div> : <div className="text-center py-8 text-gray-500">
              <AlertTriangle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Nenhum rejeito encontrado no período selecionado</p>
            </div>}
        </CardContent>
      </Card>

      {/* Gráfico de Responsáveis - Mantido igual */}
      <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-secondary/5 border-t-4 border-t-secondary scroll-animate">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-card-foreground flex items-center">
            <User className="h-5 w-5 mr-2 text-secondary" />
            Responsabilidade por Rejeitos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row items-center gap-6 mx-0 rounded-md">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <defs>
                  {responsibleColors.map((color, index) => <linearGradient key={index} id={`responsible3D${index}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={color} stopOpacity={1} />
                      <stop offset="50%" stopColor={color} stopOpacity={0.9} />
                      <stop offset="100%" stopColor={color} stopOpacity={0.7} />
                    </linearGradient>)}
                </defs>
                
                <Pie data={responsibleChartData} cx="52%" cy="52%" outerRadius={102} fill="#000000" fillOpacity={0.2} dataKey="value" startAngle={90} endAngle={450} />
                
                <Pie data={responsibleChartData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" animationDuration={1500} labelLine={false} label={renderCustomizedLabel} startAngle={90} endAngle={450}>
                  {responsibleChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={`url(#responsible3D${index % responsibleColors.length})`} stroke="white" strokeWidth={2} />)}
                </Pie>
                
                <Tooltip contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
              }} formatter={(value: number) => [value, 'Rejeitos']} />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="space-y-4 min-w-[200px]">
              {responsibleChartData.map((item, index) => <div key={item.name} className="flex items-center gap-4 bg-card p-4 rounded-lg shadow-md border border-border hover:shadow-lg transition-all duration-300">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shadow-md" style={{
                background: `linear-gradient(135deg, ${responsibleColors[index % responsibleColors.length]}, ${responsibleColors[index % responsibleColors.length]}dd)`
              }}>
                    <span className="text-white text-xs">{getResponsibleIcon(item.name)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-card-foreground text-sm">{item.name}</div>
                    <div className="text-lg font-bold text-primary">{item.value} rejeitos</div>
                    <div className="text-xs text-muted-foreground">
                      {(item.value / responsibleChartData.reduce((sum, d) => sum + d.value, 0) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
};