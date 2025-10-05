// backend/controllers/paymentController.js
import Razorpay from "razorpay";
import crypto from "crypto";

// ✅ Create Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: "rzp_test_RPseersW0m6LbF",      // Your Razorpay Key ID (public)
  key_secret: "rtLAIgaslR7qnbbMy6EgVT4b", // Your Razorpay Key Secret (private)
});

// 🔹 Create Razorpay Order
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);

    if (!order) return res.status(500).send("Order creation failed");

    res.json({
      success: true,
      key: "rzp_test_RPseersW0m6LbF", // Send public key to frontend
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 🔹 Verify Payment
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", "rtLAIgaslR7qnbbMy6EgVT4b") // your secret key
      .update(body.toString())
      .digest("hex");

    if (razorpay_signature === expectedSignature) {
      return res.json({ success: true, message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("Verify Payment Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
