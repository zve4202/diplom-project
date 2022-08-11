const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const Controller = require("../controllers/product.controller");

router.get("/", Controller.getAll);
router.get("/:id", Controller.get);
router.get("/barcode/:id", Controller.getBarcode);
router.post("/", [auth], Controller.add);
router.put("/:id", [auth], Controller.update);
router.delete("/:id", [auth], Controller.delete);

module.exports = router;
