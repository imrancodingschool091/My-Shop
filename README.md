MERN E-Commerce Platform

A full-stack MERN (MongoDB, Express.js, React, Node.js) e-commerce application with secure authentication, order management, and payment integration.

📌 Project Overview

This project is a production-ready e-commerce platform built with the MERN stack. It features user authentication, email verification, shopping cart, checkout with Razorpay, and full order management.

🚀 Features
🛒 E-Commerce

Browse products with details and prices.

Add products to the cart.

Update cart quantity or remove items.

Checkout with Razorpay payment integration.

✅ User Authentication

User Registration with email and password.

Email Verification (no OTP used).

Login using JWT-based authentication.

Forgot Password: Users can reset their password via a secure email link.

Reset Password: Secure password reset using a token.

🔐 Security

Passwords hashed using bcrypt.

JWT tokens for protected routes.

Payment verification with Razorpay to ensure successful transactions.

⚡ Additional Features

Order history for logged-in users.

Order status tracking (pending, processing, shipped, delivered, cancelled).

Fully responsive frontend built with React and Tailwind CSS.

🛠️ Technologies Used

Frontend: React, Redux Toolkit, Axios, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB, Mongoose

Authentication: JWT, bcrypt

Payment: Razorpay

Email Service: Nodemailer (for account verification and password reset)

🔧 Installation & Setup
Prerequisites

Node.js (v14+)

MongoDB (Atlas or local)

Email service (e.g., Gmail, SendGrid) for verification and password reset

Backend Setup

Clone the repository:

git clone https://github.com/your-username/mern-ecommerce.git
cd mern-ecommerce/server


Install dependencies:

npm install


Create a .env file in the server folder:

PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
FRONTEND_URL=http://localhost:3000
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-secret


Start the backend server:

npm run dev

Frontend Setup

Navigate to the frontend:

cd ../client


Install dependencies:

npm install


Start the frontend:

npm start


The app will run at http://localhost:3000.

🧪 Usage

Register a new account.

Check your email and verify your account.

Login to browse products.

Add products to your cart and checkout using Razorpay.

View order history and track order status.

If you forget your password, use Forgot Password to reset it securely via email.

📸 Screenshots

Home / Product Listing


Product Details & Cart


Checkout with Razorpay


Order History


📄 License

This project is licensed under the MIT License - see the LICENSE
 file for details.