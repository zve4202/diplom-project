const mongoose = require("mongoose");
const { Types } = mongoose;

const schema = new mongoose.Schema(
    {
        userId: { type: Types.ObjectId, ref: "User" },
        titleId: { type: Number, ref: "Title" },
        action: {
            type: String,
            enum: ["notify-me", "to-order"],
            required: true
        },
        need: { type: Number, default: 1 },
        price: { type: Number, default: 0 }
    },
    { timestamps: true }
);

schema.pre("save", async function (next) {
    if (this.action === "notify-me") {
        this.need = 0;
        this.price = 0;
    }
    next();
});

schema.index({ userId: 1, titleId: 1 }, { unique: true });
module.exports = mongoose.model("Reminder", schema);
