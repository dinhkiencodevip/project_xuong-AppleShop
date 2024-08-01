import mongoose from "mongoose";

const CartItem = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true, min: 1 },
});

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [CartItem],
    totalPrice: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default mongoose.model("Cart", cartSchema);
