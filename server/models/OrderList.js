const { Schema, model } = require("mongoose");
const { createId } = require("../utils/db_utils");

const { statuses } = require("./Order");

const schema = new Schema({
    _id: { type: Number },
    orderId: { type: Number, ref: "Order", required: true },
    productId: { type: Number, ref: "Product", required: true },
    status: {
        type: String,
        enum: statuses,
        required: true,
        default: "ordered"
    },
    count: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    }
});
schema.pre("save", async function (next) {
    if (!this._id) {
        this._id = await createId("orderlist");
    }
    next();
});

module.exports = model("OrderList", schema);
