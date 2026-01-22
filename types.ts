export interface LineItem {
  description: string;
  quantity: number | string;
  price: number | string;
  amount: number;
  vatRate: number; 
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  vatRate: number;
}

export interface Customer {
  id: string;
  name: string;
  address: string;
  email?: string;
  phone?: string;
}

export type DocumentType = 'invoice' | 'quote';

export interface Invoice {
  id: string;
  type: DocumentType;
  number: string;
  date: string;
  dueDate: string;
  clientName: string;
  clientAddress: string;
  project: string; 
  status: 'draft' | 'sent' | 'paid' | 'accepted';
  items: LineItem[];
  total: number;
  discountAmount: number;
  discountVatRate: number;
}

export interface UserSettings {
  companyName: string;
  userName: string;
  kvkNumber: string;
  vatNumber: string;
  address: string;
  iban: string;
  logoUrl: string | null;
  watermarkUrl: string | null; 
  brandWatermarkUrl: string | null; 
  watermarkOpacity: number; 
  layoutStyle: 'modern' | 'classic'; 
  primaryColor: string;
  footerText?: string;
  products: Product[];
  customers?: Customer[];
  dashboardNotes: string;
  darkMode?: boolean;
  
  // License & Plan
  licenseKey?: string;
  activePlan?: 'Basic' | 'Pro' | 'Enterprise';
  planStatus?: 'active' | 'expired' | 'trial';
  planExpires?: string;

  // TOEVOEGING: Watermerk customisatie
  watermarkSize: number;
  watermarkX: number;
  watermarkY: number;
}

export interface User {
  email: string;
  name: string;
}