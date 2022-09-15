const express = require("express");
const router = express.Router();

const Controller = require("../controllers/order.controller");
const auth = require("../middleware/auth.middleware");

router.get("/:type", [auth], Controller.getAll);
router.get("/items/:type", [auth], Controller.getItems);
router.put("/:id", [auth], Controller.update);

module.exports = router;
