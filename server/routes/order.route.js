const express = require("express");
const router = express.Router();

const Controller = require("../controllers/order.controller");
const auth = require("../middleware/auth.middleware");

router.get("/:type/:userId", [auth], Controller.getAll);
router.get("/items/:type/:userId", [auth], Controller.getItems);
router.put("/:id", [auth], Controller.update);

module.exports = router;
