
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Activity, Sun, Sunset, Moon, Users, Box, Clock } from "lucide-react";
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

  // Configurações específicas para cada turno
  const getShiftConfig = (shift: number) => {
    switch (shift) {
      case 1:
        return {
          gradient: "from-blue-400 via-sky-500 to-cyan-400",
          bgGradient: "from-blue-50 via-sky-50 to-cyan-50",
          borderGradient: "from-blue-200 to-cyan-200",
          textColor: "text-blue-700",
          icon: Sun,
          theme: "Manhã",
          particleColor: "bg-blue-300",
          accentColor: "blue-500",
          shadowColor: "shadow-blue-500/20"
        };
      case 2:
        return {
          gradient: "from-orange-400 via-amber-500 to-yellow-400",
          bgGradient: "from-orange-50 via-amber-50 to-yellow-50",
          borderGradient: "from-orange-200 to-yellow-200",
          textColor: "text-orange-700",
          icon: Sunset,
          theme: "Tarde",
          particleColor: "bg-orange-300",
          accentColor: "orange-500",
          shadowColor: "shadow-orange-500/20"
        };
      case 3:
        return {
          gradient: "from-purple-600 via-indigo-600 to-blue-700",
          bgGradient: "from-purple-900/20 via-indigo-900/20 to-blue-900/20",
          borderGradient: "from-purple-400 to-blue-400",
          textColor: "text-purple-100",
          icon: Moon,
          theme: "Noite",
          particleColor: "bg-purple-400",
          accentColor: "purple-500",
          shadowColor: "shadow-purple-500/20"
        };
      default:
        return {
          gradient: "from-gray-400 to-gray-600",
          bgGradient: "from-gray-50 to-gray-100",
          borderGradient: "from-gray-200 to-gray-300",
          textColor: "text-gray-700",
          icon: Activity,
          theme: "Turno",
          particleColor: "bg-gray-300",
          accentColor: "gray-500",
          shadowColor: "shadow-gray-500/20"
        };
    }
  };

  const config = getShiftConfig(shiftNumber);
  const IconComponent = config.icon;

  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedEfficiency / 100) * circumference;

  const getEfficiencyStatus = (efficiency: number) => {
    if (efficiency >= 85) return { status: "Excelente", color: "text-emerald-500", icon: TrendingUp };
    if (efficiency >= 70) return { status: "Bom", color: "text-blue-500", icon: TrendingUp };
    if (efficiency >= 50) return { status: "Regular", color: "text-amber-500", icon: Activity };
    return { status: "Crítico", color: "text-red-500", icon: TrendingDown };
  };

  const statusInfo = getEfficiencyStatus(eficiencia);
  const StatusIcon = statusInfo.icon;

  return (
    <Card className={`
      relative overflow-hidden backdrop-blur-xl border-2 transition-all duration-700 hover:scale-105 hover:-translate-y-2
      ${shiftNumber === 3 ? 'bg-gray-900/80 border-purple-400/30' : 'bg-white/80 border-gray-200/50'}
      ${config.shadowColor} shadow-2xl hover:shadow-3xl
      group cursor-pointer
    `}>
      {/* Partículas de fundo animadas */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`
              absolute w-1 h-1 ${config.particleColor} rounded-full opacity-30
              animate-float-${i % 3 + 1}
            `}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Fundo gradiente animado */}
      <div className={`
        absolute inset-0 bg-gradient-to-br ${config.bgGradient} opacity-60
        group-hover:opacity-80 transition-opacity duration-500
      `} />

      {/* Borda lateral colorida */}
      <div className={`
        absolute left-0 top-0 w-1 h-full bg-gradient-to-b ${config.gradient}
        group-hover:w-2 transition-all duration-300
      `} />

      <CardHeader className="pb-4 relative z-10">
        <CardTitle className={`
          text-xl font-bold text-center flex items-center justify-center gap-3
          ${shiftNumber === 3 ? 'text-white' : 'text-gray-800'}
        `}>
          <div className={`
            p-2 rounded-full bg-gradient-to-r ${config.gradient} text-white
            group-hover:scale-110 transition-transform duration-300
            animate-pulse-glow
          `}>
            <IconComponent className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg">{title}</span>
            <span className={`text-xs font-normal opacity-70 ${config.textColor}`}>
              {config.theme}
            </span>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 relative z-10">
        {/* Progresso circular futurístico */}
        <div className="relative w-36 h-36 mx-auto">
          {/* Anel externo decorativo */}
          <div className={`
            absolute inset-0 rounded-full border-4 border-dashed opacity-20
            ${shiftNumber === 3 ? 'border-purple-400' : 'border-gray-300'}
            animate-spin-slow
          `} />
          
          <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 100 100">
            <defs>
              <linearGradient id={`gradient-${shiftNumber}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={shiftNumber === 1 ? "#3b82f6" : shiftNumber === 2 ? "#f59e0b" : "#8b5cf6"} />
                <stop offset="50%" stopColor={shiftNumber === 1 ? "#06b6d4" : shiftNumber === 2 ? "#f97316" : "#a855f7"} />
                <stop offset="100%" stopColor={shiftNumber === 1 ? "#0ea5e9" : shiftNumber === 2 ? "#ea580c" : "#7c3aed"} />
              </linearGradient>
              <filter id={`glow-${shiftNumber}`}>
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Círculo de fundo */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke={shiftNumber === 3 ? "#374151" : "#e5e7eb"}
              strokeWidth="8"
              fill="transparent"
              opacity="0.3"
            />
            
            {/* Círculo de progresso */}
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
              className="transition-all duration-2000 ease-out"
              filter={`url(#glow-${shiftNumber})`}
            />
          </svg>
          
          {/* Conteúdo central */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`
              text-3xl font-bold mb-1 transition-all duration-1000
              ${shiftNumber === 3 ? 'text-white' : config.textColor}
              animate-number-glow
            `}>
              {animatedEfficiency.toFixed(1)}%
            </div>
            <div className={`
              text-xs font-semibold tracking-wider uppercase
              ${shiftNumber === 3 ? 'text-purple-300' : 'text-gray-500'}
            `}>
              Eficiência
            </div>
            <div className={`
              flex items-center gap-1 mt-1 px-2 py-1 rounded-full text-xs
              ${shiftNumber === 3 ? 'bg-gray-800/50' : 'bg-white/50'}
            `}>
              <StatusIcon className={`w-3 h-3 ${statusInfo.color}`} />
              <span className={`${statusInfo.color} font-medium`}>
                {statusInfo.status}
              </span>
            </div>
          </div>
        </div>

        {/* Estatísticas modernas */}
        <div className="space-y-3">
          {/* Card Inseridos */}
          <div className={`
            relative p-4 rounded-lg border transition-all duration-300 hover:scale-105
            ${shiftNumber === 3 
              ? 'bg-emerald-900/20 border-emerald-700/30 hover:bg-emerald-900/30' 
              : 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
            }
          `}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`
                  p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 text-white
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  <Box className="w-4 h-4" />
                </div>
                <div>
                  <div className={`text-sm font-medium ${shiftNumber === 3 ? 'text-emerald-300' : 'text-emerald-700'}`}>
                    Inseridos
                  </div>
                  <div className="text-xs text-gray-500">Processados com sucesso</div>
                </div>
              </div>
              <div className={`
                text-xl font-bold transition-all duration-1000
                ${shiftNumber === 3 ? 'text-emerald-400' : 'text-emerald-600'}
              `}>
                {animatedInseridos.toLocaleString()}
              </div>
            </div>
          </div>
          
          {/* Card Rejeitados */}
          <div className={`
            relative p-4 rounded-lg border transition-all duration-300 hover:scale-105
            ${shiftNumber === 3 
              ? 'bg-red-900/20 border-red-700/30 hover:bg-red-900/30' 
              : 'bg-red-50 border-red-200 hover:bg-red-100'
            }
          `}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`
                  p-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-500 text-white
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  <TrendingDown className="w-4 h-4" />
                </div>
                <div>
                  <div className={`text-sm font-medium ${shiftNumber === 3 ? 'text-red-300' : 'text-red-700'}`}>
                    Rejeitados
                  </div>
                  <div className="text-xs text-gray-500">Itens com problemas</div>
                </div>
              </div>
              <div className={`
                text-xl font-bold transition-all duration-1000
                ${shiftNumber === 3 ? 'text-red-400' : 'text-red-600'}
              `}>
                {animatedRejeitos.toLocaleString()}
              </div>
            </div>
          </div>
          
          {/* Card Volume Total */}
          <div className={`
            relative p-4 rounded-lg border transition-all duration-300 hover:scale-105
            ${shiftNumber === 3 
              ? 'bg-blue-900/20 border-blue-700/30 hover:bg-blue-900/30' 
              : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
            }
          `}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`
                  p-2 rounded-lg bg-gradient-to-r ${config.gradient} text-white
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className={`text-sm font-medium ${shiftNumber === 3 ? 'text-blue-300' : 'text-blue-700'}`}>
                    Volume Total
                  </div>
                  <div className="text-xs text-gray-500">Produção do turno</div>
                </div>
              </div>
              <div className={`
                text-xl font-bold transition-all duration-1000
                ${shiftNumber === 3 ? 'text-blue-400' : 'text-blue-600'}
              `}>
                {(animatedInseridos + animatedRejeitos).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Barra de progresso futurística */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className={`text-sm font-medium ${shiftNumber === 3 ? 'text-white' : 'text-gray-700'}`}>
              Progresso Operacional
            </span>
            <div className="flex items-center gap-2">
              <Clock className={`w-4 h-4 ${shiftNumber === 3 ? 'text-purple-400' : config.textColor}`} />
              <span className={`text-xs ${shiftNumber === 3 ? 'text-purple-300' : 'text-gray-500'}`}>
                Tempo Real
              </span>
            </div>
          </div>
          <div className="relative">
            <Progress 
              value={animatedEfficiency} 
              className={`h-3 ${shiftNumber === 3 ? 'bg-gray-800' : 'bg-gray-200'}`}
            />
            <div className={`
              absolute top-0 left-0 h-3 bg-gradient-to-r ${config.gradient} rounded-full
              transition-all duration-2000 ease-out
              shadow-lg
            `} 
            style={{ width: `${animatedEfficiency}%` }} 
            />
          </div>
        </div>

        {/* Status operacional */}
        <div className={`
          text-center p-3 rounded-lg border-2 border-dashed transition-all duration-300
          ${shiftNumber === 3 
            ? 'border-purple-400/30 bg-purple-900/20' 
            : 'border-gray-300 bg-gray-50'
          }
        `}>
          <div className={`text-lg font-bold ${statusInfo.color} mb-1`}>
            {statusInfo.status}
          </div>
          <div className={`text-xs ${shiftNumber === 3 ? 'text-gray-400' : 'text-gray-500'}`}>
            Status da Operação • {config.theme}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
