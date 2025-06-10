
import { useMemo } from 'react';
import { ProcessedDataItem } from './useProcessedData';

export const useTrendData = (filteredData: ProcessedDataItem[]) => {
  return useMemo(() => {
    return filteredData.slice(-30).map(item => ({
      ...item,
      meta: 75,
      zona_critica: 50,
      diferenca_meta: item.eficiencia - 75
    }));
  }, [filteredData]);
};
