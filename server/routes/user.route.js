const express = require("express");
const router = express.Router();

const Controller = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");

router.get("/auth", [auth], Controller.get);
router.get("/", [auth, admin], Controller.getAll);
router.get("/:userId", [auth, admin], Controller.get);
router.patch("/:userId", [auth, admin], Controller.update);

module.exports = router;
