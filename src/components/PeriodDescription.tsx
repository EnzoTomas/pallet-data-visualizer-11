
import { useMemo } from 'react';

interface PeriodDescriptionProps {
  selectedPeriod: string;
  startDate: string;
  endDate: string;
}

export const PeriodDescription = ({ selectedPeriod, startDate, endDate }: PeriodDescriptionProps) => {
  const description = useMemo(() => {
    const today = new Date('2025-06-08'); // Data base corrigida para 08/06/2025
    
    switch(selectedPeriod) {
      case 'ontem':
        return 'Dados de 08/06/2025';
      case 'semana':
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return `Últimos 7 dias (${weekAgo.toLocaleDateString('pt-BR')} - ${today.toLocaleDateString('pt-BR')})`;
      case 'mensal':
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        return `Mês atual (${monthStart.toLocaleDateString('pt-BR')} - ${today.toLocaleDateString('pt-BR')})`;
      case 'anual':
        const yearStart = new Date(today.getFullYear(), 0, 1);
        return `Ano atual (${yearStart.toLocaleDateString('pt-BR')} - ${today.toLocaleDateString('pt-BR')})`;
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
