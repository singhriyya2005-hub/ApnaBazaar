const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const newProduct = await Product.create({
      name: req.body.name,
      price: Number(req.body.price),
      description: req.body.description,
      category: req.body.category,
      shop: req.body.shop,
      image: req.body.image,
      reel: req.body.reel || "",
      rating: 5,
    });

    res.status(201).json({
      success: true,
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add product",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    await Product.findByIdAndDelete(productId);

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
};