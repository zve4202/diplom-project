const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const { createId } = require("../utils/db_utils");

mongoose.plugin(slug);

const schema = new mongoose.Schema(
    {
        _id: { type: Number },
        alias: { type: String, slug: "name" },
        name: { type: String, required: true },
        category: { type: Number, ref: "Category", default: 1 }
    },
    {}
);

schema.pre("save", async function (next) {
    if (!this._id) {
        this._id = await createId("formst");
    }
    next();
});

module.exports = mongoose.model("Format", schema);
