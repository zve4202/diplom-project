const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const Controller = require("../controllers/reminder.controller");

router.route("/").get(auth, Controller.getAll);
router.route("/").post(auth, Controller.create);
router.route("/").delete(auth, Controller.deleteAll);
router.route("/:titleId").get(auth, Controller.get);
router.route("/:titleId").put(auth, Controller.update);
router.route("/:titleId").delete(auth, Controller.delete);

module.exports = router;
