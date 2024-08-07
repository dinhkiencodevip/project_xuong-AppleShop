import mongoose, { Schema } from "mongoose";

const orderItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    voucher: { type: String, enum: ["sale15", "sale20"], default: null },
    status: {
      type: String,
      enum: ["pending", "shipping", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
