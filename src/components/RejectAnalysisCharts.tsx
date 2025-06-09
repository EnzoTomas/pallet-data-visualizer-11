
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LabelList } from 'recharts';
import { AlertTriangle, User, Wrench } from 'lucide-react';

interface RejectAnalysisChartsProps {
  data: any[];
}

export const RejectAnalysisCharts = ({ data }: RejectAnalysisChartsProps) => {
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
      'Erro de contorno: Traseira': Number(item.erroContornoTraseira) || 0,
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
      'RN': Number(item.rn) || 0,
    };

    Object.entries(responsible).forEach(([type, count]) => {
      if (!acc[type]) acc[type] = 0;
      acc[type] += count;
    });

    return acc;
  }, {} as Record<string, number>);

  const rejectChartData = Object.entries(rejectTypeData)
    .map(([name, value]) => ({ 
      name: name.replace('Erro de contorno: ', '').replace('Erro de ', ''), 
      fullName: name,
      value: Number(value) 
    }))
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value);

  const responsibleChartData = Object.entries(responsibleData)
    .map(([name, value]) => ({ name, value: Number(value) }))
    .filter(item => item.value > 0);

  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'];
  const responsibleColors = ['#ef4444', '#f97316', '#3b82f6'];

  const getResponsibleIcon = (name: string) => {
    switch(name) {
      case 'Falha no Sensor': return <Wrench className="h-4 w-4" />;
      case 'Pallet': return <AlertTriangle className="h-4 w-4" />;
      case 'RN': return <User className="h-4 w-4" />;
      default: return null;
    }
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value }: any) => {
    if (percent < 0.05) return null; // Não mostrar labels muito pequenos
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
        style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
      >
        {value}
      </text>
    );
  };

  const CustomBarLabel = (props: any) => {
    const { x, y, width, height, value } = props;
    return (
      <text 
        x={x + width / 2} 
        y={y - 5} 
        fill="hsl(var(--foreground))" 
        textAnchor="middle" 
        fontSize="12"
        fontWeight="bold"
      >
        {value}
      </text>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Gráfico de Tipos de Rejeitos - Melhorado */}
      <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-destructive/5 border-t-4 border-t-destructive scroll-animate">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-card-foreground flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-destructive" />
            Análise de Rejeitos por Tipo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart 
              data={rejectChartData} 
              margin={{ top: 40, right: 30, left: 20, bottom: 100 }}
              layout="horizontal"
            >
              <defs>
                {colors.map((color, index) => (
                  <linearGradient key={index} id={`colorReject${index}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="5%" stopColor={color} stopOpacity={0.9}/>
                    <stop offset="95%" stopColor={color} stopOpacity={0.7}/>
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis 
                type="number"
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                type="category"
                dataKey="name" 
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                width={120}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                }}
                formatter={(value: number, name: string, props: any) => [value, props.payload.fullName]}
                labelFormatter={(label: string) => `Tipo: ${label}`}
              />
              <Bar 
                dataKey="value" 
                fill="url(#colorReject0)"
                radius={[0, 4, 4, 0]}
                animationDuration={1500}
              >
                <LabelList 
                  dataKey="value" 
                  position="right" 
                  style={{ fill: 'hsl(var(--foreground))', fontWeight: 'bold', fontSize: '12px' }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Responsáveis - 3D e com números visíveis */}
      <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-secondary/5 border-t-4 border-t-secondary scroll-animate">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-card-foreground flex items-center">
            <User className="h-5 w-5 mr-2 text-secondary" />
            Responsabilidade por Rejeitos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <defs>
                  {responsibleColors.map((color, index) => (
                    <linearGradient key={index} id={`responsible3D${index}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={color} stopOpacity={1}/>
                      <stop offset="50%" stopColor={color} stopOpacity={0.9}/>
                      <stop offset="100%" stopColor={color} stopOpacity={0.7}/>
                    </linearGradient>
                  ))}
                  {/* Gradientes de sombra para efeito 3D */}
                  {responsibleColors.map((color, index) => (
                    <linearGradient key={`shadow${index}`} id={`shadow${index}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#000000" stopOpacity={0.3}/>
                      <stop offset="100%" stopColor="#000000" stopOpacity={0.1}/>
                    </linearGradient>
                  ))}
                </defs>
                
                {/* Sombra para efeito 3D */}
                <Pie
                  data={responsibleChartData}
                  cx="50%"
                  cy="52%"
                  outerRadius={102}
                  fill="#000000"
                  fillOpacity={0.2}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                />
                
                {/* Gráfico principal */}
                <Pie
                  data={responsibleChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  animationDuration={1500}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  startAngle={90}
                  endAngle={450}
                >
                  {responsibleChartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={`url(#responsible3D${index % responsibleColors.length})`}
                      stroke="white"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                  }}
                  formatter={(value: number) => [value, 'Rejeitos']}
                />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="space-y-4 min-w-[200px]">
              {responsibleChartData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-4 bg-card p-4 rounded-lg shadow-md border border-border hover:shadow-lg transition-all duration-300">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center shadow-md"
                    style={{ 
                      background: `linear-gradient(135deg, ${responsibleColors[index % responsibleColors.length]}, ${responsibleColors[index % responsibleColors.length]}dd)`
                    }}
                  >
                    <span className="text-white text-xs">{getResponsibleIcon(item.name)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-card-foreground text-sm">{item.name}</div>
                    <div className="text-lg font-bold text-primary">{item.value} rejeitos</div>
                    <div className="text-xs text-muted-foreground">
                      {((item.value / responsibleChartData.reduce((sum, d) => sum + d.value, 0)) * 100).toFixed(1)}%
                    </div>
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
