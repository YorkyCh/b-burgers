const express = require("express");
const { register, login, deleteUsers } = require("../controllers/user");
const { route } = require("express/lib/router");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/delete").delete(deleteUsers);


module.exports = router;
