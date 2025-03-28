import { 
  users, 
  products, 
  productHistory, 
  type User, 
  type InsertUser, 
  type Product, 
  type InsertProduct, 
  type ProductHistory, 
  type InsertProductHistory 
} from "@shared/schema";
import { nanoid } from "nanoid";

// Storage interface
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByWalletAddress(walletAddress: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product operations
  getProduct(id: number): Promise<Product | undefined>;
  getProductByProductId(productId: string): Promise<Product | undefined>;
  getProductsByManufacturer(manufacturerId: number): Promise<Product[]>;
  createProduct(product: InsertProduct & { manufacturerId: number }): Promise<Product>;
  
  // Product history operations
  getProductHistory(productId: number): Promise<ProductHistory[]>;
  addProductHistoryEvent(productId: number, event: InsertProductHistory): Promise<ProductHistory>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private productHistories: Map<number, ProductHistory[]>;
  private currentUserId: number;
  private currentProductId: number;
  private currentHistoryId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.productHistories = new Map();
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentHistoryId = 1;
    
    // Add sample manufacturer for testing
    this.createUser({
      username: "soundwave",
      password: "password123",
      companyName: "SoundWave Electronics",
      walletAddress: "7e2b...a9f2"
    });
    
    // Add sample product for testing
    const productData = {
      productName: "Premium Wireless Headphones",
      manufacturerId: 1,
      manufacturerName: "SoundWave Electronics",
      serialNumber: "SW-H7829B-2023",
      manufacturingDate: new Date("2023-01-15"),
      category: "Electronics",
      description: "High-quality wireless headphones with noise cancellation"
    };
    
    this.createProduct(productData as any);
    
    // Add product history events
    this.addProductHistoryEvent(1, {
      event: "manufactured",
      data: { location: "Factory 1" }
    });
    
    this.addProductHistoryEvent(1, {
      event: "shipped",
      data: { destination: "Retailer" }
    });
    
    this.addProductHistoryEvent(1, {
      event: "purchased",
      data: { buyer: "Consumer" }
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async getUserByWalletAddress(walletAddress: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.walletAddress === walletAddress
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const now = new Date();
    const user: User = { 
      id, 
      username: insertUser.username,
      password: insertUser.password,
      companyName: insertUser.companyName || null,
      role: "manufacturer", 
      walletAddress: insertUser.walletAddress || null,
      createdAt: now 
    };
    this.users.set(id, user);
    return user;
  }

  // Product operations
  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductByProductId(productId: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.productId === productId
    );
  }

  async getProductsByManufacturer(manufacturerId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.manufacturerId === manufacturerId
    );
  }

  async createProduct(product: InsertProduct & { manufacturerId: number }): Promise<Product> {
    const id = this.currentProductId++;
    const now = new Date();
    
    // Generate unique product ID (format: AC-XXXXX)
    const generatedProductId = `AC${nanoid(6).toUpperCase()}`;
    
    // Mock blockchain transaction ID
    const blockchainTxId = `0x${nanoid(16)}`;
    
    const newProduct: Product = {
      id,
      productId: generatedProductId,
      productName: product.productName,
      manufacturerId: product.manufacturerId,
      manufacturerName: product.manufacturerName,
      serialNumber: product.serialNumber || null,
      manufacturingDate: product.manufacturingDate || null,
      expiryDate: product.expiryDate || null,
      category: product.category || null,
      description: product.description || null,
      blockchainTxId,
      imageUrls: [],
      createdAt: now
    };
    
    this.products.set(id, newProduct);
    
    // Initialize empty product history array
    this.productHistories.set(id, []);
    
    return newProduct;
  }

  // Product history operations
  async getProductHistory(productId: number): Promise<ProductHistory[]> {
    return this.productHistories.get(productId) || [];
  }

  async addProductHistoryEvent(productId: number, event: InsertProductHistory): Promise<ProductHistory> {
    const id = this.currentHistoryId++;
    const now = new Date();
    
    const historyEvent: ProductHistory = {
      id,
      productId,
      event: event.event,
      timestamp: now,
      data: event.data
    };
    
    const history = this.productHistories.get(productId) || [];
    history.push(historyEvent);
    this.productHistories.set(productId, history);
    
    return historyEvent;
  }
}

// Create and export a storage instance
export const storage = new MemStorage();
