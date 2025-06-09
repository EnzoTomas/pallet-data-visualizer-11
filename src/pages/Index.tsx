import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { CheckCircle, X, Calendar, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

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

const CircularProgress = ({ percentage, label, inseridos, rejeitos }: { 
  percentage: number; 
  label: string; 
  inseridos: number; 
  rejeitos: number; 
}) => {
  const radius = 45;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card className="flex flex-col items-center justify-center p-6 min-h-[200px]">
      <div className="text-sm text-muted-foreground mb-2">{label}</div>
      <div className="relative">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          <circle
            stroke="#e5e7eb"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="#000000"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold">{percentage.toFixed(2)}%</div>
        </div>
      </div>
      <div className="mt-3 text-center space-y-1">
        <div className="text-sm">
          <span className="text-muted-foreground">Inseridos:</span> <span className="font-medium">{inseridos}</span>
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground">Rejeitos:</span> <span className="font-medium">{rejeitos}</span>
        </div>
      </div>
    </Card>
  );
};

const Index = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Ontem');
  const [startDate, setStartDate] = useState('2025-06-08');
  const [endDate, setEndDate] = useState('2025-06-08');
  const [csvData, setCsvData] = useState(rawData);
  const { toast } = useToast();

  const processedData = useMemo(() => {
    return csvData.trim().split('\n').map(line => {
      const values = line.split('\t');
      return {
        date: values[0],
        totalInseridos: parseInt(values[1]) || 0,
        totalRejeitos: parseInt(values[2]) || 0,
        eficiencia: parseFloat(values[3]?.replace('%', '').replace(',', '.')) || 0,
        inseridos1T: parseInt(values[15]) || 0,
        rejeitos1T: parseInt(values[16]) || 0,
        aderencia1T: parseFloat(values[17]?.replace('%', '').replace(',', '.')) || 0,
        inseridos2T: parseInt(values[18]) || 0,
        rejeitos2T: parseInt(values[19]) || 0,
        aderencia2T: parseFloat(values[20]?.replace('%', '').replace(',', '.')) || 0,
        inseridos3T: parseInt(values[21]) || 0,
        rejeitos3T: parseInt(values[22]) || 0,
        aderencia3T: parseFloat(values[23]?.replace('%', '').replace(',', '.')) || 0,
        total: function() { return this.totalInseridos + this.totalRejeitos; }
      };
    }).filter(item => item.total() > 0);
  }, [csvData]);

  const filteredData = useMemo(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    return processedData.filter(item => {
      const itemDate = new Date(item.date.split('/').reverse().join('-'));
      
      switch(selectedPeriod) {
        case 'Ontem':
          return itemDate.toDateString() === yesterday.toDateString();
        case 'Semana':
          const weekAgo = new Date(today);
          weekAgo.setDate(weekAgo.getDate() - 7);
          return itemDate >= weekAgo && itemDate <= today;
        case 'Mensal':
          const monthAgo = new Date(today);
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          return itemDate >= monthAgo && itemDate <= today;
        case 'Anual':
          const yearAgo = new Date(today);
          yearAgo.setFullYear(yearAgo.getFullYear() - 1);
          return itemDate >= yearAgo && itemDate <= today;
        default:
          const start = new Date(startDate);
          const end = new Date(endDate);
          return itemDate >= start && itemDate <= end;
      }
    });
  }, [processedData, selectedPeriod, startDate, endDate]);

  const aggregatedData = useMemo(() => {
    if (filteredData.length === 0) {
      return {
        totalInseridos: 0,
        totalRejeitos: 0,
        eficiencia: 0,
        inseridos1T: 0,
        rejeitos1T: 0,
        aderencia1T: 0,
        inseridos2T: 0,
        rejeitos2T: 0,
        aderencia2T: 0,
        inseridos3T: 0,
        rejeitos3T: 0,
        aderencia3T: 0
      };
    }

    const totals = filteredData.reduce((acc, curr) => ({
      totalInseridos: acc.totalInseridos + curr.totalInseridos,
      totalRejeitos: acc.totalRejeitos + curr.totalRejeitos,
      inseridos1T: acc.inseridos1T + curr.inseridos1T,
      rejeitos1T: acc.rejeitos1T + curr.rejeitos1T,
      inseridos2T: acc.inseridos2T + curr.inseridos2T,
      rejeitos2T: acc.rejeitos2T + curr.rejeitos2T,
      inseridos3T: acc.inseridos3T + curr.inseridos3T,
      rejeitos3T: acc.rejeitos3T + curr.rejeitos3T,
    }), {
      totalInseridos: 0,
      totalRejeitos: 0,
      inseridos1T: 0,
      rejeitos1T: 0,
      inseridos2T: 0,
      rejeitos2T: 0,
      inseridos3T: 0,
      rejeitos3T: 0,
    });

    const total = totals.totalInseridos + totals.totalRejeitos;
    const eficiencia = total > 0 ? (totals.totalInseridos / total) * 100 : 0;

    const total1T = totals.inseridos1T + totals.rejeitos1T;
    const aderencia1T = total1T > 0 ? (totals.inseridos1T / total1T) * 100 : 0;

    const total2T = totals.inseridos2T + totals.rejeitos2T;
    const aderencia2T = total2T > 0 ? (totals.inseridos2T / total2T) * 100 : 0;

    const total3T = totals.inseridos3T + totals.rejeitos3T;
    const aderencia3T = total3T > 0 ? (totals.inseridos3T / total3T) * 100 : 0;

    return {
      ...totals,
      eficiencia,
      aderencia1T,
      aderencia2T,
      aderencia3T
    };
  }, [filteredData]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setCsvData(content);
        toast({
          title: "CSV importado com sucesso!",
          description: `Arquivo ${file.name} foi carregado.`,
        });
      };
      reader.readAsText(file);
    }
  };

  const handleImportClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.txt';
    input.onchange = handleFileUpload;
    input.click();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-800">Status Paletização</h1>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleImportClick}>
            <Upload className="h-4 w-4 mr-2" />
            Importar CSV
          </Button>
        </div>

        {/* Period Selector */}
        <div className="flex items-center gap-4">
          <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="Ontem">Ontem</TabsTrigger>
              <TabsTrigger value="Semana">Semana</TabsTrigger>
              <TabsTrigger value="Mensal">Mensal</TabsTrigger>
              <TabsTrigger value="Anual">Anual</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>De</span>
              <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)}
                className="border rounded px-2 py-1" 
              />
            </div>
            <div className="flex items-center gap-2">
              <span>Até</span>
              <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)}
                className="border rounded px-2 py-1" 
              />
            </div>
          </div>
        </div>

        {/* Main KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground mb-2">Aderência Total</div>
                <div className="text-4xl font-bold text-yellow-600">{aggregatedData.eficiencia.toFixed(2)}%</div>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground mb-2">Inseridos Total</div>
                <div className="text-4xl font-bold text-green-600">{aggregatedData.totalInseridos}</div>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground mb-2">Rejeitados Total</div>
                <div className="text-4xl font-bold text-red-600">{aggregatedData.totalRejeitos}</div>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                <X className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Shift Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CircularProgress
            percentage={aggregatedData.aderencia1T}
            label="Turno 1"
            inseridos={aggregatedData.inseridos1T}
            rejeitos={aggregatedData.rejeitos1T}
          />
          <CircularProgress
            percentage={aggregatedData.aderencia2T}
            label="Turno 2"
            inseridos={aggregatedData.inseridos2T}
            rejeitos={aggregatedData.rejeitos2T}
          />
          <CircularProgress
            percentage={aggregatedData.aderencia3T}
            label="Turno 3"
            inseridos={aggregatedData.inseridos3T}
            rejeitos={aggregatedData.rejeitos3T}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Tendência de Eficiência</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredData.slice(-30)}>
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
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Volume de Produção</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredData.slice(-30)}>
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
      </div>
    </div>
  );
};

export default Index;
