import React from 'react';
import { useReports } from '../hooks/useReports';
import StatsCard from './analytics/StatsCard';
import { FileText, Clock, TrendingUp } from 'lucide-react';

const Overview = () => {
  const { reports, totalReports, recentReports } = useReports();

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Visão Geral</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total de Relatórios"
          value={totalReports}
          icon={FileText}
          trend={`+${recentReports} esta semana`}
        />
        <StatsCard
          title="Último Relatório"
          value={reports[0]?.title || 'Nenhum relatório'}
          icon={Clock}
          trend={reports[0]?.date || '-'}
        />
        <StatsCard
          title="Crescimento Mensal"
          value={`${((recentReports / totalReports) * 100).toFixed(1)}%`}
          icon={TrendingUp}
          trend="vs mês anterior"
        />
      </div>
    </div>
  );
};

export default Overview;