export interface AgriculturalReport {
  id?: number;
  ownerName: string;
  document: string;
  propertyName: string;
  totalArea: number;
  address: string;
  latitude: string;
  longitude: string;
  reliefType: string;
  soilUse: string;
  cropType: string;
  developmentStage: string;
  plantingDensity: number;
  cultivationMethod: string;
  createdAt?: string;
  encrypted?: string;
}

export interface SavedReport {
  id: number;
  title: string;
  date: string;
  encrypted: string;
}