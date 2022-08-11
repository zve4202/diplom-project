const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const { createId } = require("../utils/db_utils");

const schema = new mongoose.Schema(
    {
        _id: { type: Number, required: true },
        pre_id: { type: Number },
        sub_id: { type: Number, default: 0 },
        article: { type: String, default: "" },
        title: { type: Number, ref: "Title", required: true },
        quality: { type: String },
        price: { type: Number, required: true },
        count: { type: Number, required: true }
    },
    { timestamps: true }
);

schema.pre("save", async function (next) {
    if (!this._id) {
        this._id = await createId("product");
    }
    this.article = String.prototype.concat(
        this.pre_id,
        "-",
        this.title,
        "-",
        this.sub_id
    );
    next();
});

schema.plugin(aggregatePaginate);

module.exports = mongoose.model("Product", schema);
