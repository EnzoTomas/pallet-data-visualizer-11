
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { useEffect, useState } from "react";

interface CircularProgressProps {
  title: string;
  inseridos: number;
  rejeitos: number;
  eficiencia: number;
  shiftNumber: number;
  data: any[];
}

export const CircularProgress = ({ title, inseridos, rejeitos, eficiencia, shiftNumber }: CircularProgressProps) => {
  const [animatedEfficiency, setAnimatedEfficiency] = useState(0);
  const [animatedInseridos, setAnimatedInseridos] = useState(0);
  const [animatedRejeitos, setAnimatedRejeitos] = useState(0);
  
  const total = inseridos + rejeitos;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedEfficiency(eficiencia);
      setAnimatedInseridos(inseridos);
      setAnimatedRejeitos(rejeitos);
    }, 100 * shiftNumber);

    return () => clearTimeout(timer);
  }, [eficiencia, inseridos, rejeitos, shiftNumber]);

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 80) return "text-emerald-600";
    if (efficiency >= 60) return "text-blue-600";
    if (efficiency >= 40) return "text-amber-600";
    return "text-rose-600";
  };

  const getEfficiencyBgColor = (efficiency: number) => {
    if (efficiency >= 80) return "from-emerald-500 to-emerald-600";
    if (efficiency >= 60) return "from-blue-500 to-blue-600";
    if (efficiency >= 40) return "from-amber-500 to-amber-600";
    return "from-rose-500 to-rose-600";
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedEfficiency / 100) * circumference;

  return (
    <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-center text-gray-800 flex items-center justify-center gap-2">
          <Activity className="w-5 h-5 text-blue-500" />
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Circular Progress */}
        <div className="relative w-32 h-32 mx-auto">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <defs>
              <linearGradient id={`gradient-${shiftNumber}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={eficiencia >= 80 ? "#10b981" : eficiencia >= 60 ? "#3b82f6" : eficiencia >= 40 ? "#f59e0b" : "#ef4444"} />
                <stop offset="100%" stopColor={eficiencia >= 80 ? "#059669" : eficiencia >= 60 ? "#2563eb" : eficiencia >= 40 ? "#d97706" : "#dc2626"} />
              </linearGradient>
            </defs>
            
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#e5e7eb"
              strokeWidth="6"
              fill="transparent"
            />
            
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke={`url(#gradient-${shiftNumber})`}
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-2xl font-bold ${getEfficiencyColor(eficiencia)} transition-all duration-1000`}>
              {animatedEfficiency.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-500 font-medium">EFICIÊNCIA</div>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 rounded-lg bg-blue-50 border border-blue-100">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-sm font-medium text-gray-700">Inseridos</span>
            </div>
            <span className="font-semibold text-blue-600 transition-all duration-1000">
              {animatedInseridos.toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between items-center p-3 rounded-lg bg-rose-50 border border-rose-100">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-rose-500"></div>
              <span className="text-sm font-medium text-gray-700">Rejeitados</span>
            </div>
            <span className="font-semibold text-rose-600 transition-all duration-1000">
              {animatedRejeitos.toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-500"></div>
              <span className="text-sm font-medium text-gray-700">Volume Total</span>
            </div>
            <span className="font-semibold text-gray-700 transition-all duration-1000">
              {(animatedInseridos + animatedRejeitos).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Progresso</span>
            <span>{animatedEfficiency.toFixed(1)}%</span>
          </div>
          <Progress 
            value={animatedEfficiency} 
            className="h-2"
          />
        </div>

        {/* Trend indicator */}
        <div className="flex justify-center">
          {eficiencia >= 70 ? (
            <div className="flex items-center gap-1 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-medium">Boa performance</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-rose-600">
              <TrendingDown className="w-4 h-4" />
              <span className="text-xs font-medium">Precisa atenção</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
