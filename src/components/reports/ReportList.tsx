import React from 'react';
import { FileText } from 'lucide-react';
import type { Report } from '../../types/report';

interface ReportListProps {
  reports: Report[];
  onSelectReport: (encrypted: string) => void;
}

const ReportList: React.FC<ReportListProps> = ({ reports, onSelectReport }) => (
  <div className="border-r pr-8">
    <h3 className="text-lg font-semibold mb-4">Relatórios Disponíveis</h3>
    <div className="space-y-4">
      {reports.map((report) => (
        <div
          key={report.id}
          className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
          onClick={() => onSelectReport(report.encrypted)}
        >
          <div className="flex items-center">
            <FileText className="w-5 h-5 mr-3 text-blue-600" />
            <div>
              <h4 className="font-medium">{report.title}</h4>
              <p className="text-sm text-gray-500">{report.date}</p>
            </div>
          </div>
        </div>
      ))}
      {reports.length === 0 && (
        <p className="text-gray-500">Nenhum relatório disponível</p>
      )}
    </div>
  </div>
);

export default ReportList;