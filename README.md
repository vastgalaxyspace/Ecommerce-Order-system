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



---

## ⚙️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for Authentication
- **Role-based Access Control** (User/Admin)

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/vastgalaxyspace/Ecommerce-Order-system.git
cd e-commerce-backend

npm install
npm start


:

🔐 Authentication Routes (/auth)
Method	Endpoint	Description	Auth Required
POST	/register	Register User/Admin	❌
POST	/login	Login User/Admin	❌
GET	/profile	Get Profile Info	✅
POST	/logout	Logout User	✅
🛍 Product Routes (/products)
Method	Endpoint	Description	Access
GET	/getallproducts	Get All Products (Public)	Public
POST	/addproduct	Add New Product	Admin Only
GET	/getproduct/:id	Get Product Details by ID	Public
PATCH	/updateproduct/:id	Update Product by ID	Admin Only
GET	/dashboard	Product Stats Dashboard	Admin Only
📦 Order Routes (/orders)
Method	Endpoint	Description	Access
POST	/createorder	Create a new order	User Only
GET	/getallorders	Get all orders (user)	User/Admin
PATCH	/:id/cancel	Cancel order by ID	User Only
