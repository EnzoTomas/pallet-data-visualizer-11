
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

  const getGradientColors = (efficiency: number) => {
    if (efficiency >= 70) return { from: "from-emerald-500", to: "to-green-400", text: "text-emerald-600", bg: "bg-emerald-100" };
    if (efficiency >= 50) return { from: "from-amber-500", to: "to-yellow-400", text: "text-amber-600", bg: "bg-amber-100" };
    return { from: "from-rose-500", to: "to-red-400", text: "text-rose-600", bg: "bg-rose-100" };
  };

  const colors = getGradientColors(eficiencia);
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedEfficiency / 100) * circumference;

  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-gray-50/50 border-0 shadow-lg hover:shadow-xl hover:-translate-y-2 overflow-hidden relative">
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 left-4 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping"></div>
        <div className="absolute top-8 right-6 w-1 h-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-bounce"></div>
      </div>

      <CardHeader className="pb-4 relative">
        <CardTitle className="text-lg font-bold text-center bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent flex items-center justify-center gap-2">
          <Activity className="w-5 h-5 text-blue-500 animate-pulse" />
          {title}
        </CardTitle>
        <div className="absolute top-2 right-2 flex items-center">
          {eficiencia >= 70 ? (
            <TrendingUp className="w-4 h-4 text-emerald-500 animate-bounce" />
          ) : (
            <TrendingDown className="w-4 h-4 text-rose-500 animate-bounce" />
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6 relative">
        {/* Enhanced Circular Progress */}
        <div className="relative w-36 h-36 mx-auto">
          {/* Outer glow ring */}
          <div className={`absolute inset-0 rounded-full ${colors.bg} opacity-20 animate-pulse`}></div>
          
          <svg className="w-36 h-36 transform -rotate-90 filter drop-shadow-lg" viewBox="0 0 100 100">
            {/* Background circle with gradient */}
            <defs>
              <linearGradient id={`gradient-bg-${shiftNumber}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f1f5f9" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>
              <linearGradient id={`gradient-${shiftNumber}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={eficiencia >= 70 ? "#10b981" : eficiencia >= 50 ? "#f59e0b" : "#ef4444"} />
                <stop offset="100%" stopColor={eficiencia >= 70 ? "#059669" : eficiencia >= 50 ? "#d97706" : "#dc2626"} />
              </linearGradient>
              <filter id={`glow-${shiftNumber}`}>
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke={`url(#gradient-bg-${shiftNumber})`}
              strokeWidth="8"
              fill="transparent"
              className="opacity-30"
            />
            
            {/* Animated progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke={`url(#gradient-${shiftNumber})`}
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
              filter={`url(#glow-${shiftNumber})`}
              style={{
                animation: `dashMove 2s ease-out ${shiftNumber * 0.2}s forwards`
              }}
            />
          </svg>
          
          {/* Center content with enhanced styling */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-3xl font-bold ${colors.text} mb-1 transition-all duration-1000 number-animate`}>
              {animatedEfficiency.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-500 font-medium tracking-wide">EFICIÊNCIA</div>
          </div>
        </div>

        {/* Enhanced Stats with animations */}
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Inseridos</span>
            </div>
            <span className="font-bold text-lg text-blue-600 transition-all duration-1000 number-animate">
              {animatedInseridos.toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-rose-50 to-red-50 border border-rose-100 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-rose-500 to-red-500 animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Rejeitados</span>
            </div>
            <span className="font-bold text-lg text-rose-600 transition-all duration-1000 number-animate">
              {animatedRejeitos.toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-100 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Volume Total</span>
            </div>
            <span className="font-bold text-lg text-purple-600 transition-all duration-1000 number-animate">
              {(animatedInseridos + animatedRejeitos).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Enhanced Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-500 font-medium">
            <span>Progresso</span>
            <span>{animatedEfficiency.toFixed(1)}%</span>
          </div>
          <div className="relative">
            <Progress 
              value={animatedEfficiency} 
              className="h-3 bg-gray-200 rounded-full overflow-hidden"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
