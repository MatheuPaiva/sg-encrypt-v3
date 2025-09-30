import React, { useState, useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import { ReportList } from './ReportList';
import { PDFViewer } from './PDFViewer';
import { FileUpload } from './FileUpload';
import { decryptData } from '../utils/crypto';
import type { Report } from '../types/report';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ReportViewer = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);

  useEffect(() => {
    const storedReports = JSON.parse(localStorage.getItem('encryptedReports') || '[]');
    setReports(storedReports);
  }, []);

  const handleReportSelect = (encrypted: string) => {
    try {
      const decrypted = decryptData(encrypted);
      setSelectedReport(decrypted);
    } catch (error) {
      alert('Failed to decrypt report. Please try again.');
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      const encryptedContent = await file.text();
      const decrypted = decryptData(encryptedContent);
      setSelectedReport(decrypted);
    } catch (error) {
      alert('Failed to decrypt the uploaded file. Make sure it\'s a valid encrypted report.');
    }
  };

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6">View Reports</h2>
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