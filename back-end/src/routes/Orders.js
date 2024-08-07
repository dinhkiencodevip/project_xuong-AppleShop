import { Router } from "express";
import { createOrder, getOrderById } from "../controllers/Orders.js";

const OrderRouter = Router();
OrderRouter.post("/", createOrder);
OrderRouter.get("/:id", getOrderById);
export default OrderRouter;
