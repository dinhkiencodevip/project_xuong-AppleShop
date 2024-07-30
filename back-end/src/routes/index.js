import { Router } from "express";
import productRoutes from "./productRoutes.js";
import CategoryRoutes from "./categoryRoutes.js";
import authRouter from "./authRoutes.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import cartRouter from "./cart.js";

const router = Router();

router.use("/products", productRoutes);
router.use("/category", CategoryRoutes);
router.use("/auth", authRouter);
router.use("/cart", checkAuth, cartRouter);
export default router;
