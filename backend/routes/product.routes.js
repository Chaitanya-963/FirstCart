const express = require("express");
const { protect } = require("../middleware/auth.middleware");
const { admin } = require("../middleware/admin.middleware");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controllers.js");

const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Temporary storage for uploaded files

const router = express.Router();

// All product controller functions
router
  .route("/")
  .get(getAllProducts)
  .post(protect, admin, upload.single("image"), createProduct);

// Sepecific product controller functions
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, upload.single("image"), updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router;
