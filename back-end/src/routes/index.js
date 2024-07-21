import { Router } from "express";
import productRoutes from "./productRoutes.js";
import CategoryRoutes from "./categoryRoutes.js";
import authRouter from "./authRoutes.js";

const router = Router();

router.use("/products", productRoutes);
router.use("/category", CategoryRoutes);
router.use("/auth", authRouter);

export default router;
