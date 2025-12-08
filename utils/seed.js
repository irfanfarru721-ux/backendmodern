import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

import connectDB from "../config/db.js";
import User from "../models/User.js";
import Vendor from "../models/Vendor.js";
import Category from "../models/Category.js";
import SubCategory from "../models/SubCategory.js";
import Product from "../models/Product.js";

const seed = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected");

    // wipe
    await User.deleteMany();
    await Vendor.deleteMany();
    await Category.deleteMany();
    await SubCategory.deleteMany();
    await Product.deleteMany();

    // create a system owner
    const owner = await User.create({
      name: "System Owner",
      email: "owner@example.com",
      password: "123456",
      role: "vendor"
    });

    // Vendors: Restaurant, Grocery, Fruit Shop
    const vendors = await Vendor.insertMany([
      { name: "Spice Garden (Restaurant)", type: "restaurant", owner: owner._id, address: "MG Road" },
      { name: "DailyMart Grocery", type: "grocery", owner: owner._id, address: "Market Street" },
      { name: "FruitCart", type: "fruits", owner: owner._id, address: "Fruit Lane" }
    ]);

    // Categories per vendor
    const categories = [];

    // Restaurant categories
    const restCats = await Category.insertMany([
      { name: "Starters", vendor: vendors[0]._id },
      { name: "Main Course", vendor: vendors[0]._id },
      { name: "Desserts", vendor: vendors[0]._id }
    ]);
    categories.push(...restCats);

    // Grocery categories
    const groceryCats = await Category.insertMany([
      { name: "Staples", vendor: vendors[1]._id },
      { name: "Oils", vendor: vendors[1]._id },
      { name: "Snacks", vendor: vendors[1]._id }
    ]);
    categories.push(...groceryCats);

    // Fruits categories
    const fruitCats = await Category.insertMany([
      { name: "Tropical", vendor: vendors[2]._id },
      { name: "Berries", vendor: vendors[2]._id }
    ]);
    categories.push(...fruitCats);

    // Subcategories (examples)
    const subs = await SubCategory.insertMany([
      { name: "Veg Starters", category: restCats[0]._id, vendor: vendors[0]._id },
      { name: "Non-Veg Starters", category: restCats[0]._id, vendor: vendors[0]._id },
      { name: "Basmati Rice", category: groceryCats[0]._id, vendor: vendors[1]._id },
      { name: "Potato Chips", category: groceryCats[2]._id, vendor: vendors[1]._id },
      { name: "Mangoes", category: fruitCats[0]._id, vendor: vendors[2]._id }
    ]);

    // Products: restaurant
    await Product.insertMany([
      {
        name: "Paneer Tikka",
        description: "Grilled paneer cubes",
        price: 220,
        vendor: vendors[0]._id,
        category: restCats[0]._id,
        subcategory: subs[0]._id,
        image: "https://via.placeholder.com/300x200?text=Paneer+Tikka",
        stock: 10
      },
      {
        name: "Chicken Biryani",
        description: "Aromatic biryani",
        price: 350,
        vendor: vendors[0]._id,
        category: restCats[1]._id,
        image: "https://via.placeholder.com/300x200?text=Chicken+Biryani",
        stock: 8
      }
    ]);

    // Products: grocery
    await Product.insertMany([
      {
        name: "Tata Rice (5kg)",
        description: "Premium basmati",
        price: 420,
        vendor: vendors[1]._id,
        category: groceryCats[0]._id,
        subcategory: subs[2]._id,
        image: "https://via.placeholder.com/300x200?text=Rice+5kg",
        stock: 50
      },
      {
        name: "Lays Classic 150g",
        description: "Potato chips",
        price: 40,
        vendor: vendors[1]._id,
        category: groceryCats[2]._id,
        subcategory: subs[3]._id,
        image: "https://via.placeholder.com/300x200?text=Chips",
        stock: 120
      }
    ]);

    // Products: fruits
    await Product.insertMany([
      {
        name: "Alphonso Mango (1kg)",
        description: "Sweet mangoes",
        price: 180,
        vendor: vendors[2]._id,
        category: fruitCats[0]._id,
        subcategory: subs[4]._id,
        image: "https://via.placeholder.com/300x200?text=Mangoes",
        stock: 30
      }
    ]);

    console.log("Seed complete");
    process.exit(0);
  } catch (err) {
    console.error("Seed error", err);
    process.exit(1);
  }
};

seed();
