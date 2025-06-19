
import { AggregatedData } from "@/hooks/useAggregatedData";
import { ProcessedDataItem } from "@/hooks/useProcessedData";
import { ShareData } from "@/types/share";
import { getRejectAnalysis } from "./rejectAnalysis";
import { getResponsibleAnalysis } from "./responsibleAnalysis";
import { getHourlyAnalysis } from "./hourlyAnalysis";
import { getTrendAnalysis } from "./trendAnalysis";
import { getOperationalSummary, getDateRange } from "./operationalSummary";

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
  
  // Métricas principais sempre no topo
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

  // KPIs Gerais (resumo executivo)
  if (shareData.kpisGerais) {
    text += `\n📋 *RESUMO EXECUTIVO*\n`;
    text += `• Eficiência Geral: ${aggregatedData.eficiencia.toFixed(2)}%\n`;
    text += `• Volume Processado: ${aggregatedData.totalInseridos + aggregatedData.totalRejeitos} itens\n`;
    text += `• Taxa de Sucesso: ${((aggregatedData.totalInseridos / (aggregatedData.totalInseridos + aggregatedData.totalRejeitos)) * 100).toFixed(1)}%\n`;
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
  
  return text;
};
