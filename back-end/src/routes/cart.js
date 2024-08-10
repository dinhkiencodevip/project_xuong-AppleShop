import { Router } from "express";
import {
  addToCart,
  checkOut,
  getCart,
  removeFromCart,
} from "../controllers/cart.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const cartRouter = Router();

cartRouter.post("/", addToCart);
cartRouter.get("/", getCart);
cartRouter.post("/checkout", checkAuth, checkOut);
cartRouter.delete("/remove-cart/:productId", removeFromCart);

export default cartRouter;
