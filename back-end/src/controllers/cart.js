import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
export const getCart = async (req, res, next) => {
  try {
    const userId = res.userId;
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
    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({
        message: "Product not found",
      });
    //Neu nguoi dung chua co cart thi tao cart, neu co roi thi them vao cart

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, products: [], totalPrice: 0 });
    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );
    if (productIndex === -1) {
      // Neu san pham chua co trong cart.products thi push san pham vao cart kem theo quantity
      cart.products.push({ product: productId, quantity });
    } else {
      cart.products[existingProductIndex].quantity += quantity;
      //Neu san pham da co trong cart roi ma an mua them thi cap nhat lai quantity
    }
    cart.totalPrice += product.price * quantity;
    await cart.save();
    return res.status(200).json({
      message: "Them san pham vao gio hang thanh cong!",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

export const removeFormCart = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    const findIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );
    if (findIndex === -1)
      return res.status(404).json({ message: "Product not found in cart" });
    const product = cart.products[findIndex];
    cart.totalPrice -= product.quantity * product.product.price;
    cart.products = cart.products.filter(
      (p) => p.product.toString() !== productId
    );
    await cart.save();
    return res.status(200).json({
      message: "Remove product from cart successfully",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

export const checkOut = async (req, res, next) => {
  try {
    const userId = req.userId;
    const cart = await Cart.findOne({ userId }).populate("products.product");
    if (!cart)
      return res.status(400).json({
        message: "Cart is empty",
      });
    // pttt
    const order = new Order({
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
