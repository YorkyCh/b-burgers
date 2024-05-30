const express = require("express");
const {
  createCheckout,
  getCheckout,
  updateCheckout,
  getCheckoutsByUser,
} = require("../controllers/checkout");
const authenticateUser = require("../middleware/authentication");

const router = express.Router();

router
  .route("/")
  .post(authenticateUser, createCheckout)
  .get(authenticateUser, getCheckoutsByUser);
router
  .route("/:id")
  .get(authenticateUser, getCheckout)
  .put(authenticateUser, updateCheckout);

module.exports = router;
