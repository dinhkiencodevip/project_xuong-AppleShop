import { Router } from "express";
import { createOrder, getOrderById, getOrders } from "../controllers/Orders.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const OrderRouter = Router();
OrderRouter.get("/", getOrders);
OrderRouter.post("/", createOrder);
OrderRouter.get("/:id", checkAuth, getOrderById);
export default OrderRouter;
