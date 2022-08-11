const express = require("express");
const router = express.Router();

const Controller = require("../controllers/order.controller");
const auth = require("../middleware/auth.middleware");

router.get("/", [auth], Controller.getAll);
router.get("/:userId", [auth], Controller.get);
router.put("/:id", [auth], Controller.update);
router.post("/:id", [auth], Controller.add);
router.delete("/:id", [auth], Controller.delete);

module.exports = router;
