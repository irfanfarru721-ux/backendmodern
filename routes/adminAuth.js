import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin)
    return res.status(401).json({ message: "Invalid email" });

  const match = await bcrypt.compare(password, admin.password);
  if (!match)
    return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign(
    { id: admin._id, role: "admin" },
    "ADMIN_SECRET_KEY",
    { expiresIn: "7d" }
  );

  res.json({ token });
});

export default router;
