import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    image: { type: String, required: false },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: false },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory", required: false },
    stock: { type: Number, default: 0 },
    attributes: { type: Object } // flexible (e.g., size, weight)
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
