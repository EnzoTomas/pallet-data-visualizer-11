
import { useMemo } from 'react';

interface PeriodDescriptionProps {
  selectedPeriod: string;
  startDate: string;
  endDate: string;
}

export const PeriodDescription = ({ selectedPeriod, startDate, endDate }: PeriodDescriptionProps) => {
  const description = useMemo(() => {
    const yesterday = new Date('2025-06-08'); // Data corrigida para 08/06/2025 (ontem)
    
    switch(selectedPeriod) {
      case 'ontem':
        return 'Dados de 08/06/2025';
      case 'semana':
        const weekAgo = new Date(yesterday);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return `Últimos 7 dias (${weekAgo.toLocaleDateString('pt-BR')} - ${yesterday.toLocaleDateString('pt-BR')})`;
      case 'mensal':
        const monthStart = new Date(yesterday.getFullYear(), yesterday.getMonth(), 1);
        return `Mês atual (${monthStart.toLocaleDateString('pt-BR')} - ${yesterday.toLocaleDateString('pt-BR')})`;
      case 'anual':
        const yearStart = new Date(yesterday.getFullYear(), 0, 1);
        return `Ano atual (${yearStart.toLocaleDateString('pt-BR')} - ${yesterday.toLocaleDateString('pt-BR')})`;
      case 'personalizado':
        const start = new Date(startDate);
        const end = new Date(endDate);
        return `Período personalizado (${start.toLocaleDateString('pt-BR')} - ${end.toLocaleDateString('pt-BR')})`;
      default:
        return '';
    }
  }, [selectedPeriod, startDate, endDate]);

  if (!description) return null;

  return (
    <div className="text-sm text-muted-foreground bg-primary/10 px-3 py-2 rounded-lg border border-primary/20 animate-fade-in">
      <span className="font-medium text-primary">📅 </span>
      {description}
    </div>
  );
};
