import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
} from "../controllers/Orders.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const OrderRouter = Router();
OrderRouter.get("/", checkAuth, getOrders);
OrderRouter.post("/", createOrder);
OrderRouter.get("/:id", getOrderById);
OrderRouter.delete("/:id", deleteOrder);
export default OrderRouter;
