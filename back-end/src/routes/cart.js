import { Router } from "express";
import {
  addToCart,
  checkOut,
  getCart,
  removeFormCart,
} from "../controllers/cart.js";

const cartRouter = Router();

cartRouter.post("/", addToCart);
cartRouter.get("/", getCart);
cartRouter.post("/checkout", checkOut);
cartRouter.delete("/remove-cart/:productId", removeFormCart);

export default cartRouter;
