const Product = require("../models/Product.model");
const cloudinary = require("../config/cloudinary");

// Helper function to securely extract the absolute Public ID path from Cloudinary links
const extractCloudinaryPublicId = (url) => {
  if (!url || !url.includes("://cloudinary.com")) return null;
  try {
    // Splits URL segments to capture folders and filename safely, stripping out file extension parameters
    const parts = url.split("/upload/");
    if (parts.length < 2) return null;

    const publicIdWithExtension = parts[1].replace(/^v\d+\//, "");
    return publicIdWithExtension.substring(
      0,
      publicIdWithExtension.lastIndexOf("."),
    );
  } catch (error) {
    console.error("Error parsing Cloudinary Public ID:", error);
    return null;
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

// Get single product details by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
};

// Create a new product entry
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    let imageUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      imageUrl,
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
};

// Update an existing product definition specifications modified parameters
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let currentImageUrl = product.imageUrl;

    if (req.file) {
      // Clean up the old image from Cloudinary if it exists
      if (product.imageUrl) {
        const oldPublicId = extractCloudinaryPublicId(product.imageUrl);
        if (oldPublicId) {
          await cloudinary.uploader
            .destroy(oldPublicId)
            .then((res) =>
              console.log(
                `Cloudinary Cleanup Triggered for ID: ${oldPublicId}`,
                res,
              ),
            )
            .catch((err) => console.error("Cloudinary Delete Error:", err));
        }
      }
      // Stream fresh media upload assets bundle straight to cloud buckets
      const result = await cloudinary.uploader.upload(req.file.path);
      currentImageUrl = result.secure_url;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: name || product.name,
        description: description || product.description,
        price: price || product.price,
        category: category || product.category,
        stock: stock || product.stock,
        imageUrl: currentImageUrl,
      },
      { new: true },
    );

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};

// Delete a product permanently out of memory collections
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Deletes the active image from Cloudinary permanently
    if (product.imageUrl) {
      const publicId = extractCloudinaryPublicId(product.imageUrl);
      if (publicId) {
        await cloudinary.uploader
          .destroy(publicId)
          .then((res) =>
            console.log(
              `Cloudinary Deletion Completed for ID: ${publicId}`,
              res,
            ),
          )
          .catch((err) => console.error("Cloudinary Delete Error:", err));
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
