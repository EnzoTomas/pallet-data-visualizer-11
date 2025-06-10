
import { AggregatedData } from "@/hooks/useAggregatedData";
import { ProcessedDataItem } from "@/hooks/useProcessedData";
import { ShareData } from "@/types/share";

export const getRejectAnalysis = (filteredData: ProcessedDataItem[]): string => {
  if (!filteredData.length) return '';
  
  const rejectTypes = filteredData.reduce((acc, item) => {
    acc.erroLeituraEtiqueta += item.erroLeituraEtiqueta || 0;
    acc.madeiraPesPallet += item.madeiraPesPallet || 0;
    acc.areaLivrePes += item.areaLivrePes || 0;
    acc.erroContornoAltura += item.erroContornoAltura || 0;
    acc.erroContornoDireita += item.erroContornoDireita || 0;
    acc.erroContornoEsquerda += item.erroContornoEsquerda || 0;
    acc.erroContornoFrente += item.erroContornoFrente || 0;
    acc.erroContornoTraseira += item.erroContornoTraseira || 0;
    return acc;
  }, {
    erroLeituraEtiqueta: 0,
    madeiraPesPallet: 0,
    areaLivrePes: 0,
    erroContornoAltura: 0,
    erroContornoDireita: 0,
    erroContornoEsquerda: 0,
    erroContornoFrente: 0,
    erroContornoTraseira: 0
  });

  let analysis = '';
  if (rejectTypes.erroLeituraEtiqueta > 0) {
    analysis += `• ${rejectTypes.erroLeituraEtiqueta} rejeitos por erro de leitura da etiqueta\n`;
  }
  if (rejectTypes.madeiraPesPallet > 0) {
    analysis += `• ${rejectTypes.madeiraPesPallet} rejeitos por madeira dos pés do pallet\n`;
  }
  if (rejectTypes.areaLivrePes > 0) {
    analysis += `• ${rejectTypes.areaLivrePes} rejeitos por área livre nos pés\n`;
  }
  if (rejectTypes.erroContornoAltura > 0) {
    analysis += `• ${rejectTypes.erroContornoAltura} rejeitos por erro de contorno na altura\n`;
  }
  if (rejectTypes.erroContornoDireita > 0) {
    analysis += `• ${rejectTypes.erroContornoDireita} rejeitos por posicionamento à direita\n`;
  }
  if (rejectTypes.erroContornoEsquerda > 0) {
    analysis += `• ${rejectTypes.erroContornoEsquerda} rejeitos por posicionamento à esquerda\n`;
  }
  if (rejectTypes.erroContornoFrente > 0) {
    analysis += `• ${rejectTypes.erroContornoFrente} rejeitos por posicionamento na frente\n`;
  }
  if (rejectTypes.erroContornoTraseira > 0) {
    analysis += `• ${rejectTypes.erroContornoTraseira} rejeitos por posicionamento na traseira\n`;
  }

  return analysis;
};

export const getResponsibleAnalysis = (filteredData: ProcessedDataItem[]): string => {
  if (!filteredData.length) return '';
  
  const responsible = filteredData.reduce((acc, item) => {
    acc.falhaSensor += item.falhaSensor || 0;
    acc.pallet += item.pallet || 0;
    acc.rn += item.rn || 0;
    return acc;
  }, {
    falhaSensor: 0,
    pallet: 0,
    rn: 0
  });

  const total = responsible.falhaSensor + responsible.pallet + responsible.rn;
  if (total === 0) return '';

  let analysis = '';
  if (responsible.rn > 0) {
    const percentage = ((responsible.rn / total) * 100).toFixed(1);
    analysis += `• RN: ${responsible.rn}, representando ${percentage}%\n`;
  }
  if (responsible.falhaSensor > 0) {
    const percentage = ((responsible.falhaSensor / total) * 100).toFixed(1);
    analysis += `• Falha no sensor: ${responsible.falhaSensor}, representando ${percentage}%\n`;
  }
  if (responsible.pallet > 0) {
    const percentage = ((responsible.pallet / total) * 100).toFixed(1);
    analysis += `• Pallet: ${responsible.pallet}, representando ${percentage}%\n`;
  }

  return analysis;
};

export const getDateRange = (filteredData: ProcessedDataItem[]): string => {
  if (!filteredData.length) return '';
  
  const dates = filteredData.map(item => item.date).sort();
  const firstDate = dates[0];
  const lastDate = dates[dates.length - 1];
  
  if (firstDate === lastDate) {
    return `Referente à data ${firstDate}`;
  }
  
  return `Referente a(s) data(s) ${firstDate} até ${lastDate}`;
};

export const generateShareText = (
  aggregatedData: AggregatedData,
  shareData: ShareData,
  filteredData: ProcessedDataItem[]
): string => {
  let text = "📊 *Status Paletização*\n\n";
  
  const dateRange = getDateRange(filteredData);
  if (dateRange) {
    text += `${dateRange}\n\n`;
  }
  
  if (shareData.eficiencia) {
    text += `🎯 Eficiência Total: ${aggregatedData.eficiencia.toFixed(2)}%\n`;
  }
  
  if (shareData.inseridos) {
    text += `✅ Total Inseridos: ${aggregatedData.totalInseridos}\n`;
  }
  
  if (shareData.rejeitos) {
    text += `❌ Total Rejeitos: ${aggregatedData.totalRejeitos}\n`;
  }
  
  if (shareData.turnos) {
    text += `\n🕐 *Por Turno:*\n`;
    text += `• Turno 1 - Inseridos: ${aggregatedData.inseridos1T}, Rejeitos: ${aggregatedData.rejeitos1T}, Eficiência: ${aggregatedData.aderencia1T.toFixed(2)}%\n`;
    text += `• Turno 2 - Inseridos: ${aggregatedData.inseridos2T}, Rejeitos: ${aggregatedData.rejeitos2T}, Eficiência: ${aggregatedData.aderencia2T.toFixed(2)}%\n`;
    text += `• Turno 3 - Inseridos: ${aggregatedData.inseridos3T}, Rejeitos: ${aggregatedData.rejeitos3T}, Eficiência: ${aggregatedData.aderencia3T.toFixed(2)}%\n`;
  }

  if (shareData.analiseRejeitos) {
    const rejectAnalysis = getRejectAnalysis(filteredData);
    if (rejectAnalysis) {
      text += `\n📊 *Análise de Rejeitos:*\n${rejectAnalysis}`;
    }
  }

  if (shareData.responsaveisRejeitos) {
    const responsibleAnalysis = getResponsibleAnalysis(filteredData);
    if (responsibleAnalysis) {
      text += `\n👥 *Responsáveis pelos Rejeitos:*\n${responsibleAnalysis}`;
    }
  }
  
  return text;
};
