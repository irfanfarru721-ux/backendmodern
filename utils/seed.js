import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";
import Category from "../models/Category.js";
import SubCategory from "../models/SubCategory.js";
import Vendor from "../models/Vendor.js";

const seed = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    console.log("Clearing existing data...");
    await Category.deleteMany();
    await SubCategory.deleteMany();
    await Vendor.deleteMany();

    console.log("Seeding Categories...");
    const categories = await Category.create([
      { name: "Electronics", slug: "electronics" },
      { name: "Fashion", slug: "fashion" },
      { name: "Home", slug: "home" }
    ]);

    console.log("Seeding Subcategories...");
    const subs = await SubCategory.create([
      { name: "Mobiles", category: categories[0]._id },
      { name: "Laptops", category: categories[0]._id },
      { name: "Men Clothing", category: categories[1]._id },
      { name: "Kitchen", category: categories[2]._id }
    ]);

    console.log("Seeding Vendors...");
    await Vendor.create([
      {
        name: "Tech Store",
        email: "tech@store.com",
        password: "123456",
        shopName: "Tech Store Shop",
        approved: true
      },
      {
        name: "Fashion Hub",
        email: "fashion@hub.com",
        password: "123456",
        shopName: "Fashion Hub Store",
        approved: true
      }
    ]);

    console.log("Seed Completed Successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding:", err);
    process.exit(1);
  }
};

seed();
