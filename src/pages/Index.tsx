
import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Calendar, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

const rawData = `02/04/2025	6	8	42,86%	4	0	0	0	0	2	2	2	4	0	4	2	4	33,33%	4	4	50,00%	0	0	
03/04/2025	17	8	68,00%	3	0	1	0	0	5	0	0	3	1	5	6	5	54,55%	11	3	78,57%	0	0	
04/04/2025	0	0	0,00%	0	0	0	0	0	0	0	0	0	0	0	0	0		0	0		0	0	
05/04/2025	0	0	0,00%	0	0	0	0	0	0	0	0	0	0	0	0	0		0	0		0	0	
06/04/2025	0	0	0,00%	0	0	0	0	0	0	0	0	0	0	0	0	0		0	0		0	0	
07/04/2025	5	8	38,46%	4	3	2	0	0	6	0	0	4	3	6	0	2	0,00%	5	6	45,45%	0	0	
08/04/2025	6	10	37,50%	5	2	2	0	0	8	0	0	5	3	8	2	4	33,33%	4	6	40,00%	0	0	
09/04/2025	4	11	26,67%	7	0	0	1	6	3	0	0	7	0	8	4	7	36,36%	0	4	0,00%	0	0	
10/04/2025	0	1	0,00%	1	0	0	0	0	0	0	0	1	0	0	0	0		0	1	0,00%	0	0	
11/04/2025	5	8	38,46%	4	0	0	0	4	4	0	0	4	0	7	4	3	57,14%	1	5	16,67%	0	0	
12/04/2025	0	0	0,00%	0	0	0	0	0	0	0	0	0	0	0	0	0		0	0		0	0	
13/04/2025	0	0	0,00%	0	0	0	0	0	0	0	0	0	0	0	0	0		0	0		0	0	
14/04/2025	1	1	50,00%	1	0	0	0	1	1	0	0	1	0	1	0	0		1	1	50,00%	0	0	
15/04/2025	1	6	14,29%	4	0	0	0	1	3	0	0	4	0	4	1	0	100,00%	0	6	0,00%	0	0	
16/04/2025	0	6	0,00%	6	0	0	1	0	4	1	0	6	0	4	0	5	0,00%	0	1	0,00%	0	0	
17/04/2025	0	3	0,00%	2	0	0	0	1	3	0	0	2	0	3	0	0		0	3	0,00%	0	0	
18/04/2025	0	0	0,00%	0	0	0	0	0	0	0	0	0	0	0	0	0		0	0		0	0	
19/04/2025	0	0	0,00%	0	0	0	0	0	0	0	0	0	0	0	0	0		0	0		0	0	
20/04/2025	1	2	33,33%	2	0	0	0	0	1	0	0	2	0	1	1	2	33,33%	0	0		0	0	
21/04/2025	0	4	0,00%	4	0	0	0	1	1	0	0	4	0	2	0	4	0,00%	0	0		0	0	
22/04/2025	0	8	0,00%	8	1	0	0	0	5	0	0	8	1	5	0	3	0,00%	0	5	0,00%	0	0	
23/04/2025	2	6	25,00%	4	1	0	0	0	1	0	0	4	1	1	0	0		2	6	25,00%	0	0	
24/04/2025	8	17	32,00%	4	1	2	0	6	8	1	0	4	3	14	3	8	27,27%	5	9	35,71%	0	0	
25/04/2025	8	8	50,00%	3	0	0	0	4	4	0	0	3	0	5	2	4	33,33%	6	4	60,00%	0	0	
26/04/2025	0	0	0,00%	0	0	0	0	0	0	0	0	0	0	0	0	0		0	0		0	0	
27/04/2025	0	0	0,00%	0	0	0	0	0	0	0	0	0	0	0	0	0		0	0		0	0	
28/04/2025	0	0	0,00%	0	0	0	0	0	0	0	0	0	0	0	0	0		0	0		0	0	
29/04/2025	13	12	52,00%	7	0	0	0	3	3	0	0	7	0	6	2	8	20,00%	11	4	73,33%	0	0	
30/04/2025	0	0	0,00%	0	0	0	0	0	0	0	0	0	0	0	0	0		0	0		0	0	
01/05/2025	0	0	0,00%	0	0	0	0	0	0	0	0	0	0	0	0	0		0	0		0	0	
02/05/2025	0	0	0,00%	0	0	0	0	0	0	0	0	0	0	0	0	0		0	0		0	0	
03/05/2025	0	0	0,00%	0	0	0	0	0	0	0	0	0	0	0	0	0		0	0		0	0	
04/05/2025	0	0	0,00%	0	0	0	0	0	0	0	0	0	0	0	0	0		0	0		0	0	
05/05/2025	23	16	58,97%	1	1	0	0	1	14	1	0	1	1	15	17	9	65,38%	6	7	46,15%	0	0	
06/05/2025	5	29	14,71%	9	0	1	0	6	22	0	0	9	1	27	5	15	25,00%	0	14	0,00%	0	0	
07/05/2025	0	1	0,00%	0	0	0	0	0	1	0	0	0	0	1	0	1	0,00%	0	0		0	0	
08/05/2025	15	16	48,39%	3	0	0	0	6	13	1	0	3	0	16	10	6	62,50%	5	10	33,33%	0	0	
09/05/2025	16	28	36,36%	12	0	3	0	5	17	3	0	12	3	20	8	6	57,14%	8	22	26,67%	0	0	
10/05/2025	1	0	100,00%	0	0	0	0	0	0	0	0	0	0	0	0	0		1	0	100,00%	0	0	
11/05/2025	0	0	0,00%	0	0	0	0	0	0	0	0	0	0	0	0	0		0	0		0	0	
12/05/2025	15	58	20,55%	9	1	1	1	10	49	1	0	9	2	55	7	24	22,58%	8	34	19,05%	0	0	
13/05/2025	12	22	35,29%	9	1	0	0	0	19	0	0	9	1	19	0	5	0,00%	12	17	41,38%	0	0	
14/05/2025	48	67	41,74%	17	2	3	0	18	40	1	0	17	5	56	16	24	40,00%	32	43	42,67%	0	0	
15/05/2025	41	75	35,34%	28	2	0	0	12	47	2	0	28	2	59	15	30	33,33%	26	45	36,62%	0	0	
16/05/2025	58	83	41,13%	25	1	1	0	26	51	6	0	25	2	69	18	31	36,73%	33	38	46,48%	7	14	33,33%
17/05/2025	29	33	46,77%	10	1	5	0	5	17	1	0	10	6	23	5	8	38,46%	24	25	48,98%	0	0	
18/05/2025	0	0	0,00%	0	0	0	0	0	0	0	0	0	0	0	0	0		0	0		0	0	
19/05/2025	11	58	15,94%	48	4	4	0	4	22	2	0	48	7	26	10	16	38,46%	1	42	2,33%	0	0	
20/05/2025	20	39	33,90%	27	0	0	0	5	12	0	0	27	0	16	12	27	30,77%	1	2	33,33%	7	10	41,18%
21/05/2025	27	34	44,26%	16	0	1	0	2	21	1	0	16	1	23	2	7	22,22%	25	26	49,02%	0	1	0,00%
22/05/2025	45	69	39,47%	37	2	1	0	8	36	6	2	37	3	47	17	33	34,00%	27	36	42,86%	1	0	100,00%
23/05/2025	41	44	48,24%	12	0	2	0	10	25	1	0	12	2	35	17	15	53,13%	24	29	45,28%	0	0	
24/05/2025	0	0	0,00%	0	0	0	0	0	0	0	0	0	0	0	0	0		0	0		0	0	
25/05/2025	0	0	0,00%	0	0	0	0	0	0	0	0	0	0	0	0	0		0	0		0	0	
26/05/2025	60	85	41,38%	27	5	3	2	18	50	8	1	27	8	67	24	33	42,11%	27	37	42,19%	9	15	37,50%
27/05/2025	107	68	61,14%	26	3	5	0	21	20	5	2	26	8	45	32	35	47,76%	58	19	75,32%	17	14	54,84%
28/05/2025	205	74	73,48%	23	5	5	0	34	15	7	0	23	10	54	63	23	73,26%	81	22	78,64%	61	29	67,78%
29/05/2025	143	102	58,37%	49	1	1	0	45	13	25	0	49	2	74	51	38	57,30%	56	37	60,22%	36	27	57,14%
30/05/2025	145	74	66,21%	34	0	1	1	37	13	11	1	34	1	54	44	27	61,97%	57	28	67,06%	44	19	69,84%
31/05/2025	94	42	69,12%	22	2	4	0	18	11	5	0	22	5	30	34	17	66,67%	32	11	74,42%	28	14	66,67%
01/06/2025	12	3	80,00%	2	0	0	0	0	1	0	0	2	0	1	0	0		0	1	0,00%	12	2	85,71%
02/06/2025	131	81	61,79%	30	2	4	0	37	20	6	0	30	6	60	32	22	59,26%	57	30	65,52%	42	29	59,15%
03/06/2025	143	101	58,61%	34	6	1	0	50	26	13	0	34	7	80	54	36	60,00%	38	24	61,29%	51	41	55,43%
04/06/2025	143	99	59,09%	37	1	4	3	47	31	12	1	37	5	81	44	39	53,01%	58	28	67,44%	41	32	56,16%
05/06/2025	97	74	56,73%	40	2	1	0	34	20	5	6	40	2	57	26	27	49,06%	36	22	62,07%	35	25	58,33%
06/06/2025	159	94	62,85%	36	5	3	0	43	36	10	0	36	8	80	37	34	52,11%	62	31	66,67%	60	28	68,18%
07/06/2025	114	77	59,69%	30	0	2	1	37	15	8	2	30	2	58	56	40	58,33%	18	11	62,07%	40	26	60,61%
08/06/2025	9	5	64,29%	4	0	0	0	1	0	0	0	4	0	1	0	0		0	0		9	5	64,29%`;

