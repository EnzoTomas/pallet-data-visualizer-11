
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
  analiseRejeitos: boolean;
  responsaveisRejeitos: boolean;
  analisePerformance: boolean;
  volumeProducao: boolean;
}

type ShareType = 'dados' | 'imagens' | 'ambos';

export const ShareButton = ({ aggregatedData }: ShareButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shareType, setShareType] = useState<ShareType>('dados');
  const [shareData, setShareData] = useState<ShareData>({
    eficiencia: true,
    inseridos: true,
    rejeitos: false,
    turnos: false,
    analiseRejeitos: false,
    responsaveisRejeitos: false,
    analisePerformance: false,
    volumeProducao: false
  });
  const { toast } = useToast();

  const selectAll = () => {
    setShareData({
      eficiencia: true,
      inseridos: true,
      rejeitos: true,
      turnos: true,
      analiseRejeitos: true,
      responsaveisRejeitos: true,
      analisePerformance: true,
      volumeProducao: true
    });
  };

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
      text += `• Turno 1 - Inseridos: ${aggregatedData.inseridos1T}, Rejeitos: ${aggregatedData.rejeitos1T}, Eficiência: ${aggregatedData.aderencia1T.toFixed(2)}%\n`;
      text += `• Turno 2 - Inseridos: ${aggregatedData.inseridos2T}, Rejeitos: ${aggregatedData.rejeitos2T}, Eficiência: ${aggregatedData.aderencia2T.toFixed(2)}%\n`;
      text += `• Turno 3 - Inseridos: ${aggregatedData.inseridos3T}, Rejeitos: ${aggregatedData.rejeitos3T}, Eficiência: ${aggregatedData.aderencia3T.toFixed(2)}%\n`;
    }

    if (shareData.analiseRejeitos) {
      text += `\n📊 *Análise de Rejeitos:* Dados detalhados disponíveis no dashboard\n`;
    }

    if (shareData.responsaveisRejeitos) {
      text += `👥 *Responsáveis pelos Rejeitos:* Equipe de supervisão\n`;
    }

    if (shareData.analisePerformance) {
      text += `📈 *Análise de Performance:* Tendência e comparativo com metas\n`;
    }

    if (shareData.volumeProducao) {
      text += `📦 *Volume de Produção:* ${aggregatedData.totalInseridos + aggregatedData.totalRejeitos} unidades processadas\n`;
    }
    
    text += `\n📅 Gerado em: ${new Date().toLocaleString('pt-BR')}`;
    
    return text;
  };

  const generateImageShareText = () => {
    return `📊 *Dashboard Paletização*\n\n🖼️ Imagens dos dados em anexo\n\n📅 ${new Date().toLocaleString('pt-BR')}`;
  };

  const generateBothShareText = () => {
    return `${generateShareText()}\n\n🖼️ *Gráficos e visualizações em anexo*`;
  };

  const getShareContent = () => {
    switch (shareType) {
      case 'dados':
        return generateShareText();
      case 'imagens':
        return generateImageShareText();
      case 'ambos':
        return generateBothShareText();
      default:
        return generateShareText();
    }
  };

  const shareToWhatsApp = () => {
    const text = getShareContent();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setIsOpen(false);
    toast({
      title: "Compartilhamento iniciado",
      description: "Redirecionando para o WhatsApp...",
    });
  };

  const shareToGmail = () => {
    const text = getShareContent();
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
    const text = getShareContent();
    navigator.clipboard.writeText(text).then(() => {
      setIsOpen(false);
      toast({
        title: "Copiado!",
        description: "Texto copiado para a área de transferência.",
      });
    });
  };

  const shareToTelegram = () => {
    const text = getShareContent();
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
        <Button variant="outline" size="sm" className="flex items-center gap-1 px-2 text-xs">
          <Share className="h-3 w-3" />
          <span className="hidden sm:inline">Compartilhar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Compartilhar Dashboard</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Tipo de compartilhamento */}
          <div>
            <h4 className="text-sm font-medium mb-3">Tipo de compartilhamento:</h4>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="dados"
                  name="shareType"
                  checked={shareType === 'dados'}
                  onChange={() => setShareType('dados')}
                />
                <label htmlFor="dados" className="text-sm">📝 Compartilhar dados</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="imagens"
                  name="shareType"
                  checked={shareType === 'imagens'}
                  onChange={() => setShareType('imagens')}
                />
                <label htmlFor="imagens" className="text-sm">🖼️ Compartilhar imagens</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="ambos"
                  name="shareType"
                  checked={shareType === 'ambos'}
                  onChange={() => setShareType('ambos')}
                />
                <label htmlFor="ambos" className="text-sm">🔄 Compartilhar ambos</label>
              </div>
            </div>
          </div>

          {shareType !== 'imagens' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium">Selecione as informações:</h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={selectAll}
                  className="text-xs h-6 px-2"
                >
                  Selecionar todos
                </Button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
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

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="analiseRejeitos"
                    checked={shareData.analiseRejeitos}
                    onCheckedChange={() => handleCheckboxChange('analiseRejeitos')}
                  />
                  <label htmlFor="analiseRejeitos" className="text-sm">Análise de Rejeitos</label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="responsaveisRejeitos"
                    checked={shareData.responsaveisRejeitos}
                    onCheckedChange={() => handleCheckboxChange('responsaveisRejeitos')}
                  />
                  <label htmlFor="responsaveisRejeitos" className="text-sm">Responsáveis pelos Rejeitos</label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="analisePerformance"
                    checked={shareData.analisePerformance}
                    onCheckedChange={() => handleCheckboxChange('analisePerformance')}
                  />
                  <label htmlFor="analisePerformance" className="text-sm">Análise de Performance</label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="volumeProducao"
                    checked={shareData.volumeProducao}
                    onCheckedChange={() => handleCheckboxChange('volumeProducao')}
                  />
                  <label htmlFor="volumeProducao" className="text-sm">Volume de Produção</label>
                </div>
              </div>
            </div>
          )}

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
        </div>
      </DialogContent>
    </Dialog>
  );
};
