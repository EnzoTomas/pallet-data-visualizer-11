
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CircularProgressProps {
  title: string;
  inseridos: number;
  rejeitos: number;
  eficiencia: number;
  shiftNumber: number;
  data: any[];
}

export const CircularProgress = ({ title, inseridos, rejeitos, eficiencia }: CircularProgressProps) => {
  const total = inseridos + rejeitos;
  
  const getColor = (efficiency: number) => {
    if (efficiency >= 70) return "bg-green-500";
    if (efficiency >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getTextColor = (efficiency: number) => {
    if (efficiency >= 70) return "text-green-600";
    if (efficiency >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-accent/5 border-t-4 border-t-accent">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Circular Progress */}
        <div className="relative w-32 h-32 mx-auto">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r="54"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r="54"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 54}`}
              strokeDashoffset={`${2 * Math.PI * 54 * (1 - eficiencia / 100)}`}
              className={getTextColor(eficiencia).replace('text-', 'text-')}
              strokeLinecap="round"
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-2xl font-bold ${getTextColor(eficiencia)}`}>
              {eficiencia.toFixed(1)}%
            </span>
            <span className="text-xs text-gray-500">Eficiência</span>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Inseridos:</span>
            <span className="font-semibold text-primary">{inseridos}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Rejeitados:</span>
            <span className="font-semibold text-destructive">{rejeitos}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t">
            <span className="text-sm font-medium text-gray-700">Volume Total:</span>
            <span className="font-bold text-accent-foreground">{total}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Meta: 50%</span>
            <span>{eficiencia.toFixed(1)}%</span>
          </div>
          <Progress value={eficiencia} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};
