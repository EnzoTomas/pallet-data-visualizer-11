
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { Clock, TrendingUp, TrendingDown } from 'lucide-react';

interface HourlyDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any[];
  shiftNumber: number;
}

export const HourlyDataModal = ({ isOpen, onClose, data, shiftNumber }: HourlyDataModalProps) => {
  // Função para gerar dados por hora baseado no turno
  const generateHourlyData = () => {
    const hourlyData = [];
    
    // Definir horários baseado no turno
    let startHour, endHour;
    if (shiftNumber === 1) {
      startHour = 6; endHour = 14;
    } else if (shiftNumber === 2) {
      startHour = 14; endHour = 22;
    } else {
      startHour = 22; endHour = 6;
    }

    // Gerar dados para cada hora do turno
    for (let hour = 0; hour < 24; hour++) {
      let isInShift = false;
      if (shiftNumber === 3 && (hour >= 22 || hour < 6)) {
        isInShift = true;
      } else if (shiftNumber === 1 && hour >= 6 && hour < 14) {
        isInShift = true;
      } else if (shiftNumber === 2 && hour >= 14 && hour < 22) {
        isInShift = true;
      }

      if (isInShift) {
        const totalInseridos = data.reduce((sum, item) => {
          const fieldName = `inserido${hour.toString().padStart(2, '0')}`;
          return sum + (item[fieldName] || 0);
        }, 0);

        const totalRejeitos = data.reduce((sum, item) => {
          const fieldName = `rejeito${hour.toString().padStart(2, '0')}`;
          return sum + (item[fieldName] || 0);
        }, 0);

        hourlyData.push({
          hora: `${hour.toString().padStart(2, '0')}:00`,
          inseridos: totalInseridos,
          rejeitos: totalRejeitos,
          total: totalInseridos + totalRejeitos,
          eficiencia: totalInseridos + totalRejeitos > 0 ? ((totalInseridos / (totalInseridos + totalRejeitos)) * 100).toFixed(1) : 0
        });
      }
    }

    return hourlyData;
  };

  const hourlyData = generateHourlyData();
  const totalInseridos = hourlyData.reduce((sum, item) => sum + item.inseridos, 0);
  const totalRejeitos = hourlyData.reduce((sum, item) => sum + item.rejeitos, 0);
  const eficienciaGeral = totalInseridos + totalRejeitos > 0 ? ((totalInseridos / (totalInseridos + totalRejeitos)) * 100).toFixed(1) : 0;

  const getShiftName = () => {
    switch (shiftNumber) {
      case 1: return "1º Turno (06:00 - 14:00)";
      case 2: return "2º Turno (14:00 - 22:00)";
      case 3: return "3º Turno (22:00 - 06:00)";
      default: return "Turno";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Clock className="h-6 w-6 text-primary" />
            Produção por Hora - {getShiftName()}
          </DialogTitle>
        </DialogHeader>

        {/* Resumo Geral */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-l-4 border-l-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-primary">Total Inseridos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{totalInseridos}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5 border-l-4 border-l-destructive">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-destructive">Total Rejeitados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{totalRejeitos}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-l-4 border-l-secondary">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-secondary-foreground">Eficiência Geral</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary-foreground flex items-center gap-2">
                {eficienciaGeral}%
                {parseFloat(eficienciaGeral) >= 50 ? (
                  <TrendingUp className="h-5 w-5 text-primary" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-destructive" />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de Barras */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-primary"></div>
              Inseridos vs Rejeitados por Hora
              <div className="w-4 h-4 rounded bg-destructive ml-4"></div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorInseridosHourly" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.7}/>
                  </linearGradient>
                  <linearGradient id="colorRejeitosHourly" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0.7}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="hora" 
                  tick={{ fontSize: 11, fill: '#6b7280' }}
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
                    if (name === 'inseridos') return [value, 'Inseridos'];
                    if (name === 'rejeitos') return [value, 'Rejeitados'];
                    return [value, name];
                  }}
                  labelFormatter={(label) => `Hora: ${label}`}
                />
                <Bar 
                  dataKey="inseridos" 
                  fill="url(#colorInseridosHourly)" 
                  radius={[4, 4, 0, 0]}
                  name="inseridos"
                />
                <Bar 
                  dataKey="rejeitos" 
                  fill="url(#colorRejeitosHourly)" 
                  radius={[4, 4, 0, 0]}
                  name="rejeitos"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Linha da Eficiência */}
        <Card>
          <CardHeader>
            <CardTitle>Eficiência por Hora (%)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={hourlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="hora" 
                  tick={{ fontSize: 11, fill: '#6b7280' }}
                />
                <YAxis 
                  tick={{ fontSize: 11, fill: '#6b7280' }}
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                  formatter={(value: number) => [`${value}%`, 'Eficiência']}
                  labelFormatter={(label) => `Hora: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="eficiencia" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--secondary))', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'hsl(var(--secondary))', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
