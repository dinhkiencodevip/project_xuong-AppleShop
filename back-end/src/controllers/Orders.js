import Oders from "../models/Oders.js";

// Tạo đơn hàng mới
export const createOrder = async (req, res) => {
  try {
    const { userId, products, totalPrice, voucher } = req.body;

    const newOrder = new Oders({
      userId,
      products,
      totalPrice,
      voucher,
    });

    await newOrder.save();

    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

// Lấy đơn hàng theo ID
export const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Oders.findById(orderId).populate("products.product");

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
};
