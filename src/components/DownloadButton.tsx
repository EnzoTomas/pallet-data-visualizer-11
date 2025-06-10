
import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import { ProcessedDataItem } from "@/hooks/useProcessedData";
import { AggregatedData } from "@/hooks/useAggregatedData";

interface DownloadButtonProps {
  filteredData: ProcessedDataItem[];
  aggregatedData: AggregatedData;
}

export const DownloadButton = ({ filteredData, aggregatedData }: DownloadButtonProps) => {
  const { toast } = useToast();

  const downloadXLSX = () => {
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
        title: "Download XLSX realizado com sucesso!",
        description: "Os dados foram exportados para o arquivo XLSX.",
      });
    } catch (error) {
      console.error('Erro ao fazer download XLSX:', error);
      toast({
        title: "Erro no download",
        description: "Ocorreu um erro ao exportar os dados.",
        variant: "destructive",
      });
    }
  };

  const downloadPNG = async () => {
    try {
      const element = document.querySelector('.max-w-7xl') as HTMLElement;
      if (!element) {
        throw new Error('Elemento não encontrado');
      }

      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true
      });

      const link = document.createElement('a');
      link.download = `Status_Paletizacao_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.png`;
      link.href = canvas.toDataURL();
      link.click();

      toast({
        title: "Download PNG realizado com sucesso!",
        description: "A imagem foi capturada e baixada.",
      });
    } catch (error) {
      console.error('Erro ao fazer download PNG:', error);
      toast({
        title: "Erro no download",
        description: "Ocorreu um erro ao capturar a imagem.",
        variant: "destructive",
      });
    }
  };

  const downloadPDF = async () => {
    try {
      const element = document.querySelector('.max-w-7xl') as HTMLElement;
      if (!element) {
        throw new Error('Elemento não encontrado');
      }

      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 1.5,
        useCORS: true,
        allowTaint: true
      });

      const imgData = canvas.toDataURL('image/png');
      
      // Criar um link temporário para download como imagem
      // Para PDF real seria necessário uma biblioteca como jsPDF
      const link = document.createElement('a');
      link.download = `Status_Paletizacao_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.png`;
      link.href = imgData;
      link.click();

      toast({
        title: "Download de imagem realizado!",
        description: "A captura foi baixada como imagem (funcionalidade PDF em desenvolvimento).",
      });
    } catch (error) {
      console.error('Erro ao fazer download PDF:', error);
      toast({
        title: "Erro no download",
        description: "Ocorreu um erro ao gerar o arquivo.",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 px-2 text-xs"
        >
          <Download className="h-3 w-3" />
          <span className="hidden sm:inline">Download</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={downloadXLSX}>
          📊 Excel (.xlsx)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={downloadPNG}>
          🖼️ Imagem (.png)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={downloadPDF}>
          📄 PDF (em breve)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
