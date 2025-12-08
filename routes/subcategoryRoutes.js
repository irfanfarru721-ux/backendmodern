import express from "express";
import SubCategory from "../models/SubCategory.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const subs = await SubCategory.find().populate("category");
  res.json(subs);
});

router.post("/", async (req, res) => {
  const sub = await SubCategory.create(req.body);
  res.json(sub);
});

export default router;
