import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
 
} from "../controllers/order.controller.js"
import { protect } from "../middlewares/auth.middleware.js"

const router = express.Router();

// User
router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);

// Admin
// router.put("/:id/status", authMiddleware, isAdmin, updateOrderStatus);

export default router;
