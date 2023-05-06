const express = require("express");
const router = express.Router();

const {
  getproduct,
  newProduct,
  getSingleProduct,
  UpdateProduct,
  DeleteProduct,
} = require("../Controllers/productController");

const { isAuthenficatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/products").get(getproduct);
router.route("/product/:_id").get(getSingleProduct);
router
  .route("/admin/product/new")
  .post(isAuthenficatedUser, authorizeRoles("admin"), newProduct);
router
  .route("/admin/product/:_id")
  .put(isAuthenficatedUser, authorizeRoles("admin"), UpdateProduct);
router
  .route("/admin/product/:_id")
  .delete(isAuthenficatedUser, authorizeRoles("admin"), DeleteProduct);

module.exports = router;
