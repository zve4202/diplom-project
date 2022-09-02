const { Schema, model } = require("mongoose");
const ObjectIdType = Schema.Types.ObjectId;

const { createId } = require("../utils/db_utils");
// const { defaultData } = require("order-delivery-details/defaultData");

const statuses = [
    "basket",
    "checked",
    "needpay",
    "new",
    "assembled",
    "pendingPayment",
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
                note: "",
                isValid: false
            }
        },

        sumOfPay: { type: Number, default: 0 },
        checkedAt: { type: Date }
    },
    { timestamps: true }
);

schema.pre("save", async function (next) {
    if (!this._id) {
        this._id = await createId("order");
    }
    if (this.status === "checked" && this.checkedAt === null) {
        this.checkedAt = new Date();
    }
    next();
});

const Order = model("Order", schema);

Order.collection.createIndex({
    userIp: 1,
    status: 1
});
module.exports = {
    Order,
    statuses
};
