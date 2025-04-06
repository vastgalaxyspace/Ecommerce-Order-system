# 🛒 E-Commerce Backend API

A role-based backend API built with **Node.js**, **Express**, and **MongoDB** for managing authentication, products, and orders. This API is designed for scalability and includes admin/user access control, product management, and order processing features.

---

## 📁 Folder Structure

.
├── config/               # Database configuration
├── controllers/          # Route handler logic
├── docs/                 # Postman collection or API docs (optional)
├── middleware/           # Role-based and auth middleware
│   └── roleMiddleware.js
├── models/               # Mongoose schemas (User, Product, Order)
├── routes/               # Route definitions
│   ├── auth.routes.js
│   ├── order.routes.js
│   └── product.routes.js
├── .env                  # Environment variables (not uploaded)
├── server.js             # Entry point of the app
└── README.md             # You're reading it 😉

