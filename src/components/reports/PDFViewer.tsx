import React from 'react';
import { Document, Page } from 'react-pdf';

interface PDFViewerProps {
  file: string | null;
  onLoadSuccess: (data: { numPages: number }) => void;
  numPages: number | null;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ file, onLoadSuccess, numPages }) => (
  <div className="w-full">
    <h3 className="text-lg font-semibold mb-4">Visualização do Relatório</h3>
    {file ? (
      <div className="border rounded-lg overflow-hidden">
        <div className="max-h-[calc(100vh-12rem)] overflow-y-auto p-4">
          <Document
            file={file}
            onLoadSuccess={onLoadSuccess}
            className="pdf-document"
            renderMode="canvas"
          >
            {Array.from(new Array(numPages || 0), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={Math.min(500, window.innerWidth - 64)}
                className="mb-4 mx-auto"
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            ))}
          </Document>
        </div>
      </div>
    ) : (
      <div className="text-center text-gray-500 p-8 border rounded-lg">
        Selecione um relatório para visualizar
      </div>
    )}
  </div>
);

export default PDFViewer;