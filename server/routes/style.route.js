const express = require("express");
const router = express.Router();

const Controller = require("../controllers/style.controller");

router.get("/", Controller.getAll);

module.exports = router;
