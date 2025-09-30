import { jsPDF } from 'jspdf';
import { encryptData } from './crypto';
import type { AgriculturalReport } from '../types/report';

export const generateEncryptedPDF = (data: AgriculturalReport): string => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.text('Relatório de Vistoria Agrícola', 20, 20);
  
  // Property Information
  doc.setFontSize(16);
  doc.text('1. Identificação da Propriedade', 20, 40);
  doc.setFontSize(12);
  doc.text(`Proprietário: ${data.ownerName}`, 20, 50);
  doc.text(`CPF/CNPJ: ${data.document}`, 20, 60);
  doc.text(`Propriedade: ${data.propertyName}`, 20, 70);
  doc.text(`Área Total: ${data.totalArea} hectares`, 20, 80);
  
  // Geographic Information
  doc.setFontSize(16);
  doc.text('2. Informações Geográficas', 20, 100);
  doc.setFontSize(12);
  doc.text(`Coordenadas: ${data.latitude}, ${data.longitude}`, 20, 110);
  doc.text(`Relevo: ${data.reliefType}`, 20, 120);
  doc.text(`Uso do Solo: ${data.soilUse}`, 20, 130);
  
  // Cultivation Data
  doc.setFontSize(16);
  doc.text('3. Dados do Cultivo', 20, 150);
  doc.setFontSize(12);
  doc.text(`Cultura: ${data.cropType}`, 20, 160);
  doc.text(`Estágio: ${data.developmentStage}`, 20, 170);
  doc.text(`Densidade: ${data.plantingDensity} plantas/ha`, 20, 180);
  doc.text(`Método: ${data.cultivationMethod}`, 20, 190);

  // Convert PDF to base64
  const pdfData = doc.output('datauristring');
  
  // Encrypt the PDF data
  return encryptData(pdfData);
};