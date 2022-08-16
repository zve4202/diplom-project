const { Schema, model } = require("mongoose");
const { createId } = require("../utils/db_utils");
const ObjectIdType = Schema.Types.ObjectId;

const statuses = [
    "basket",
    "new",
    "ordered",
    "pending",
    "assembled",
    "sent",
    "deleted"
];

const schema = new Schema(
    {
        _id: { type: Number },
        userIp: String,
        userId: { type: ObjectIdType, ref: "User" },
        status: {
            type: String,
            enum: statuses,
            required: true,
            default: "basket"
        }
    },
    { timestamps: true }
);

schema.pre("save", async function (next) {
    if (!this._id) {
        this._id = await createId("order");
    }
    next();
});

const order = model("Order", schema);

order.collection.createIndex({
    userIp: 1,
    status: 1
});
module.exports = order;
module.exports = {
    order,
    statuses
};
