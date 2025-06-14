
import { useMemo } from 'react';

export interface ProcessedDataItem {
  date: string;
  totalInseridos: number;
  totalRejeitos: number;
  eficiencia: number;
  erroLeituraEtiqueta: number;
  madeiraPesPallet: number;
  areaLivrePes: number;
  erroContornoAltura: number;
  erroContornoDireita: number;
  erroContornoEsquerda: number;
  erroContornoFrente: number;
  erroContornoTraseira: number;
  falhaSensor: number;
  pallet: number;
  rn: number;
  inseridos1T: number;
  rejeitos1T: number;
  aderencia1T: number;
  inseridos2T: number;
  rejeitos2T: number;
  aderencia2T: number;
  inseridos3T: number;
  rejeitos3T: number;
  aderencia3T: number;
  total: () => number;
}

export const useProcessedData = (csvData: string) => {
  return useMemo(() => {
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
};
