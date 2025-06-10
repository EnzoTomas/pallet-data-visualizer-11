
import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ShareType, ShareData } from '@/types/share';
import { AggregatedData } from "@/hooks/useAggregatedData";
import { ProcessedDataItem } from "@/hooks/useProcessedData";
import { generateShareText, generateImageShareText, generateBothShareText } from '@/utils/shareUtils';

interface SharePlatformButtonsProps {
  shareType: ShareType;
  shareData: ShareData;
  aggregatedData: AggregatedData;
  filteredData: ProcessedDataItem[];
  onClose: () => void;
}

export const SharePlatformButtons = ({
  shareType,
  shareData,
  aggregatedData,
  filteredData,
  onClose
}: SharePlatformButtonsProps) => {
  const { toast } = useToast();

  const getShareContent = () => {
    switch (shareType) {
      case 'dados':
        return generateShareText(aggregatedData, shareData, filteredData);
      case 'imagens':
        return generateImageShareText();
      case 'ambos':
        return generateBothShareText(aggregatedData, shareData, filteredData);
      default:
        return generateShareText(aggregatedData, shareData, filteredData);
    }
  };

  const shareToWhatsApp = async () => {
    if (shareType === 'imagens' || shareType === 'ambos') {
      toast({
        title: "Compartilhamento de imagem",
        description: "Para compartilhar imagens, tire uma captura de tela do dashboard e envie manualmente no WhatsApp.",
      });
      onClose();
      return;
    }

    const text = getShareContent();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    onClose();
    toast({
      title: "Compartilhamento iniciado",
      description: "Redirecionando para o WhatsApp...",
    });
  };

  const shareToGmail = async () => {
    if (shareType === 'imagens' || shareType === 'ambos') {
      toast({
        title: "Compartilhamento de imagem",
        description: "Para compartilhar imagens, tire uma captura de tela do dashboard e anexe ao email.",
      });
      onClose();
      return;
    }

    const text = getShareContent();
    const subject = "Status Paletização - Relatório";
    const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    onClose();
    toast({
      title: "Compartilhamento iniciado",
      description: "Abrindo cliente de email...",
    });
  };

  const copyToClipboard = async () => {
    if (shareType === 'imagens') {
      toast({
        title: "Compartilhamento de imagem",
        description: "Para compartilhar imagens, tire uma captura de tela do dashboard.",
      });
      onClose();
      return;
    }

    const text = getShareContent();
    navigator.clipboard.writeText(text).then(() => {
      onClose();
      toast({
        title: "Copiado!",
        description: "Texto copiado para a área de transferência.",
      });
    });
  };

  const shareToTelegram = async () => {
    if (shareType === 'imagens' || shareType === 'ambos') {
      toast({
        title: "Compartilhamento de imagem",
        description: "Para compartilhar imagens, tire uma captura de tela do dashboard e envie manualmente no Telegram.",
      });
      onClose();
      return;
    }

    const text = getShareContent();
    const url = `https://t.me/share/url?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    onClose();
    toast({
      title: "Compartilhamento iniciado",
      description: "Redirecionando para o Telegram...",
    });
  };

  return (
    <div className="border-t pt-4">
      <h4 className="text-sm font-medium mb-3">Escolha a plataforma:</h4>
      <div className="grid grid-cols-2 gap-2">
        <Button onClick={shareToWhatsApp} variant="outline" size="sm" className="w-full text-xs">
          📱 WhatsApp
        </Button>
        <Button onClick={shareToGmail} variant="outline" size="sm" className="w-full text-xs">
          📧 Gmail
        </Button>
        <Button onClick={shareToTelegram} variant="outline" size="sm" className="w-full text-xs">
          💬 Telegram
        </Button>
        <Button onClick={copyToClipboard} variant="outline" size="sm" className="w-full text-xs">
          📋 Copiar
        </Button>
      </div>
    </div>
  );
};
