const {
  getBurgers,
  createBurger,
  updateBurger,
  deleteBurger,
  getBurger,
} = require("../controllers/burger");
const express = require("express");
const authenticateUser = require("../middleware/authentication");
const router = express.Router();

router.route("/").get(getBurgers).post(authenticateUser, createBurger);
router
  .route("/:id")
  .get(getBurger)
  .patch(authenticateUser, updateBurger)
  .delete(authenticateUser, deleteBurger);

module.exports = router;
