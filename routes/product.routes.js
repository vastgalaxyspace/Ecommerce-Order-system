const express = require("express");
const router = express.Router();

const productController = require("../controllers/Product.controllers");
const isAdmin = require("../middleware/roleMiddleware");
const authmiddleware = require("../middleware/authMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

//public access of list of product with filter
router.get("/getallproducts", productController.getAllProducts);

//adminonly acess of add new product
router.post(
  "/addproduct",
  authMiddleware.verifyToken,
  isAdmin.isAdmin,
  productController.addnewProduct
);

// public acess of get detils product
router.get("/getproduct/:id", productController.getproduct);

//adminonly acess for update product
router.patch(
  "/updateproduct/:id",
  authMiddleware.verifyToken,
  isAdmin.isAdmin,
  productController.updateProduct
);
router.get('/dashboard',authMiddleware.verifyToken,isAdmin.isAdmin,productController.getDashBoardStats);

module.exports = router;
