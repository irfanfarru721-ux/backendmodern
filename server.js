import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/error.js";

// ROUTES — MUST BE ES MODULES & EXPORT DEFAULT
import authRoutes from "./routes/auth.js";
import vendorRoutes from "./routes/vendors.js";
import productRoutes from "./routes/products.js";
import categoryRoutes from "./routes/categories.js";
import adminRoutes from "./routes/admin.js";
import userRoutes from "./routes/users.js";
import subcategoryRoutes from "./routes/subcategoryRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

// ERROR HANDLER
app.use(errorHandler);

// START SERVER
const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch((err) => {
    console.error("DB Connection Error:", err);
    process.exit(1);
  });
