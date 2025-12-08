import express from "express";
import Category from "../models/Category.js";
import slugify from "slugify";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await Category.find());
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  const slug = slugify(name);
  const category = await Category.create({ name, slug });
  res.json(category);
});

export default router;
