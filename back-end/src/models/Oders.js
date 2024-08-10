import mongoose, { Schema } from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    voucher: { type: String, enum: ["sale15", "sale20"], default: null },
    status: {
      type: String,
      enum: ["Chờ xác nhận", "Đang vận chuyển", "Hoàn thành", "Hủy"],
      default: "Chờ xác nhận",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Order", orderSchema);
