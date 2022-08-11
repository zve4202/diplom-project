const express = require("express");
const router = express.Router();

const Controller = require("../controllers/format.controller");

router.get("/", Controller.getAll);

module.exports = router;
