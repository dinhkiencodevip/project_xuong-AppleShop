import { Router } from "express";
import { createOrder, getOrderById, getOrders } from "../controllers/Orders.js";

const OrderRouter = Router();
OrderRouter.get("/", getOrders);
OrderRouter.post("/", createOrder);
OrderRouter.get("/:id", getOrderById);
export default OrderRouter;
