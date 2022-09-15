const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const Controller = require("../controllers/basket.controller");
const UserController = require("../controllers/user.controller");

router.get("/", Controller.get, Controller.add, Controller.get);
router.get("/:orderId", Controller.getItems);
router.put("/", Controller.updateListItem);

router.delete("/:id", Controller.delete);
router.delete("/all/:orderId", Controller.deleteAll);
router.put("/info", [auth], UserController.info, Controller.info);
router.put("/check", [auth], UserController.getInfo, Controller.check);
router.put("/apply", [auth], UserController.info, Controller.apply);
router.put("/topay", [auth], Controller.setPay);
router.put("/disassemble", [auth], Controller.disassemble);

module.exports = router;
