const Order = require("../models/Order");
const Product = require("../models/Product");

const orderController = {};

orderController.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { products, address, paymentMethod } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products in the order" });
    }

    let totalAmount = 0;
    const productDetails = [];

    for (const item of products) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res
          .status(404)
          .json({ message: `product with id ${item.product} not found` });
      }

      if (product.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `product with id ${item.product} is out of stock` });
      }

      product.stock -= item.quantity;
      await product.save();

      totalAmount += product.price * item.quantity;

      productDetails.push({
        product: product._id,
        quantity: item.quantity,
      });
    }

    const newOrder = new Order({
      customer: userId,
      products: productDetails,
      totalAmount,
      address,
      paymentMethod,
    });

    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (err) {
    console.log(err);
    console.error("Order creation error:", err); 

    res.status(500).json({ message: "Internal server error" });
  }
};

orderController.getAllOrders = async (req, res) => {
  try {
    const user = req.user;
    let orders;

    if (user.role === "admin") {
      orders = await Order.find()
        .populate("customer", "username email")
        .populate("products.product", "name price");
    } else {
      orders = await Order.find({ customer: user.id }).populate(
        "products.product",
        "name price"
      );
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

orderController.cancelOrder = async (req, res) => {
  try {
    const userid = req.user.id;
    const userrole = req.user.role;
    const orderid = req.params.id;

    if (userrole !== "customer") {
      return res
        .status(403)
        .json({ message: "Only customers can cancel orders" });
    }

    const order = await Order.findById(orderid);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (order.customer.toString() !== userid) {
      return res.status(403).json({ message: "You are not authorized to cancel this order" });
    }

    if (order.iscanceled || order.status === "cancelled") {
      return res.status(400).json({ message: "Order already cancelled" });
    }

    order.status = "cancelled";
    order.iscanceled = true;
    await order.save();

    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = orderController;
