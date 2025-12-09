import jwt from "jsonwebtoken";

export default function adminAuth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, "ADMIN_SECRET_KEY");
    if (decoded.role !== "admin")
      return res.status(403).json({ message: "Not admin" });

    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
