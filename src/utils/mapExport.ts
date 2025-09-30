import { jsPDF } from 'jspdf';
import { LatLng } from 'leaflet';
import html2canvas from 'html2canvas';

export const exportMapToPDF = async (
  mapElement: HTMLElement,
  points: LatLng[],
  perimeter: number
) => {
  try {
    // Create PDF document
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Add title
    pdf.setFontSize(16);
    pdf.text('Relatório de Medição de Área', pageWidth / 2, 15, { align: 'center' });

    // Capture map as image
    const canvas = await html2canvas(mapElement, {
      useCORS: true,
      allowTaint: true,
      scrollY: -window.scrollY
    });
    const mapImage = canvas.toDataURL('image/jpeg', 1.0);

    // Add map image
    const imgWidth = pageWidth - 40;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(mapImage, 'JPEG', 20, 25, imgWidth, imgHeight);

    // Add measurement details
    let yPosition = imgHeight + 40;
    
    pdf.setFontSize(14);
    pdf.text('Detalhes da Medição', 20, yPosition);
    
    yPosition += 10;
    pdf.setFontSize(12);
    pdf.text(`Perímetro Total: ${perimeter.toFixed(2)} km`, 20, yPosition);

    // Add points table
    yPosition += 10;
    pdf.text('Pontos Marcados:', 20, yPosition);
    
    yPosition += 8;
    points.forEach((point, index) => {
      pdf.text(
        `Ponto ${index + 1}: Lat ${point.lat.toFixed(6)}°, Lng ${point.lng.toFixed(6)}°`,
        25,
        yPosition
      );
      yPosition += 7;
    });

    // Add footer
    const date = new Date().toLocaleDateString('pt-BR');
    pdf.setFontSize(10);
    pdf.text(`Gerado em: ${date}`, 20, pageHeight - 10);

    // Save PDF
    pdf.save('medicao-area.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Falha ao gerar PDF. Por favor, tente novamente.');
  }
};