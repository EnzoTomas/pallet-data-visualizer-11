
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from 'xlsx';
import { ProcessedDataItem } from "@/hooks/useProcessedData";
import { AggregatedData } from "@/hooks/useAggregatedData";

interface DownloadButtonProps {
  filteredData: ProcessedDataItem[];
  aggregatedData: AggregatedData;
}

export const DownloadButton = ({ filteredData, aggregatedData }: DownloadButtonProps) => {
  const { toast } = useToast();

  const handleDownload = () => {
    try {
      // Criar planilha com dados principais
      const mainData = filteredData.map(item => ({
        'Data': item.date,
        'Total Inseridos': item.totalInseridos,
        'Total Rejeitos': item.totalRejeitos,
        'Eficiência (%)': item.eficiencia.toFixed(2),
        'Inseridos Turno 1': item.inseridos1T,
        'Rejeitos Turno 1': item.rejeitos1T,
        'Aderência Turno 1 (%)': item.aderencia1T.toFixed(2),
        'Inseridos Turno 2': item.inseridos2T,
        'Rejeitos Turno 2': item.rejeitos2T,
        'Aderência Turno 2 (%)': item.aderencia2T.toFixed(2),
        'Inseridos Turno 3': item.inseridos3T,
        'Rejeitos Turno 3': item.rejeitos3T,
        'Aderência Turno 3 (%)': item.aderencia3T.toFixed(2),
        'Erro Leitura Etiqueta': item.erroLeituraEtiqueta,
        'Madeira Pés Pallet': item.madeiraPesPallet,
        'Área Livre Pés': item.areaLivrePes,
        'Erro Contorno Altura': item.erroContornoAltura,
        'Erro Contorno Direita': item.erroContornoDireita,
        'Erro Contorno Esquerda': item.erroContornoEsquerda,
        'Erro Contorno Frente': item.erroContornoFrente,
        'Erro Contorno Traseira': item.erroContornoTraseira,
        'Falha Sensor': item.falhaSensor,
        'Pallet': item.pallet,
        'RN': item.rn
      }));

      // Criar planilha com resumo
      const summaryData = [{
        'Métrica': 'Eficiência Total (%)',
        'Valor': aggregatedData.eficiencia.toFixed(2)
      }, {
        'Métrica': 'Total Inseridos',
        'Valor': aggregatedData.totalInseridos
      }, {
        'Métrica': 'Total Rejeitos',
        'Valor': aggregatedData.totalRejeitos
      }, {
        'Métrica': 'Aderência Turno 1 (%)',
        'Valor': aggregatedData.aderencia1T.toFixed(2)
      }, {
        'Métrica': 'Aderência Turno 2 (%)',
        'Valor': aggregatedData.aderencia2T.toFixed(2)
      }, {
        'Métrica': 'Aderência Turno 3 (%)',
        'Valor': aggregatedData.aderencia3T.toFixed(2)
      }];

      // Criar workbook
      const wb = XLSX.utils.book_new();
      
      // Adicionar planilhas
      const wsMain = XLSX.utils.json_to_sheet(mainData);
      const wsSummary = XLSX.utils.json_to_sheet(summaryData);
      
      XLSX.utils.book_append_sheet(wb, wsMain, "Dados Detalhados");
      XLSX.utils.book_append_sheet(wb, wsSummary, "Resumo");

      // Gerar e fazer download
      const today = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');
      XLSX.writeFile(wb, `Status_Paletizacao_${today}.xlsx`);

      toast({
        title: "Download realizado com sucesso!",
        description: "Os dados foram exportados para o arquivo XLSX.",
      });
    } catch (error) {
      console.error('Erro ao fazer download:', error);
      toast({
        title: "Erro no download",
        description: "Ocorreu um erro ao exportar os dados.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleDownload}
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
    >
      <Download className="h-4 w-4" />
      Download XLSX
    </Button>
  );
};
