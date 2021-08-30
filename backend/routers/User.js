const express = require('express');
const router = express.Router();
const controller = require("../controllers/authController");

router.route("/signup").put(controller.signup);
router.route("/login").post(controller.login);

module.exports = router;