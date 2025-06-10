
import React, { useState } from 'react';
import { Share, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { AggregatedData } from "@/hooks/useAggregatedData";

interface ShareButtonProps {
  aggregatedData: AggregatedData;
}

interface ShareData {
  eficiencia: boolean;
  inseridos: boolean;
  rejeitos: boolean;
  turnos: boolean;
}

export const ShareButton = ({ aggregatedData }: ShareButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shareData, setShareData] = useState<ShareData>({
    eficiencia: true,
    inseridos: true,
    rejeitos: false,
    turnos: false
  });
  const { toast } = useToast();

  const generateShareText = () => {
    let text = "📊 *Status Paletização*\n\n";
    
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
      text += `• Turno 1: ${aggregatedData.aderencia1T.toFixed(2)}%\n`;
      text += `• Turno 2: ${aggregatedData.aderencia2T.toFixed(2)}%\n`;
      text += `• Turno 3: ${aggregatedData.aderencia3T.toFixed(2)}%\n`;
    }
    
    text += `\n📅 Gerado em: ${new Date().toLocaleString('pt-BR')}`;
    
    return text;
  };

  const shareToWhatsApp = () => {
    const text = generateShareText();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setIsOpen(false);
    toast({
      title: "Compartilhamento iniciado",
      description: "Redirecionando para o WhatsApp...",
    });
  };

  const shareToGmail = () => {
    const text = generateShareText();
    const subject = "Status Paletização - Relatório";
    const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setIsOpen(false);
    toast({
      title: "Compartilhamento iniciado",
      description: "Abrindo cliente de email...",
    });
  };

  const copyToClipboard = () => {
    const text = generateShareText();
    navigator.clipboard.writeText(text).then(() => {
      setIsOpen(false);
      toast({
        title: "Copiado!",
        description: "Texto copiado para a área de transferência.",
      });
    });
  };

  const shareToTelegram = () => {
    const text = generateShareText();
    const url = `https://t.me/share/url?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setIsOpen(false);
    toast({
      title: "Compartilhamento iniciado",
      description: "Redirecionando para o Telegram...",
    });
  };

  const handleCheckboxChange = (field: keyof ShareData) => {
    setShareData(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Share className="h-4 w-4" />
          Compartilhar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Compartilhar Dashboard</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-3">Selecione as informações para compartilhar:</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="eficiencia"
                  checked={shareData.eficiencia}
                  onCheckedChange={() => handleCheckboxChange('eficiencia')}
                />
                <label htmlFor="eficiencia" className="text-sm">Eficiência Total</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inseridos"
                  checked={shareData.inseridos}
                  onCheckedChange={() => handleCheckboxChange('inseridos')}
                />
                <label htmlFor="inseridos" className="text-sm">Total Inseridos</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rejeitos"
                  checked={shareData.rejeitos}
                  onCheckedChange={() => handleCheckboxChange('rejeitos')}
                />
                <label htmlFor="rejeitos" className="text-sm">Total Rejeitos</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="turnos"
                  checked={shareData.turnos}
                  onCheckedChange={() => handleCheckboxChange('turnos')}
                />
                <label htmlFor="turnos" className="text-sm">Dados por Turno</label>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-3">Escolha a plataforma:</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={shareToWhatsApp} variant="outline" size="sm" className="w-full">
                📱 WhatsApp
              </Button>
              <Button onClick={shareToGmail} variant="outline" size="sm" className="w-full">
                📧 Gmail
              </Button>
              <Button onClick={shareToTelegram} variant="outline" size="sm" className="w-full">
                💬 Telegram
              </Button>
              <Button onClick={copyToClipboard} variant="outline" size="sm" className="w-full">
                📋 Copiar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
