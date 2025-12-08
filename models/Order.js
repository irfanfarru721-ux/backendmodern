import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        qty: { type: Number, default: 1 }
      }
    ],
    totalAmount: { type: Number, required: true }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
