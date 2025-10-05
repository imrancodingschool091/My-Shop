import express from "express";
import { addToCart, deleteCartItem, getCart, updateCartQuantity } from "../controllers/cart.controller.js"
import { protect } from "../middlewares/auth.middleware.js"

const router = express.Router();

router.post("/", protect, addToCart); // add/update
router.get("/", protect, getCart); // get cart
router.delete("/:productId", protect, deleteCartItem); // remove item
router.patch("/", protect, updateCartQuantity); // increment/decrement

export default router;
