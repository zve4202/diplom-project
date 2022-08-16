const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const Controller = require("../controllers/basket.controller");

router.get("/", Controller.get, Controller.add, Controller.get);
router.get("/:orderId", Controller.getItems);
router.put("/", Controller.updateListItem);

router.delete("/:id", Controller.delete);
router.delete("/all/:orderId", Controller.deleteAll);
router.put("/check", [auth], Controller.check);
router.put("/apply", [auth], Controller.apply);

module.exports = router;
