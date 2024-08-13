import Oders from "../models/Oders.js";

// Tạo đơn hàng mới
export const createOrder = async (req, res) => {
  try {
    const { userId, products, totalPrice, voucher } = req.body;

    if (!userId || !products || !totalPrice) {
      return res.status(400).json({ message: "Thiếu các trường bắt buộc" });
    }
    const newOrder = new Oders({
      userId,
      products,
      totalPrice,
      voucher,
    });

    await newOrder.save();

    res
      .status(201)
      .json({ message: "Đơn hàng đã được tạo thành công", order: newOrder });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi tạo đơn hàng", error: error.message });
  }
};

// Lấy đơn hàng theo ID
export const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Oders.findById(orderId).populate(
      "products.product",
      "title price"
    );

    if (!order)
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });

    res.status(200).json({ order });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy đơn hàng", error: error.message });
  }
};

//Lấy tất cả các đơn hàng
export const getOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Oders.find({ userId }).populate("products.product");

    //kiểm tra nếu không có đơn hàng
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng nào" });
    }
    res.status(200).json({ orders });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy đơn hàngg", error: error.message });
  }
};
//Xóa đơn hàng theo Id
export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Tìm và xóa đơn hàng
    const deleteOrder = await Oders.findByIdAndDelete(orderId);

    if (!deleteOrder) {
      return res
        .status(400)
        .json({ message: "Không tìm thấy đơn hàng để xóa" });
    }
    res.status(200).json({
      message: "Đơn hàng đã được xóa thành công",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi xóa đơn hàng", error: error.message });
  }
};

//Cập nhật trạng thái đơn hàng theo ID
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    //Kiểm tra trạng thái
    const validStatuses = [
      "Chờ xác nhận",
      "Đang vận chuyển",
      "Hoàn thành",
      "Hủy",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Trạng thái không hợp lệ" });
    }

    //Tìm và cập nhật trạng thái đơn hàng
    const updatedOrder = await Oders.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("products.product", "title price");

    if (!updatedOrder) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng nào" });
    }

    res.status(200).json({
      message: "Trạng thái đơn hàng đã được cập nhật",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật trạng thái đơn hàng",
      error: error.message,
    });
  }
};
