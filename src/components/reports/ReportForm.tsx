import React, { useState } from 'react';
import { Save, Download } from 'lucide-react';
import PropertyIdentification from './form-sections/PropertyIdentification';
import GeographicInfo from './form-sections/GeographicInfo';
import CultivationData from './form-sections/CultivationData';
import { useNotifications } from '../../contexts/NotificationsContext';
import { generateEncryptedPDF } from '../../utils/pdf';
import type { AgriculturalReport } from '../../types/report';

const ReportForm = () => {
  const [formData, setFormData] = useState<Partial<AgriculturalReport>>({});
  const { setHasNewReport } = useNotifications();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const encrypted = generateEncryptedPDF(formData as AgriculturalReport);
      const reports = JSON.parse(localStorage.getItem('encryptedReports') || '[]');
      const newReport = {
        id: Date.now(),
        title: formData.propertyName || 'Relatório sem título',
        date: new Date().toISOString(),
        encrypted
      };
      reports.push(newReport);
      localStorage.setItem('encryptedReports', JSON.stringify(reports));
      setHasNewReport(true);
      alert('Relatório salvo com sucesso!');
    } catch (error) {
      alert('Erro ao salvar relatório. Por favor, tente novamente.');
    }
  };

  const handleDownload = () => {
    try {
      const encrypted = generateEncryptedPDF(formData as AgriculturalReport);
      const blob = new Blob([encrypted], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `relatorio-${formData.propertyName?.toLowerCase().replace(/\s+/g, '-') || 'sem-titulo'}.pdf.enc`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      alert('Erro ao gerar PDF. Por favor, tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6">Novo Relatório de Vistoria</h2>
      
      <PropertyIdentification formData={formData} onChange={handleChange} />
      <GeographicInfo formData={formData} onChange={handleChange} />
      <CultivationData formData={formData} onChange={handleChange} />

      <div className="mt-8 flex gap-4">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Save className="w-4 h-4 mr-2" />
          Salvar Relatório
        </button>
        
        <button
          type="button"
          onClick={handleDownload}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF Criptografado
        </button>
      </div>
    </form>
  );
};

export default ReportForm;