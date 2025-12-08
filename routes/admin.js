import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET all users (admin view)
router.get("/users", async (req, res) => {
  res.json(await User.find());
});

// Set admin role
router.post("/make-admin/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { role: "admin" });
  res.json({ message: "User promoted to admin" });
});

export default router;
