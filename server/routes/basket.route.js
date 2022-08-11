const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const Controller = require("../controllers/basket.controller");

router.get("/:id", Controller.get);
router.post("/", Controller.add);
router.put("/:id", Controller.update);
router.delete("/:id", Controller.delete);
router.put("/:id/apply", [auth], Controller.apply);

module.exports = router;
