const { Schema, model } = require("mongoose");
const { createId } = require("../utils/db_utils");

const { statuses } = require("./Order");

const schema = new Schema({
    _id: { type: Number },
    orderId: { type: Number, ref: "Order", required: true },
    product: { type: Number, ref: "V_product", required: true },
    status: {
        type: String,
        enum: statuses,
        required: true,
        default: "basket"
    },
    needQty: Number,
    qty: {
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
        this._id = await createId("orderline");
    }
    next();
});

const orderList = model("Orderline", schema);
orderList.collection.createIndex({ product: 1, orderId: 1 }, { unique: true });
module.exports = orderList;
