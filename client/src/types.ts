// Product types
export interface Product {
  id: number;
  productId: string;
  productName: string;
  manufacturerId: number;
  manufacturerName: string;
  serialNumber?: string;
  manufacturingDate?: Date;
  expiryDate?: Date;
  category?: string;
  description?: string;
  blockchainTxId: string;
  imageUrls?: string[];
  createdAt: Date;
}

export interface ProductHistory {
  id: number;
  productId: number;
  event: string;
  timestamp: Date;
  data?: any;
}

export interface ProductVerification {
  isAuthentic: boolean;
  message?: string;
  product?: Product;
  history?: ProductHistory[];
  blockchainVerification?: {
    transactionId: string;
    network: string;
    timestamp: Date;
  };
}

// Wallet types
export interface Wallet {
  connected: boolean;
  address?: string;
  publicKey?: string;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  signMessage?: (message: string) => Promise<string>;
}

// Registration form types
export interface ProductRegistrationFormData {
  productName: string;
  manufacturerName: string;
  serialNumber?: string;
  manufacturingDate?: Date;
  expiryDate?: Date;
  category?: string;
  description?: string;
}

// User types
export interface User {
  id: number;
  username: string;
  companyName?: string;
  role: string;
  walletAddress?: string;
  createdAt: Date;
}
