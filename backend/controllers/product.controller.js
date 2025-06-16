import mongoose from 'mongoose';
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    console.log("Product:", products);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error in fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;
  
  if (!name || !price || !image) {
    return res.status(400).json({ success: false, message: "Please provide all fields" });
  }
  
  const newProduct = new Product({ name, price, image });
  
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log("Error in creating product:", error.message);
    res.status(500).json({ success: false, message: "Server Error!" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Product Id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.log("Error in updating product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Product Id" });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product deleted", data: deletedProduct });
  } catch (error) {
    console.log("Error in deleting product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
