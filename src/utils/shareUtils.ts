
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

export const getHourlyAnalysis = (filteredData: ProcessedDataItem[]): string => {
  if (!filteredData.length) return '';

  // Agrupar dados por hora
  const hourlyData = filteredData.reduce((acc, item) => {
    const hour = new Date(`${item.date} ${item.time}`).getHours();
    if (!acc[hour]) {
      acc[hour] = { inseridos: 0, rejeitos: 0, total: 0 };
    }
    acc[hour].inseridos += item.totalInseridos || 0;
    acc[hour].rejeitos += item.totalRejeitos || 0;
    acc[hour].total += (item.totalInseridos || 0) + (item.totalRejeitos || 0);
    return acc;
  }, {} as Record<number, { inseridos: number; rejeitos: number; total: number }>);

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

export const getTrendAnalysis = (filteredData: ProcessedDataItem[]): string => {
  if (!filteredData.length) return '';

  const sortedData = filteredData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const recentData = sortedData.slice(-7); // Últimos 7 dias

  if (recentData.length < 2) return '';

  const firstDay = recentData[0];
  const lastDay = recentData[recentData.length - 1];
  
  const firstEfficiency = firstDay.eficiencia || 0;
  const lastEfficiency = lastDay.eficiencia || 0;
  const trend = lastEfficiency - firstEfficiency;

  let analysis = '';
  if (trend > 0) {
    analysis += `• Tendência positiva: +${trend.toFixed(1)}% de melhoria\n`;
  } else if (trend < 0) {
    analysis += `• Tendência negativa: ${trend.toFixed(1)}% de queda\n`;
  } else {
    analysis += `• Tendência estável no período\n`;
  }

  const avgEfficiency = recentData.reduce((sum, day) => sum + (day.eficiencia || 0), 0) / recentData.length;
  analysis += `• Eficiência média dos últimos dias: ${avgEfficiency.toFixed(1)}%\n`;

  return analysis;
};

export const getOperationalSummary = (aggregatedData: AggregatedData, filteredData: ProcessedDataItem[]): string => {
  let summary = '';
  
  const totalProcessed = aggregatedData.totalInseridos + aggregatedData.totalRejeitos;
  summary += `• Volume total processado: ${totalProcessed} itens\n`;
  summary += `• Taxa de sucesso: ${((aggregatedData.totalInseridos / totalProcessed) * 100).toFixed(1)}%\n`;
  summary += `• Taxa de rejeição: ${((aggregatedData.totalRejeitos / totalProcessed) * 100).toFixed(1)}%\n`;
  
  // Melhor turno
  const turnos = [
    { nome: '1º Turno', eficiencia: aggregatedData.aderencia1T },
    { nome: '2º Turno', eficiencia: aggregatedData.aderencia2T },
    { nome: '3º Turno', eficiencia: aggregatedData.aderencia3T }
  ];
  
  const melhorTurno = turnos.reduce((best, turno) => 
    turno.eficiencia > best.eficiencia ? turno : best
  );
  
  summary += `• Melhor turno: ${melhorTurno.nome} (${melhorTurno.eficiencia.toFixed(1)}%)\n`;
  
  // Status da meta
  const meta = 92;
  if (aggregatedData.eficiencia >= meta) {
    summary += `• ✅ Meta atingida! (${aggregatedData.eficiencia.toFixed(1)}% ≥ ${meta}%)\n`;
  } else {
    const diferenca = meta - aggregatedData.eficiencia;
    summary += `• ⚠️ Meta não atingida (faltam ${diferenca.toFixed(1)}% para ${meta}%)\n`;
  }

  return summary;
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
  let text = "📊 *Status Paletização - Relatório Completo*\n\n";
  
  const dateRange = getDateRange(filteredData);
  if (dateRange) {
    text += `${dateRange}\n\n`;
  }
  
  // KPIs Gerais
  if (shareData.kpisGerais) {
    text += `📋 *RESUMO EXECUTIVO*\n`;
    text += `• Eficiência Geral: ${aggregatedData.eficiencia.toFixed(2)}%\n`;
    text += `• Volume Processado: ${aggregatedData.totalInseridos + aggregatedData.totalRejeitos} itens\n`;
    text += `• Taxa de Sucesso: ${((aggregatedData.totalInseridos / (aggregatedData.totalInseridos + aggregatedData.totalRejeitos)) * 100).toFixed(1)}%\n\n`;
  }
  
  // Métricas individuais
  if (shareData.eficiencia) {
    text += `🎯 Eficiência Total: ${aggregatedData.eficiencia.toFixed(2)}%\n`;
  }
  
  if (shareData.inseridos) {
    text += `✅ Total Inseridos: ${aggregatedData.totalInseridos}\n`;
  }
  
  if (shareData.rejeitos) {
    text += `❌ Total Rejeitos: ${aggregatedData.totalRejeitos}\n`;
  }
  
  // Análise por turnos
  if (shareData.turnos) {
    text += `\n🕐 *ANÁLISE POR TURNO:*\n`;
    text += `• Turno 1 (06:00-14:00) - Inseridos: ${aggregatedData.inseridos1T}, Rejeitos: ${aggregatedData.rejeitos1T}, Eficiência: ${aggregatedData.aderencia1T.toFixed(2)}%\n`;
    text += `• Turno 2 (14:00-22:00) - Inseridos: ${aggregatedData.inseridos2T}, Rejeitos: ${aggregatedData.rejeitos2T}, Eficiência: ${aggregatedData.aderencia2T.toFixed(2)}%\n`;
    text += `• Turno 3 (22:00-06:00) - Inseridos: ${aggregatedData.inseridos3T}, Rejeitos: ${aggregatedData.rejeitos3T}, Eficiência: ${aggregatedData.aderencia3T.toFixed(2)}%\n`;
  }

  // Comparação entre turnos
  if (shareData.comparacaoTurnos) {
    const turnos = [
      { nome: '1º Turno', eficiencia: aggregatedData.aderencia1T, total: aggregatedData.inseridos1T + aggregatedData.rejeitos1T },
      { nome: '2º Turno', eficiencia: aggregatedData.aderencia2T, total: aggregatedData.inseridos2T + aggregatedData.rejeitos2T },
      { nome: '3º Turno', eficiencia: aggregatedData.aderencia3T, total: aggregatedData.inseridos3T + aggregatedData.rejeitos3T }
    ];
    
    const melhorTurno = turnos.reduce((best, turno) => turno.eficiencia > best.eficiencia ? turno : best);
    const maiorVolume = turnos.reduce((best, turno) => turno.total > best.total ? turno : best);
    
    text += `\n🏆 *DESTAQUES DOS TURNOS:*\n`;
    text += `• Melhor eficiência: ${melhorTurno.nome} (${melhorTurno.eficiencia.toFixed(1)}%)\n`;
    text += `• Maior volume: ${maiorVolume.nome} (${maiorVolume.total} itens)\n`;
  }

  // Análise horária
  if (shareData.analiseHoraria) {
    const hourlyAnalysis = getHourlyAnalysis(filteredData);
    if (hourlyAnalysis) {
      text += `\n⏰ *ANÁLISE HORÁRIA:*\n${hourlyAnalysis}`;
    }
  }

  // Análise de rejeitos
  if (shareData.analiseRejeitos) {
    const rejectAnalysis = getRejectAnalysis(filteredData);
    if (rejectAnalysis) {
      text += `\n📊 *ANÁLISE DE REJEITOS:*\n${rejectAnalysis}`;
    }
  }

  // Responsáveis pelos rejeitos
  if (shareData.responsaveisRejeitos) {
    const responsibleAnalysis = getResponsibleAnalysis(filteredData);
    if (responsibleAnalysis) {
      text += `\n👥 *RESPONSÁVEIS PELOS REJEITOS:*\n${responsibleAnalysis}`;
    }
  }

  // Tendências
  if (shareData.graficoTendencia) {
    const trendAnalysis = getTrendAnalysis(filteredData);
    if (trendAnalysis) {
      text += `\n📈 *ANÁLISE DE TENDÊNCIAS:*\n${trendAnalysis}`;
    }
  }

  // Volume
  if (shareData.graficoVolume) {
    const totalDays = new Set(filteredData.map(item => item.date)).size;
    const avgDaily = (aggregatedData.totalInseridos + aggregatedData.totalRejeitos) / totalDays;
    text += `\n📊 *ANÁLISE DE VOLUME:*\n`;
    text += `• Dias analisados: ${totalDays}\n`;
    text += `• Média diária: ${avgDaily.toFixed(0)} itens\n`;
  }

  // Resumo operacional
  if (shareData.resumoOperacional) {
    const operationalSummary = getOperationalSummary(aggregatedData, filteredData);
    if (operationalSummary) {
      text += `\n🎯 *RESUMO OPERACIONAL:*\n${operationalSummary}`;
    }
  }
  
  text += `\n⚡ Relatório gerado automaticamente pelo Sistema de Paletização`;
  
  return text;
};
