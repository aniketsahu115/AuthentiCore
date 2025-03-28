import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertProductSchema, insertUserSchema, insertProductHistorySchema } from "@shared/schema";
import { nanoid } from "nanoid";

export async function registerRoutes(app: Express): Promise<Server> {
  // User registration route
  app.post("/api/users", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      // Create user
      const newUser = await storage.createUser(userData);
      
      // Remove password from response
      const { password, ...userWithoutPassword } = newUser;
      
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid user data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create user" });
      }
    }
  });

  // User login by wallet address
  app.post("/api/auth/wallet", async (req: Request, res: Response) => {
    try {
      const { walletAddress } = req.body;
      
      if (!walletAddress) {
        return res.status(400).json({ message: "Wallet address is required" });
      }
      
      // Find user by wallet address
      const user = await storage.getUserByWalletAddress(walletAddress);
      
      if (!user) {
        return res.status(404).json({ message: "User not found with this wallet address" });
      }
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Authentication failed" });
    }
  });

  // Product registration route
  app.post("/api/products", async (req: Request, res: Response) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      
      // Get manufacturer ID from request body or mock it for now
      const manufacturerId = req.body.manufacturerId || 1;
      
      // Create product without adding productId in request
      const newProduct = await storage.createProduct({
        ...productData,
        manufacturerId
      });
      
      // Add initial history event
      await storage.addProductHistoryEvent(newProduct.id, {
        event: "created",
        data: { manufacturerId }
      });
      
      res.status(201).json(newProduct);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid product data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create product" });
      }
    }
  });

  // Get product by ID
  app.get("/api/products/:productId", async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      
      // Find product
      const product = await storage.getProductByProductId(productId);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Get product history
  app.get("/api/products/:id/history", async (req: Request, res: Response) => {
    try {
      const productId = parseInt(req.params.id);
      
      if (isNaN(productId)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      
      // Check if product exists
      const product = await storage.getProduct(productId);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      // Get product history
      const history = await storage.getProductHistory(productId);
      
      res.status(200).json(history);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product history" });
    }
  });

  // Add product history event
  app.post("/api/products/:id/history", async (req: Request, res: Response) => {
    try {
      const productId = parseInt(req.params.id);
      const eventData = insertProductHistorySchema.parse(req.body);
      
      if (isNaN(productId)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      
      // Check if product exists
      const product = await storage.getProduct(productId);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      // Add history event
      const historyEvent = await storage.addProductHistoryEvent(productId, eventData);
      
      res.status(201).json(historyEvent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid event data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to add history event" });
      }
    }
  });

  // Verify product authenticity
  app.get("/api/verify/:productId", async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      
      // Find product
      const product = await storage.getProductByProductId(productId);
      
      if (!product) {
        return res.status(200).json({ 
          isAuthentic: false,
          message: "Product not found in the blockchain registry."
        });
      }
      
      // Get product history
      const history = await storage.getProductHistory(product.id);
      
      // Return verification result
      res.status(200).json({
        isAuthentic: true,
        product,
        history,
        blockchainVerification: {
          transactionId: product.blockchainTxId,
          network: "Solana",
          timestamp: product.createdAt
        }
      });
    } catch (error) {
      res.status(500).json({ 
        isAuthentic: false,
        message: "Verification failed. Please try again." 
      });
    }
  });

  // Get products by manufacturer
  app.get("/api/manufacturers/:id/products", async (req: Request, res: Response) => {
    try {
      const manufacturerId = parseInt(req.params.id);
      
      if (isNaN(manufacturerId)) {
        return res.status(400).json({ message: "Invalid manufacturer ID" });
      }
      
      // Get products
      const products = await storage.getProductsByManufacturer(manufacturerId);
      
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
