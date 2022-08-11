const { Schema, model } = require("mongoose");
const { createId } = require("../utils/db_utils");
const ObjectIdType = Schema.Types.ObjectId;

const statuses = ["new, ordered", "pending", "assembled", "sent", "deleted"];
module.exports = statuses;

const schema = new Schema(
    {
        _id: { type: Number },
        userId: { type: ObjectIdType, ref: "User" },
        status: {
            type: String,
            enum: statuses,
            required: true,
            default: "new"
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
    },
    { timestamps: true }
);

schema.pre("save", async function (next) {
    if (!this._id) {
        this._id = await createId("order");
    }
    next();
});
module.exports = model("Order", schema);
