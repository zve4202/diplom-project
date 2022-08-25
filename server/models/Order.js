const { Schema, model } = require("mongoose");
const ObjectIdType = Schema.Types.ObjectId;

const { createId } = require("../utils/db_utils");
// const { defaultData } = require("order-delivery-details/defaultData");

const statuses = [
    "basket",
    "checked",
    "new",
    "ordered",
    "pending",
    "assembled",
    "sent",
    "delivered",
    "cancelled",
    "partly",
    "unavailable"
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
            default: statuses[0]
        },
        deliveryInfo: {
            type: Object,
            default: {
                placeId: "",
                persone: "",
                phone: "",
                delivery: "",
                payment: "",
                index: "",
                address: "",
                note: ""
            }
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
