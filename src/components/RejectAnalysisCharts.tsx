
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { AlertTriangle, User, Wrench, Target, Zap, PieChart as PieChartIcon, Settings, Package, FileX } from 'lucide-react';

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

  // Processar dados dos responsáveis pelos rejeitos
  const responsibleData = data.reduce((acc, item) => {
    const responsible = {
      'Falha no sensor': Number(item.falhaSensor) || 0,
      'Pallet': Number(item.pallet) || 0,
      'RN': Number(item.rn) || 0
    };
    Object.entries(responsible).forEach(([type, count]) => {
      if (!acc[type]) acc[type] = 0;
      acc[type] += count;
    });
    return acc;
  }, {} as Record<string, number>);

  const responsibleChartData = Object.entries(responsibleData).map(([name, value]) => ({
    name,
    value: Number(value),
    percentage: 0
  })).filter(item => item.value > 0).sort((a, b) => b.value - a.value);

  // Calcular percentuais dos responsáveis
  const totalResponsible = responsibleChartData.reduce((sum, item) => sum + item.value, 0);
  responsibleChartData.forEach(item => {
    item.percentage = totalResponsible > 0 ? item.value / totalResponsible * 100 : 0;
  });

  // Cores para os gráficos
  const pieColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'];
  const responsibleColors = ['#3b82f6', '#10b981', '#f59e0b'];

  // Dados para o gráfico de pizza dos responsáveis
  const responsiblePieData = responsibleChartData.map((item, index) => ({
    name: item.name,
    value: item.value,
    percentage: item.percentage,
    color: responsibleColors[index % responsibleColors.length]
  }));

  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'];

  const getRejectIcon = (name: string) => {
    if (name.includes('Contorno') || name.includes('Altura') || name.includes('Direita') || name.includes('Esquerda') || name.includes('Frente') || name.includes('Traseira')) {
      return <Target className="h-5 w-5" />;
    }
    if (name.includes('Etiqueta') || name.includes('leitura')) {
      return <Zap className="h-5 w-5" />;
    }
    return <AlertTriangle className="h-5 w-5" />;
  };

  const getResponsibleIcon = (name: string) => {
    if (name === 'Falha no sensor') {
      return <Settings className="h-5 w-5" />;
    }
    if (name === 'Pallet') {
      return <Package className="h-5 w-5" />;
    }
    if (name === 'RN') {
      return <FileX className="h-5 w-5" />;
    }
    return <AlertTriangle className="h-5 w-5" />;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{data.fullName || data.name}</p>
          <p className="text-sm text-gray-600">Quantidade: {data.value}</p>
          <p className="text-sm text-gray-600">Percentual: {data.percentage.toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Dashboard de Rejeitos */}
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
          {rejectChartData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {rejectChartData.map((item, index) => (
                <div 
                  key={item.name} 
                  className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="p-2 rounded-lg" 
                      style={{
                        backgroundColor: `${colors[index]}20`,
                        color: colors[index]
                      }}
                    >
                      {getRejectIcon(item.fullName)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 text-sm">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.fullName}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div 
                      className="text-lg font-bold" 
                      style={{ color: colors[index] }}
                    >
                      {item.value}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.percentage.toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <AlertTriangle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Nenhum rejeito encontrado no período selecionado</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Gráfico dos Responsáveis pelos Rejeitos */}
      <Card className="hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white via-blue-50/30 to-blue-100/50 border-0 shadow-xl overflow-hidden scroll-animate">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        <CardHeader className="pb-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  Responsáveis pelos Rejeitos
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">Origem dos problemas</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{totalResponsible}</div>
              <div className="text-xs text-gray-500">Total de ocorrências</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {responsibleChartData.length > 0 ? (
            <div className="space-y-6">
              {/* Cards dos responsáveis */}
              <div className="grid grid-cols-1 gap-3">
                {responsibleChartData.map((item, index) => (
                  <div 
                    key={item.name} 
                    className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="p-2 rounded-lg" 
                        style={{
                          backgroundColor: `${responsibleColors[index]}20`,
                          color: responsibleColors[index]
                        }}
                      >
                        {getResponsibleIcon(item.name)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 text-sm">{item.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div 
                        className="text-lg font-bold" 
                        style={{ color: responsibleColors[index] }}
                      >
                        {item.value}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.percentage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Gráfico de pizza dos responsáveis */}
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <defs>
                    {responsiblePieData.map((entry, index) => (
                      <linearGradient key={`gradient-resp-${index}`} id={`gradient-resp-${index}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={entry.color} stopOpacity={0.9}/>
                        <stop offset="95%" stopColor={entry.color} stopOpacity={0.6}/>
                      </linearGradient>
                    ))}
                  </defs>
                  <Pie
                    data={responsiblePieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ percentage }) => `${percentage.toFixed(1)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="#fff"
                    strokeWidth={2}
                  >
                    {responsiblePieData.map((entry, index) => (
                      <Cell 
                        key={`cell-resp-${index}`} 
                        fill={`url(#gradient-resp-${index})`}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value, entry: any) => (
                      <span style={{ color: entry.color, fontSize: '12px' }}>
                        {value} ({entry.payload.value})
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 h-[350px] flex flex-col items-center justify-center">
              <User className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Nenhum dado de responsáveis disponível</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
