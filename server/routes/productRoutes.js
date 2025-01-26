const express = require("express");
const {
  getProducts,
  createProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const validateToken = require("../middlewares/validateTokenHandler");
const upload = require("../middlewares/uploadMiddleware");
const router = express.Router();

// router.use(validateToken)
router.route("/").get(getProducts).post(upload.single("image"), createProducts);
router
  .route("/:id")
  .get(getProduct)
  .put(upload.single("image"), updateProduct)
  .delete(deleteProduct);

module.exports = router;
