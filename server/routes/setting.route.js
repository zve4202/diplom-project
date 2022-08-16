const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");

const Controller = require("../controllers/setting.controller");

router.get("/", [auth, admin], Controller.get);
router.put("/", [auth, admin], Controller.update);

module.exports = router;
