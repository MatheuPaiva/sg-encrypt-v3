import React, { useState, useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import ReportList from './ReportList';
import PDFViewer from './PDFViewer';
import FileUpload from './FileUpload';
import { decryptData } from '../../utils/crypto';
import { useNotifications } from '../../contexts/NotificationsContext';
import type { Report } from '../../types/report';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ReportViewer = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const { clearNewReportNotification } = useNotifications();

  useEffect(() => {
    const storedReports = JSON.parse(localStorage.getItem('encryptedReports') || '[]');
    setReports(storedReports);
    clearNewReportNotification();
  }, [clearNewReportNotification]);

  const handleReportSelect = (encrypted: string) => {
    try {
      const decrypted = decryptData(encrypted);
      setSelectedReport(decrypted);
    } catch (error) {
      alert('Falha ao descriptografar relatório. Por favor, tente novamente.');
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      const encryptedContent = await file.text();
      const decrypted = decryptData(encryptedContent);
      setSelectedReport(decrypted);
    } catch (error) {
      alert('Falha ao descriptografar o arquivo. Certifique-se de que é um relatório criptografado válido.');
    }
  };

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6">Visualizar Relatórios</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ReportList reports={reports} onSelectReport={handleReportSelect} />
          <FileUpload onFileUpload={handleFileUpload} />
        </div>
        <PDFViewer
          file={selectedReport}
          onLoadSuccess={handleDocumentLoadSuccess}
          numPages={numPages}
        />
      </div>
    </div>
  );
};

export default ReportViewer;