const Index = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  const processedData = useMemo(() => {
    return rawData.trim().split('\n').map(line => {
      const values = line.split('\t');
      return {
        date: values[0],
        totalInseridos: parseInt(values[1]) || 0,
        totalRejeitos: parseInt(values[2]) || 0,
        eficiencia: parseFloat(values[3]?.replace('%', '').replace(',', '.')) || 0,
        erroLeituraEtiqueta: parseInt(values[4]) || 0,
        madeiraPes: parseInt(values[5]) || 0,
        areaLivre: parseInt(values[6]) || 0,
        erroAltura: parseInt(values[7]) || 0,
        erroDireita: parseInt(values[8]) || 0,
        erroEsquerda: parseInt(values[9]) || 0,
        erroFrente: parseInt(values[10]) || 0,
        erroTraseira: parseInt(values[11]) || 0,
        falhaSensor: parseInt(values[12]) || 0,
        pallet: parseInt(values[13]) || 0,
        rn: parseInt(values[14]) || 0,
        total: function() { return this.totalInseridos + this.totalRejeitos; }
      };
    }).filter(item => item.total() > 0);
  }, []);

  const filteredData = useMemo(() => {
    const days = parseInt(selectedPeriod);
    return processedData.slice(-days);
  }, [processedData, selectedPeriod]);

  const kpis = useMemo(() => {
    const totalInseridos = filteredData.reduce((sum, item) => sum + item.totalInseridos, 0);
    const totalRejeitos = filteredData.reduce((sum, item) => sum + item.totalRejeitos, 0);
    const total = totalInseridos + totalRejeitos;
    const eficienciaMedia = total > 0 ? (totalInseridos / total) * 100 : 0;
    
    const eficienciaAnterior = processedData.slice(-60, -30).reduce((sum, item, _, arr) => {
      const totalAnterior = item.totalInseridos + item.totalRejeitos;
      return sum + (totalAnterior > 0 ? (item.totalInseridos / totalAnterior) * 100 : 0);
    }, 0) / Math.max(processedData.slice(-60, -30).filter(item => item.total() > 0).length, 1);

    const tendenciaEficiencia = eficienciaMedia - eficienciaAnterior;

    return {
      totalInseridos,
      totalRejeitos,
      total,
      eficienciaMedia,
      tendenciaEficiencia,
      diasOperacao: filteredData.filter(item => item.total() > 0).length
    };
  }, [filteredData, processedData]);

  const errorAnalysis = useMemo(() => {
    const errors = {
      'Erro de Leitura': filteredData.reduce((sum, item) => sum + item.erroLeituraEtiqueta, 0),
      'Erro Frente': filteredData.reduce((sum, item) => sum + item.erroFrente, 0),
      'Erro Esquerda': filteredData.reduce((sum, item) => sum + item.erroEsquerda, 0),
      'Erro Direita': filteredData.reduce((sum, item) => sum + item.erroDireita, 0),
      'Erro Traseira': filteredData.reduce((sum, item) => sum + item.erroTraseira, 0),
      'Falha Sensor': filteredData.reduce((sum, item) => sum + item.falhaSensor, 0),
      'Madeira Pés': filteredData.reduce((sum, item) => sum + item.madeiraPes, 0),
      'Área Livre': filteredData.reduce((sum, item) => sum + item.areaLivre, 0),
    };

    return Object.entries(errors)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [filteredData]);

  const COLORS = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#f97316'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-slate-800">Dashboard de Produção</h1>
          <p className="text-slate-600">Monitoramento em tempo real da eficiência e qualidade</p>
        </div>

        {/* Period Selector */}
        <div className="flex justify-center">
          <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="7">7 dias</TabsTrigger>
              <TabsTrigger value="15">15 dias</TabsTrigger>
              <TabsTrigger value="30">30 dias</TabsTrigger>
              <TabsTrigger value="60">60 dias</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Inseridos</CardTitle>
              <CheckCircle className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{kpis.totalInseridos.toLocaleString()}</div>
              <p className="text-xs text-slate-600">
                {kpis.diasOperacao} dias de operação
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rejeitos</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{kpis.totalRejeitos.toLocaleString()}</div>
              <p className="text-xs text-slate-600">
                {kpis.total > 0 ? ((kpis.totalRejeitos / kpis.total) * 100).toFixed(1) : 0}% do total
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eficiência Média</CardTitle>
              <Activity className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{kpis.eficienciaMedia.toFixed(1)}%</div>
              <p className="text-xs flex items-center text-slate-600">
                {kpis.tendenciaEficiencia > 0 ? (
                  <>
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    +{kpis.tendenciaEficiencia.toFixed(1)}%
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                    {kpis.tendenciaEficiencia.toFixed(1)}%
                  </>
                )}
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Volume Total</CardTitle>
              <Calendar className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{kpis.total.toLocaleString()}</div>
              <p className="text-xs text-slate-600">
                Média diária: {kpis.diasOperacao > 0 ? Math.round(kpis.total / kpis.diasOperacao) : 0}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Efficiency Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Tendência de Eficiência</CardTitle>
              <CardDescription>Evolução da eficiência ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => {
                      const date = new Date(value.split('/').reverse().join('-'));
                      return `${date.getDate()}/${date.getMonth() + 1}`;
                    }}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value, name) => [`${value}%`, 'Eficiência']}
                    labelFormatter={(label) => `Data: ${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="eficiencia" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Error Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Análise de Erros</CardTitle>
              <CardDescription>Principais tipos de erros no período</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={errorAnalysis}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {errorAnalysis.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, 'Ocorrências']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Volume Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Volume de Produção</CardTitle>
              <CardDescription>Inseridos vs Rejeitos por dia</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => {
                      const date = new Date(value.split('/').reverse().join('-'));
                      return `${date.getDate()}/${date.getMonth() + 1}`;
                    }}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value, name) => [value, name === 'totalInseridos' ? 'Inseridos' : 'Rejeitos']}
                    labelFormatter={(label) => `Data: ${label}`}
                  />
                  <Bar dataKey="totalInseridos" fill="#10b981" name="Inseridos" />
                  <Bar dataKey="totalRejeitos" fill="#ef4444" name="Rejeitos" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-slate-500 py-4">
          Dashboard atualizado automaticamente • Dados em tempo real
        </div>
      </div>
    </div>
  );
};

export default Index;
