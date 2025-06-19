
import { ProcessedDataItem } from "@/hooks/useProcessedData";

export const getHourlyAnalysis = (filteredData: ProcessedDataItem[]): string => {
  if (!filteredData.length) return '';

  // Agrupar dados usando os arrays inseridosHora e rejeitosHora existentes
  const hourlyData: Record<number, { inseridos: number; rejeitos: number; total: number }> = {};

  filteredData.forEach(item => {
    for (let hour = 0; hour < 24; hour++) {
      if (!hourlyData[hour]) {
        hourlyData[hour] = { inseridos: 0, rejeitos: 0, total: 0 };
      }
      hourlyData[hour].inseridos += item.inseridosHora[hour] || 0;
      hourlyData[hour].rejeitos += item.rejeitosHora[hour] || 0;
      hourlyData[hour].total += (item.inseridosHora[hour] || 0) + (item.rejeitosHora[hour] || 0);
    }
  });

  // Encontrar picos e mínimos
  const hours = Object.keys(hourlyData).map(Number).sort((a, b) => a - b);
  let analysis = '';

  if (hours.length > 0) {
    const bestHour = hours.reduce((best, hour) => 
      hourlyData[hour].total > hourlyData[best].total ? hour : best
    );
    const worstHour = hours.reduce((worst, hour) => 
      hourlyData[hour].total < hourlyData[worst].total ? hour : worst
    );

    analysis += `• Pico de produção: ${bestHour}h com ${hourlyData[bestHour].total} itens\n`;
    analysis += `• Menor produção: ${worstHour}h com ${hourlyData[worstHour].total} itens\n`;
    
    const avgProduction = hours.reduce((sum, hour) => sum + hourlyData[hour].total, 0) / hours.length;
    analysis += `• Média horária: ${avgProduction.toFixed(0)} itens\n`;
  }

  return analysis;
};
