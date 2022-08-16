const { Schema, model } = require("mongoose");
const ObjectIdType = Schema.Types.ObjectId;

const schema = new Schema(
    {
        userIp: String,
        userId: { type: ObjectIdType, ref: "User" },
        docs: { type: Array, required: true },
        totalQty: { type: Number, required: true, default: 0 },
        totalPrice: { type: Number, required: true, default: 0 }
    },
    { timestamps: true }
);

const Basket = model("Basket", schema);
Basket.collection.createIndex({ userIp: 1 }, { unique: true });
module.exports = Basket;
