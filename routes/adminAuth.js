import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// Default admin credentials
const ADMIN = {
  email: "admin@example.com",
  password: "admin123"
};

// Admin Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email !== ADMIN.email || password !== ADMIN.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });

  res.json({ token });
});

export default router;
