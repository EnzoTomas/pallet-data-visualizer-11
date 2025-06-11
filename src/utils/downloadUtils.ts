import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ProcessedDataItem } from "@/hooks/useProcessedData";
import { AggregatedData } from "@/hooks/useAggregatedData";

export const downloadXLSX = (filteredData: ProcessedDataItem[], aggregatedData: AggregatedData) => {
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
};

// Configuração otimizada para html2canvas com alta qualidade
export const getHighQualityCanvasConfig = () => ({
  scale: 3, // Aumenta significativamente a resolução (era 2, agora 3)
  backgroundColor: '#ffffff', // Fundo branco sólido para evitar transparência
  useCORS: true, // Permite carregamento de recursos externos
  allowTaint: false, // Segurança para recursos externos
  logging: false, // Desabilita logs para performance
  imageTimeout: 30000, // 30 segundos para carregar imagens
  removeContainer: true, // Remove elementos temporários
  foreignObjectRendering: false, // Melhor compatibilidade
  width: undefined, // Deixa o html2canvas calcular automaticamente
  height: undefined, // Deixa o html2canvas calcular automaticamente
  ignoreElements: (element: Element) => {
    // Ignora scripts e estilos que podem interferir
    return element.tagName === 'SCRIPT' || element.tagName === 'STYLE';
  },
  onclone: (clonedDoc: Document) => {
    // Aguarda um pouco para garantir que tudo carregou
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // Força estilos para melhor contraste e nitidez
        const clonedElement = clonedDoc.querySelector('.max-w-7xl');
        if (clonedElement) {
          const element = clonedElement as HTMLElement;
          // Aumenta contraste, brilho e saturação
          element.style.filter = 'contrast(1.5) brightness(1.2) saturate(1.4)';
          element.style.backgroundColor = '#ffffff';
          // Força anti-aliasing
          element.style.webkitFontSmoothing = 'antialiased';
          element.style.fontSmooth = 'always';
          // Melhora a renderização de texto
          element.style.textRendering = 'optimizeLegibility';
        }
        
        // Força cores mais escuras para todos os textos
        const allElements = clonedDoc.querySelectorAll('*');
        allElements.forEach((el) => {
          const element = el as HTMLElement;
          const computedStyle = window.getComputedStyle(element);
          
          // Força textos escuros
          if (computedStyle.color) {
            const rgb = computedStyle.color.match(/\d+/g);
            if (rgb && rgb.length >= 3) {
              const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
              if (brightness > 100) {
                element.style.color = '#000000 !important';
                element.style.setProperty('color', '#000000', 'important');
              }
            }
          }
          
          // Força backgrounds claros para cards
          if (element.classList.contains('bg-card') || 
              element.classList.contains('bg-background') ||
              element.classList.contains('bg-white')) {
            element.style.backgroundColor = '#ffffff !important';
            element.style.setProperty('background-color', '#ffffff', 'important');
          }
          
          // Melhora a renderização de bordas
          if (computedStyle.borderColor) {
            element.style.borderColor = '#e5e7eb !important';
            element.style.setProperty('border-color', '#e5e7eb', 'important');
          }
        });
        
        resolve();
      }, 500); // Aguarda 500ms para garantir renderização completa
    });
  }
});

export const downloadPNG = async () => {
  const element = document.querySelector('.max-w-7xl') as HTMLElement;
  if (!element) {
    throw new Error('Elemento não encontrado para captura');
  }

  // Aguarda um momento para garantir que a página está totalmente renderizada
  await new Promise(resolve => setTimeout(resolve, 1000));

  const canvas = await html2canvas(element, getHighQualityCanvasConfig());

  // Melhora adicional da qualidade da imagem
  const link = document.createElement('a');
  link.download = `Status_Paletizacao_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.png`;
  // Usa qualidade máxima (1.0) para PNG
  link.href = canvas.toDataURL('image/png', 1.0);
  link.click();
};

export const downloadPDF = async () => {
  const element = document.querySelector('.max-w-7xl') as HTMLElement;
  if (!element) {
    throw new Error('Elemento não encontrado para captura');
  }

  // Aguarda um momento para garantir que a página está totalmente renderizada
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Configuração específica para PDF (escala um pouco menor para gerenciar tamanho do arquivo)
  const pdfConfig = {
    ...getHighQualityCanvasConfig(),
    scale: 2.5 // Um pouco menor que PNG para otimizar tamanho do PDF
  };

  const canvas = await html2canvas(element, pdfConfig);

  // Usa qualidade máxima para o canvas
  const imgData = canvas.toDataURL('image/png', 1.0);
  
  // Criar PDF com jsPDF em orientação landscape
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
    compress: false // Desabilita compressão para manter qualidade
  });

  const imgWidth = 297; // A4 landscape width em mm
  const pageHeight = 210; // A4 landscape height em mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;

  let position = 0;

  // Adiciona primeira página com qualidade máxima
  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
  heightLeft -= pageHeight;

  // Adiciona páginas extras se necessário
  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
    heightLeft -= pageHeight;
  }

  const today = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');
  pdf.save(`Status_Paletizacao_${today}.pdf`);
};
