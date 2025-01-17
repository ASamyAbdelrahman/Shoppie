/**
 * The main entry point for the server.
 *
 * This file sets up the Express.js server, configures the routes, and starts the server.
 *
 * @requires cookie-parser
 * @requires dotenv
 * @requires express
 * @requires cors
 * @requires path
 * @requires ./routes/analytics.route.js
 * @requires ./routes/auth.route.js
 * @requires ./routes/cart.route.js
 * @requires ./routes/coupon.route.js
 * @requires ./routes/payment.route.js
 * @requires ./routes/product.route.js
 * @requires ./lib/db.js
 */

import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import express from "express";
import path from "path";
import cors from 'cors';

import analyticsRoutes from "./routes/analytics.route.js";
import authRoutes from "./routes/auth.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import productRoutes from "./routes/product.route.js";
import { connectDB } from './lib/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

/**
 * Set up the Express.js server.
 */
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*" }));

/**
 * Set up the routes for the server.
 */
app.use("/api/analytics", analyticsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/products", productRoutes);

/**
 * Set up the static files for the frontend.
 */
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  /**
   * Catch-all route to serve the frontend.
   */
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

/**
 * Connect to the database and start the server.
 */
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port http://localhost:" + PORT);
  });
}).catch((err) => {
  console.error("Failed to connect to the database:", err.message);
  process.exit(1);
});

