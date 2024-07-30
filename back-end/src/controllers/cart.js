import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
export const getCart = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    //Neu nguoi dung chua co cart thi tao cart, neu co roi thi them vao cart

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, products: [], totalPrice: 0 });
    const productIndex = cart.products.findIndex(
      (item) => item.product === productId
    );
    if (productIndex === -1) {
      // Neu san pham chua co trong cart.products thi push san pham vao cart kem theo quantity
      cart.products.push({ product: productId, quantity });
    } else {
      //Neu san pham da co trong cart roi ma an mua them thi cap nhat lai quantity
      cart.totalPrice += product.price * quantity;
      await cart.save();
      return res.status(200).json({
        message: "Them san pham vao gio hang thanh cong!",
        cart,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const removeFormCart = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const checkOut = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
