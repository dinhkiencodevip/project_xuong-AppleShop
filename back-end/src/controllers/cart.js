import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Oders from "../models/Oders.js";
export const getCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId }).populate("products.product");
    return res.json({
      message: "Get cart successfully",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!productId || quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Invalid product ID or quantity" });
    }

    // Tìm sản phẩm
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Kiểm tra giá sản phẩm
    if (product.price === null || product.price === undefined) {
      return res.status(500).json({ message: "Product price is missing" });
    }

    // Tìm giỏ hàng của người dùng
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [], totalPrice: 0 });
    }

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex === -1) {
      // Thêm sản phẩm mới vào giỏ hàng
      cart.products.push({ product: productId, quantity });
    } else {
      // Cập nhật số lượng sản phẩm nếu đã tồn tại
      cart.products[productIndex].quantity += quantity;
    }

    // Cập nhật tổng giá
    cart.totalPrice += product.price * quantity;

    // Lưu giỏ hàng
    await cart.save();

    // Phản hồi thành công
    return res.status(200).json({
      message: "Thêm sản phẩm vào giỏ hàng thành công!",
      cart,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params.productId;

    // Tìm giỏ hàng của người dùng
    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Kiểm tra sản phẩm có trong giỏ hàng không
    const findIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    if (findIndex === -1)
      return res.status(404).json({ message: "Product not found in cart" });

    // Lấy sản phẩm cần xóa
    const product = cart.products[findIndex];

    // Cập nhật tổng giá của giỏ hàng
    cart.totalPrice -= product.quantity * product.product.price;

    // Xóa sản phẩm khỏi giỏ hàng
    cart.products.splice(findIndex, 1);

    // Lưu giỏ hàng đã cập nhật
    await cart.save();

    return res.status(200).json({
      message: "Remove product from cart successfully",
      cart,
    });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    next(error);
  }
};

export const checkOut = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId }).populate("products.product");
    if (!cart)
      return res.status(400).json({
        message: "Cart is empty",
      });
    // pttt
    const order = new Oders({
      user: userId,
      products: cart.products,
      totalPrice: cart.totalPrice,
    });
    await order.save();

    //Xoa gio hang sau khi thanh toan
    cart.products = [];
    cart.totalPrice = 0;
    await res.status(200).json({ message: "Checkout susccessfully" });
  } catch (error) {
    next(error);
  }
};
