const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");

const Controller = require("../controllers/role.controller");

router.get("/", Controller.getAll);
router.get("/:id", Controller.get);
router.post("/", [auth, admin], Controller.add);
router.put("/:id", [auth, admin], Controller.update);
router.delete("/:id", [auth, admin], Controller.delete);

module.exports = router;
