
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  return (
    <div className="grid grid-cols-1 gap-6">
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
    </div>
  );
};
