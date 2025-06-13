
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
  // Novos campos de inseridos por hora (00-23)
  inserido00: number;
  inserido01: number;
  inserido02: number;
  inserido03: number;
  inserido04: number;
  inserido05: number;
  inserido06: number;
  inserido07: number;
  inserido08: number;
  inserido09: number;
  inserido10: number;
  inserido11: number;
  inserido12: number;
  inserido13: number;
  inserido14: number;
  inserido15: number;
  inserido16: number;
  inserido17: number;
  inserido18: number;
  inserido19: number;
  inserido20: number;
  inserido21: number;
  inserido22: number;
  inserido23: number;
  // Novos campos de rejeitos por hora (00-23)
  rejeito00: number;
  rejeito01: number;
  rejeito02: number;
  rejeito03: number;
  rejeito04: number;
  rejeito05: number;
  rejeito06: number;
  rejeito07: number;
  rejeito08: number;
  rejeito09: number;
  rejeito10: number;
  rejeito11: number;
  rejeito12: number;
  rejeito13: number;
  rejeito14: number;
  rejeito15: number;
  rejeito16: number;
  rejeito17: number;
  rejeito18: number;
  rejeito19: number;
  rejeito20: number;
  rejeito21: number;
  rejeito22: number;
  rejeito23: number;
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
        // Inseridos por hora (índices 24-47)
        inserido00: parseInt(values[24]) || 0,
        inserido01: parseInt(values[25]) || 0,
        inserido02: parseInt(values[26]) || 0,
        inserido03: parseInt(values[27]) || 0,
        inserido04: parseInt(values[28]) || 0,
        inserido05: parseInt(values[29]) || 0,
        inserido06: parseInt(values[30]) || 0,
        inserido07: parseInt(values[31]) || 0,
        inserido08: parseInt(values[32]) || 0,
        inserido09: parseInt(values[33]) || 0,
        inserido10: parseInt(values[34]) || 0,
        inserido11: parseInt(values[35]) || 0,
        inserido12: parseInt(values[36]) || 0,
        inserido13: parseInt(values[37]) || 0,
        inserido14: parseInt(values[38]) || 0,
        inserido15: parseInt(values[39]) || 0,
        inserido16: parseInt(values[40]) || 0,
        inserido17: parseInt(values[41]) || 0,
        inserido18: parseInt(values[42]) || 0,
        inserido19: parseInt(values[43]) || 0,
        inserido20: parseInt(values[44]) || 0,
        inserido21: parseInt(values[45]) || 0,
        inserido22: parseInt(values[46]) || 0,
        inserido23: parseInt(values[47]) || 0,
        // Rejeitos por hora (índices 48-71)
        rejeito00: parseInt(values[48]) || 0,
        rejeito01: parseInt(values[49]) || 0,
        rejeito02: parseInt(values[50]) || 0,
        rejeito03: parseInt(values[51]) || 0,
        rejeito04: parseInt(values[52]) || 0,
        rejeito05: parseInt(values[53]) || 0,
        rejeito06: parseInt(values[54]) || 0,
        rejeito07: parseInt(values[55]) || 0,
        rejeito08: parseInt(values[56]) || 0,
        rejeito09: parseInt(values[57]) || 0,
        rejeito10: parseInt(values[58]) || 0,
        rejeito11: parseInt(values[59]) || 0,
        rejeito12: parseInt(values[60]) || 0,
        rejeito13: parseInt(values[61]) || 0,
        rejeito14: parseInt(values[62]) || 0,
        rejeito15: parseInt(values[63]) || 0,
        rejeito16: parseInt(values[64]) || 0,
        rejeito17: parseInt(values[65]) || 0,
        rejeito18: parseInt(values[66]) || 0,
        rejeito19: parseInt(values[67]) || 0,
        rejeito20: parseInt(values[68]) || 0,
        rejeito21: parseInt(values[69]) || 0,
        rejeito22: parseInt(values[70]) || 0,
        rejeito23: parseInt(values[71]) || 0,
        total: function() { return this.totalInseridos + this.totalRejeitos; }
      };
    }).filter(item => item.total() > 0);
  }, [csvData]);
};
