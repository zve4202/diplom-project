const { Schema, model } = require("mongoose");
const ObjectIdType = Schema.Types.ObjectId;
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const schema = new Schema(
  {
    userId: { type: ObjectIdType, ref: "User" },
    docs: { type: Array, required: true },
    totalQty: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

schema.plugin(aggregatePaginate);

module.exports = model("Basket", schema);
