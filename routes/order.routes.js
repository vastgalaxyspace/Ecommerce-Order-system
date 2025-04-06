const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/roleMiddleware");

router.post(
  "/createorder",
  authMiddleware.verifyToken,
  adminMiddleware.isUser,
  orderController.createOrder
);
router.get("/getallorders", authMiddleware.verifyToken, orderController.getAllOrders);
router.patch(
  "/:id/cancel",
  authMiddleware.verifyToken,
  adminMiddleware.isUser,
  orderController.cancelOrder
);

module.exports = router;
