
import { useMemo } from 'react';
import { ProcessedDataItem } from './useProcessedData';

export const useTrendData = (filteredData: ProcessedDataItem[]) => {
  return useMemo(() => {
    return filteredData.slice(-30).map(item => ({
      ...item,
      meta: 92, // Nova meta de 92%
      zona_critica: 70, // Zona crítica ajustada para 70%
      diferenca_meta: item.eficiencia - 92
    }));
  }, [filteredData]);
};
