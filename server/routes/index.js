const express = require("express");
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const roleRoute = require("./role.route");
const categoryRoute = require("./category.route");
const productRoute = require("./product.route");
const formatRoute = require("./format.route");
const labelRoute = require("./label.route");
const originRoute = require("./origin.route");
const styleRoute = require("./style.route");
const orderRoute = require("./order.route");
const orderDetailsRoute = require("./order_details.route");
const basketRoute = require("./basket.route");
const reminderRoute = require("./reminder.route");

const router = express.Router({ mergeParams: true });

router.use("/auth", authRoute);

router.use("/user", userRoute);
router.use("/role", roleRoute);
router.use("/reminder", reminderRoute);

router.use("/product", productRoute);
router.use("/category", categoryRoute);
router.use("/format", formatRoute);
router.use("/label", labelRoute);
router.use("/origin", originRoute);
router.use("/style", styleRoute);

router.use("/order", orderRoute);
router.use("/order/details", orderDetailsRoute);
router.use("/basket", basketRoute);

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.use("/api/v1", router);
};
