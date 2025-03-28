import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User roles enum
export const UserRoles = {
  ADMIN: "admin",
  MANUFACTURER: "manufacturer",
  DISTRIBUTOR: "distributor",
  RETAILER: "retailer",
  CONSUMER: "consumer",
  GUEST: "guest"
} as const;

export type UserRole = typeof UserRoles[keyof typeof UserRoles];

// Permission types enum
export const PermissionTypes = {
  VIEW_PRODUCT: "view_product",
  CREATE_PRODUCT: "create_product",
  UPDATE_PRODUCT: "update_product",
  DELETE_PRODUCT: "delete_product",
  VIEW_MANUFACTURER: "view_manufacturer",
  CREATE_MANUFACTURER: "create_manufacturer",
  UPDATE_MANUFACTURER: "update_manufacturer",
  DELETE_MANUFACTURER: "delete_manufacturer",
  VIEW_PRODUCT_HISTORY: "view_product_history",
  CREATE_PRODUCT_HISTORY: "create_product_history",
  ADMIN_DASHBOARD: "admin_dashboard",
  MANUFACTURER_DASHBOARD: "manufacturer_dashboard",
  VERIFY_PRODUCT: "verify_product",
} as const;

export type PermissionType = typeof PermissionTypes[keyof typeof PermissionTypes];

// Default role permissions
export const rolePermissions: Record<UserRole, PermissionType[]> = {
  [UserRoles.ADMIN]: Object.values(PermissionTypes),
  [UserRoles.MANUFACTURER]: [
    PermissionTypes.VIEW_PRODUCT,
    PermissionTypes.CREATE_PRODUCT,
    PermissionTypes.UPDATE_PRODUCT,
    PermissionTypes.VIEW_MANUFACTURER,
    PermissionTypes.VIEW_PRODUCT_HISTORY,
    PermissionTypes.CREATE_PRODUCT_HISTORY,
    PermissionTypes.MANUFACTURER_DASHBOARD,
    PermissionTypes.VERIFY_PRODUCT,
  ],
  [UserRoles.DISTRIBUTOR]: [
    PermissionTypes.VIEW_PRODUCT,
    PermissionTypes.VIEW_MANUFACTURER,
    PermissionTypes.VIEW_PRODUCT_HISTORY,
    PermissionTypes.CREATE_PRODUCT_HISTORY,
    PermissionTypes.VERIFY_PRODUCT,
  ],
  [UserRoles.RETAILER]: [
    PermissionTypes.VIEW_PRODUCT,
    PermissionTypes.VIEW_MANUFACTURER,
    PermissionTypes.VIEW_PRODUCT_HISTORY,
    PermissionTypes.CREATE_PRODUCT_HISTORY,
    PermissionTypes.VERIFY_PRODUCT,
  ],
  [UserRoles.CONSUMER]: [
    PermissionTypes.VIEW_PRODUCT,
    PermissionTypes.VIEW_PRODUCT_HISTORY,
    PermissionTypes.VERIFY_PRODUCT,
  ],
  [UserRoles.GUEST]: [
    PermissionTypes.VIEW_PRODUCT,
    PermissionTypes.VERIFY_PRODUCT,
  ],
};

// User schema - for all user types
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  companyName: text("company_name"),
  role: text("role").default(UserRoles.GUEST).notNull(),
  permissions: jsonb("permissions").$type<PermissionType[]>(),
  walletAddress: text("wallet_address"),
  email: text("email"),
  phoneNumber: text("phone_number"),
  isVerified: boolean("is_verified").default(false).notNull(),
  profileImageUrl: text("profile_image_url"),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at"),
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
  role: true,
  permissions: true,
  walletAddress: true,
  email: true,
  phoneNumber: true,
  profileImageUrl: true,
});

// Registration schema with validation
export const userRegistrationSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  companyName: z.string().optional(),
  email: z.string().email("Please enter a valid email").optional(),
  phoneNumber: z.string().optional(),
  role: z.enum([
    UserRoles.MANUFACTURER, 
    UserRoles.DISTRIBUTOR, 
    UserRoles.RETAILER, 
    UserRoles.CONSUMER
  ]),
  walletAddress: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Login schema
export const userLoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
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
