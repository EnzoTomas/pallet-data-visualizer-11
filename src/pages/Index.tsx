import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { CheckCircle, X, Calendar, TrendingUp, TrendingDown, Activity, Target, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import { CountUp } from "@/components/CountUp";
import { PeriodDescription } from "@/components/PeriodDescription";
import { RejectAnalysisCharts } from "@/components/RejectAnalysisCharts";

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

  const getColor = () => {
    if (percentage >= 70) return "#10b981"; // green
    if (percentage >= 50) return "#f59e0b"; // yellow
    return "#ef4444"; // red
  };

  return (
    <Card className="flex flex-col items-center justify-center p-6 min-h-[200px] hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-gray-50 border-l-4 border-l-blue-500 scroll-animate">
      <div className="text-sm text-muted-foreground mb-2 font-semibold">{label}</div>
      <div className="relative animate-fade-in">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90 drop-shadow-sm"
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
            stroke={getColor()}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            style={{ 
              strokeDashoffset,
              transition: 'stroke-dashoffset 1s ease-in-out, stroke 0.3s ease',
            }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-gray-800">
            <CountUp end={percentage} decimals={1} suffix="%" />
          </div>
        </div>
      </div>
      <div className="mt-3 text-center space-y-2">
        <div className="text-sm bg-green-50 px-3 py-1 rounded-full">
          <span className="text-green-700 font-medium">Inseridos:</span> 
          <span className="font-bold text-green-800 ml-1">
            <CountUp end={inseridos} />
          </span>
        </div>
        <div className="text-sm bg-red-50 px-3 py-1 rounded-full">
          <span className="text-red-700 font-medium">Rejeitos:</span> 
          <span className="font-bold text-red-800 ml-1">
            <CountUp end={rejeitos} />
          </span>
        </div>
      </div>
    </Card>
  );
};

const Index = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('ontem');
  const [startDate, setStartDate] = useState('2025-06-07');
  const [endDate, setEndDate] = useState('2025-06-08');
  const [csvData, setCsvData] = useState(rawData);
  const { toast } = useToast();

  // Add scroll animation effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollElements = document.querySelectorAll('.scroll-animate');
      scrollElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('animate-fade-in');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const processedData = useMemo(() => {
    return csvData.trim().split('\n').map(line => {
      const values = line.split('\t');
      return {
        date: values[0],
        totalInseridos: parseInt(values[1]) || 0,
        totalRejeitos: parseInt(values[2]) || 0,
        eficiencia: parseFloat(values[3]?.replace('%', '').replace(',', '.')) || 0,
        erroLeituraEtiqueta: parseInt(values[4]) || 0,
        madeiraPesPallet: parseInt(values[5]) || 0,
        areaLivrePes: parseInt(values[6]) || 0,
        erroContornoAltura: parseInt(values[7]) || 0,
        erroContornoDireita: parseInt(values[8]) || 0,
        erroContornoEsquerda: parseInt(values[9]) || 0,
        erroContornoFrente: parseInt(values[10]) || 0,
        erroContornoTraseira: parseInt(values[11]) || 0,
        falhaSensor: parseInt(values[12]) || 0,
        pallet: parseInt(values[13]) || 0,
        rn: parseInt(values[14]) || 0,
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
    // Usar 08/06/2025 (ontem) como base para todos os cálculos
    const yesterday = new Date('2025-06-08'); 
    
    return processedData.filter(item => {
      const [day, month, year] = item.date.split('/');
      const itemDate = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
      
      switch(selectedPeriod) {
        case 'ontem':
          return item.date === '08/06/2025';
        case 'semana':
          const weekAgo = new Date(yesterday);
          weekAgo.setDate(weekAgo.getDate() - 7);
          return itemDate >= weekAgo && itemDate <= yesterday;
        case 'mensal':
          const monthStart = new Date(yesterday.getFullYear(), yesterday.getMonth(), 1);
          return itemDate >= monthStart && itemDate <= yesterday;
        case 'anual':
          const yearStart = new Date(yesterday.getFullYear(), 0, 1);
          return itemDate >= yearStart && itemDate <= yesterday;
        case 'personalizado':
          const start = new Date(startDate);
          const end = new Date(endDate);
          return itemDate >= start && itemDate <= end;
        default:
          return true;
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

  // Preparar dados para o gráfico de tendência melhorado
  const trendData = useMemo(() => {
    return filteredData.slice(-30).map(item => ({
      ...item,
      meta: 75, // Meta de eficiência
      zona_critica: 50, // Zona crítica
      diferenca_meta: item.eficiencia - 75
    }));
  }, [filteredData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5 p-6 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center animate-slide-in-right">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Status Paletização
            </h1>
            <p className="text-muted-foreground mt-2">Dashboard de monitoramento em tempo real</p>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-primary animate-pulse" />
            <span className="text-sm text-primary font-medium">Sistema Online</span>
          </div>
        </div>

        {/* Period Selector */}
        <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-card/20 animate-fade-in">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-full lg:w-auto">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-muted h-auto">
                <TabsTrigger value="ontem" className="transition-all hover:scale-105 text-xs md:text-sm px-2 py-2">
                  Ontem
                </TabsTrigger>
                <TabsTrigger value="semana" className="transition-all hover:scale-105 text-xs md:text-sm px-2 py-2">
                  Semana
                </TabsTrigger>
                <TabsTrigger value="mensal" className="transition-all hover:scale-105 text-xs md:text-sm px-2 py-2">
                  Mensal
                </TabsTrigger>
                <TabsTrigger value="anual" className="transition-all hover:scale-105 text-xs md:text-sm px-2 py-2">
                  Anual
                </TabsTrigger>
                <TabsTrigger value="personalizado" className="transition-all hover:scale-105 text-xs md:text-sm px-2 py-2 col-span-2 md:col-span-1">
                  Personalizado
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            {selectedPeriod === 'personalizado' && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm animate-scale-in w-full lg:w-auto">
                <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
                  <span className="font-medium text-primary">De</span>
                  <input 
                    type="date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border border-primary/20 rounded px-3 py-1 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                  />
                </div>
                <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-lg">
                  <span className="font-medium text-accent">Até</span>
                  <input 
                    type="date" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border border-accent/20 rounded px-3 py-1 focus:ring-2 focus:ring-accent focus:border-transparent transition-all" 
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4">
            <PeriodDescription 
              selectedPeriod={selectedPeriod} 
              startDate={startDate} 
              endDate={endDate} 
            />
          </div>
        </div>

        {/* Main KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-secondary/50 to-secondary/30 border-l-4 border-l-secondary animate-fade-in scroll-animate">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-secondary-foreground mb-2 font-medium">Aderência Total</div>
                <div className="text-4xl font-bold text-secondary-foreground transition-all duration-500">
                  <CountUp end={aggregatedData.eficiencia} decimals={2} suffix="%" />
                </div>
                <div className="flex items-center mt-2">
                  {aggregatedData.eficiencia >= 50 ? (
                    <TrendingUp className="h-4 w-4 text-primary mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-destructive mr-1" />
                  )}
                  <span className="text-xs text-muted-foreground">vs período anterior</span>
                </div>
              </div>
              <div className="h-16 w-16 bg-secondary/20 rounded-full flex items-center justify-center hover:rotate-12 transition-transform duration-300">
                <CheckCircle className="h-8 w-8 text-secondary-foreground" />
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-primary/20 to-primary/10 border-l-4 border-l-primary animate-fade-in scroll-animate">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-primary mb-2 font-medium">Inseridos Total</div>
                <div className="text-4xl font-bold text-primary transition-all duration-500">
                  <CountUp end={aggregatedData.totalInseridos} />
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-primary mr-1" />
                  <span className="text-xs text-muted-foreground">+12% esta semana</span>
                </div>
              </div>
              <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center hover:rotate-12 transition-transform duration-300">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-destructive/20 to-destructive/10 border-l-4 border-l-destructive animate-fade-in scroll-animate">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-destructive mb-2 font-medium">Rejeitados Total</div>
                <div className="text-4xl font-bold text-destructive transition-all duration-500">
                  <CountUp end={aggregatedData.totalRejeitos} />
                </div>
                <div className="flex items-center mt-2">
                  <TrendingDown className="h-4 w-4 text-primary mr-1" />
                  <span className="text-xs text-muted-foreground">-5% esta semana</span>
                </div>
              </div>
              <div className="h-16 w-16 bg-destructive/20 rounded-full flex items-center justify-center hover:rotate-12 transition-transform duration-300">
                <X className="h-8 w-8 text-destructive" />
              </div>
            </div>
          </Card>
        </div>

        {/* Shift Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CircularProgress
            percentage={aggregatedData.aderencia1T}
            label="Turno 1 (06:00 - 14:00)"
            inseridos={aggregatedData.inseridos1T}
            rejeitos={aggregatedData.rejeitos1T}
          />
          <CircularProgress
            percentage={aggregatedData.aderencia2T}
            label="Turno 2 (14:00 - 22:00)"
            inseridos={aggregatedData.inseridos2T}
            rejeitos={aggregatedData.rejeitos2T}
          />
          <CircularProgress
            percentage={aggregatedData.aderencia3T}
            label="Turno 3 (22:00 - 06:00)"
            inseridos={aggregatedData.inseridos3T}
            rejeitos={aggregatedData.rejeitos3T}
          />
        </div>

        {/* Reject Analysis Charts */}
        <RejectAnalysisCharts data={filteredData} />

        {/* Charts Section Melhorado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Tendência Redesenhado */}
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
                    {aggregatedData.eficiencia.toFixed(1)}%
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
                  <div className={`text-lg font-bold ${aggregatedData.eficiencia >= 75 ? 'text-green-600' : aggregatedData.eficiencia >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {aggregatedData.eficiencia >= 75 ? 'Excelente' : aggregatedData.eficiencia >= 50 ? 'Atenção' : 'Crítico'}
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
                    <linearGradient id="colorMeta" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
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

          {/* Volume de Produção Mantido Similar */}
          <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-accent/5 border-t-4 border-t-accent scroll-animate">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-card-foreground flex items-center">
                <Activity className="h-5 w-5 mr-2 text-accent" />
                Volume de Produção
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={filteredData.slice(-30)} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorInseridos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.7}/>
                    </linearGradient>
                    <linearGradient
