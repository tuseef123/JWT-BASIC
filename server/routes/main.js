const express = require("express");
const router = express.Router();

const { login, dashboard } = require("../controllers/main");
const autheticationMiddleware = require("../middleware/auth");

router.route("/login").post(login);
router.route("/dashboard").get(autheticationMiddleware, dashboard);

module.exports = router;
