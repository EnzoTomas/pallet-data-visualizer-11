
import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
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
        scale: 4,
        useCORS: true,
        allowTaint: false,
        logging: false,
        imageTimeout: 30000,
        removeContainer: true,
        foreignObjectRendering: false,
        ignoreElements: (element) => {
          return element.tagName === 'SCRIPT' || element.tagName === 'STYLE';
        },
        onclone: (clonedDoc) => {
          // Melhorar contraste e cores no documento clonado
          const clonedElement = clonedDoc.querySelector('.max-w-7xl');
          if (clonedElement) {
            (clonedElement as HTMLElement).style.filter = 'contrast(1.8) brightness(1.4) saturate(1.3)';
            (clonedElement as HTMLElement).style.backgroundColor = '#ffffff';
          }
          
          // Garantir que todos os textos tenham cor escura e backgrounds claros
          const allTextElements = clonedDoc.querySelectorAll('*');
          allTextElements.forEach((el) => {
            const element = el as HTMLElement;
            const styles = window.getComputedStyle(element);
            
            // Forçar cores mais escuras para textos
            if (styles.color && (styles.color.includes('rgb(') || styles.color.includes('rgba('))) {
              const rgb = styles.color.match(/\d+/g);
              if (rgb && rgb.length >= 3) {
                const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
                if (brightness > 120) { // Limiar menor para escurecer mais textos
                  element.style.color = '#111827 !important';
                  element.style.setProperty('color', '#111827', 'important');
                }
              }
            }
            
            // Garantir backgrounds claros para cards e elementos importantes
            if (element.classList.contains('bg-card') || element.classList.contains('bg-background')) {
              element.style.backgroundColor = '#ffffff !important';
              element.style.setProperty('background-color', '#ffffff', 'important');
            }
          });
        }
      });

      const link = document.createElement('a');
      link.download = `Status_Paletizacao_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
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
        scale: 3,
        useCORS: true,
        allowTaint: false,
        logging: false,
        imageTimeout: 30000,
        removeContainer: true,
        foreignObjectRendering: false,
        ignoreElements: (element) => {
          return element.tagName === 'SCRIPT' || element.tagName === 'STYLE';
        },
        onclone: (clonedDoc) => {
          // Melhorar contraste e cores no documento clonado
          const clonedElement = clonedDoc.querySelector('.max-w-7xl');
          if (clonedElement) {
            (clonedElement as HTMLElement).style.filter = 'contrast(1.8) brightness(1.4) saturate(1.3)';
            (clonedElement as HTMLElement).style.backgroundColor = '#ffffff';
          }
          
          // Garantir que todos os textos tenham cor escura e backgrounds claros
          const allTextElements = clonedDoc.querySelectorAll('*');
          allTextElements.forEach((el) => {
            const element = el as HTMLElement;
            const styles = window.getComputedStyle(element);
            
            // Forçar cores mais escuras para textos
            if (styles.color && (styles.color.includes('rgb(') || styles.color.includes('rgba('))) {
              const rgb = styles.color.match(/\d+/g);
              if (rgb && rgb.length >= 3) {
                const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
                if (brightness > 120) { // Limiar menor para escurecer mais textos
                  element.style.color = '#111827 !important';
                  element.style.setProperty('color', '#111827', 'important');
                }
              }
            }
            
            // Garantir backgrounds claros para cards e elementos importantes
            if (element.classList.contains('bg-card') || element.classList.contains('bg-background')) {
              element.style.backgroundColor = '#ffffff !important';
              element.style.setProperty('background-color', '#ffffff', 'important');
            }
          });
        }
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      
      // Criar PDF com jsPDF
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 297; // A4 landscape width in mm
      const pageHeight = 210; // A4 landscape height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Adicionar primeira página
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
      heightLeft -= pageHeight;

      // Adicionar páginas extras se necessário
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
        heightLeft -= pageHeight;
      }

      const today = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');
      pdf.save(`Status_Paletizacao_${today}.pdf`);

      toast({
        title: "Download PDF realizado com sucesso!",
        description: "O PDF foi gerado e baixado.",
      });
    } catch (error) {
      console.error('Erro ao fazer download PDF:', error);
      toast({
        title: "Erro no download",
        description: "Ocorreu um erro ao gerar o PDF.",
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
          📄 PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
