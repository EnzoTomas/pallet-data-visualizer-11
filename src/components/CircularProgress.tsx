
import { Card } from "@/components/ui/card";
import { CountUp } from "@/components/CountUp";

interface CircularProgressProps {
  percentage: number;
  label: string;
  inseridos: number;
  rejeitos: number;
}

export const CircularProgress = ({ percentage, label, inseridos, rejeitos }: CircularProgressProps) => {
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
