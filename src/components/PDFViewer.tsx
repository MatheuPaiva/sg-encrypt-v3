import React from 'react';
import { Document, Page } from 'react-pdf';

interface PDFViewerProps {
  file: string | null;
  onLoadSuccess: (data: { numPages: number }) => void;
  numPages: number | null;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ file, onLoadSuccess, numPages }) => (
  <div>
    <h3 className="text-lg font-semibold mb-4">Report Preview</h3>
    {file ? (
      <div className="border rounded-lg p-4">
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
              width={500}
              className="mb-4"
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          ))}
        </Document>
      </div>
    ) : (
      <div className="text-center text-gray-500 p-8 border rounded-lg">
        Select a report to view
      </div>
    )}
  </div>
);