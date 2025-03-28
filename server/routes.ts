import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertProductSchema, insertUserSchema, insertProductHistorySchema, userLoginSchema, userRegistrationSchema } from "@shared/schema";
import { nanoid } from "nanoid";

export async function registerRoutes(app: Express): Promise<Server> {
  // User registration route
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      // Validate registration data
      const registrationData = userRegistrationSchema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(registrationData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      // Create user object from registration data (omit confirmPassword)
      const { confirmPassword, ...userData } = registrationData;
      
      // Create user
      const newUser = await storage.createUser(userData);
      
      // Remove password from response
      const { password, ...userWithoutPassword } = newUser;
      
      res.status(201).json({
        user: userWithoutPassword,
        message: "Registration successful"
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid registration data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to register user" });
      }
    }
  });

  // User login with username and password
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const loginData = userLoginSchema.parse(req.body);
      
      // Find user by username
      const user = await storage.getUserByUsername(loginData.username);
      
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // Check if password matches
      if (user.password !== loginData.password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // Update last login time
      user.lastLogin = new Date();
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      
      // Return user data
      res.status(200).json({
        user: userWithoutPassword,
        message: "Login successful"
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid login data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Authentication failed" });
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
      
      // Update last login time
      user.lastLogin = new Date();
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      
      res.status(200).json({
        user: userWithoutPassword,
        message: "Login successful"
      });
    } catch (error) {
      res.status(500).json({ message: "Authentication failed" });
    }
  });
  
  // Get current authenticated user
  app.get("/api/auth/me", async (req: Request, res: Response) => {
    // For now, this is a mock endpoint that returns null
    // In a real app, this would check the session or JWT token
    res.status(200).json(null);
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
