const Product = require("../models/Product");

const productController = {};

productController.getAllProducts = async (req, res) => {
  try {
    const { category, minprice, maxprice, search, page, limit } = req.query;
    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (minprice || maxprice) {
      filter.price = {};
      if (minprice) filter.price.$gte = Number(minprice);
      if (maxprice) filter.price.$lte = Number(maxprice);
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const products = await Product.find(filter)
      .populate("createdBy", "username email")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "error fetching products" });
  }
};

productController.addnewProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
    });
    await newProduct.save();
    res
      .status(201)
      .json({ message: "product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json("product not added");
  }
};

productController.getproduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "error fetching product" });
  }
};

productController.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const userId = req.user._id;
    const allowfields = ["name", "description", "price", "stock", "category"];
    const updatekeys = Object.keys(updates);

    const isvalidateupdate = updatekeys.every((field) =>
      allowfields.includes(field)
    );

    if (!isvalidateupdate) {
      return res.status(400).json({ message: "invalid update" });
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(200).json({ message: "product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "error updating product" });
  }
};

module.exports = productController;
