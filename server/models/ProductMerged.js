const { Schema, model } = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const schema = new Schema(
    {
        _id: { type: Number, required: true },
        article: { type: String, required: true },
        title: { type: Object },
        quality: { type: String },
        price: { type: Number, required: true },
        count: { type: Number, required: true }
    },
    { timestamps: true }
);

schema.plugin(aggregatePaginate);

module.exports = model("V_product", schema);
