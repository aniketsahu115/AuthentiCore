import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema - for manufacturers and administrators
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  companyName: text("company_name"),
  role: text("role").default("manufacturer").notNull(), // "manufacturer" or "admin"
  walletAddress: text("wallet_address"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Product schema - for registered products
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  productId: text("product_id").notNull().unique(), // unique product identifier
  productName: text("product_name").notNull(),
  manufacturerId: integer("manufacturer_id").references(() => users.id),
  manufacturerName: text("manufacturer_name").notNull(),
  serialNumber: text("serial_number"),
  manufacturingDate: timestamp("manufacturing_date"),
  expiryDate: timestamp("expiry_date"),
  category: text("category"),
  description: text("description"),
  blockchainTxId: text("blockchain_tx_id"), // mock blockchain transaction ID
  imageUrls: jsonb("image_urls").$type<string[]>(), // array of image URLs
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Product history schema - for tracking product history
export const productHistory = pgTable("product_history", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id),
  event: text("event").notNull(), // "created", "shipped", "purchased", etc.
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  data: jsonb("data"), // additional event data
});

// Insert schemas for form validation
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  companyName: true,
  walletAddress: true,
});

export const insertProductSchema = createInsertSchema(products).pick({
  productName: true,
  manufacturerName: true,
  serialNumber: true,
  manufacturingDate: true,
  expiryDate: true,
  category: true,
  description: true,
});

export const insertProductHistorySchema = createInsertSchema(productHistory).pick({
  event: true,
  data: true,
});

// Type definitions
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type ProductHistory = typeof productHistory.$inferSelect;
export type InsertProductHistory = z.infer<typeof insertProductHistorySchema>;
