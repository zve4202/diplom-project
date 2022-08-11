const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const { createId } = require("../utils/db_utils");

mongoose.plugin(slug);

const schema = new mongoose.Schema({
    _id: { type: Number },
    alias: { type: String, slug: "name" },
    barcode: { type: String, required: true },
    artist: { type: Number, ref: "Artist", required: true },
    name: { type: String, required: true },
    format: { type: Number, ref: "Format", required: true },
    year: { type: String },
    label: { type: Number, ref: "Label" },
    style: { type: String },
    origin: { type: String },
    image: { type: String }
});

schema.pre("save", async function (next) {
    if (!this._id) {
        this._id = await createId("title");
    }
    next();
});

module.exports = mongoose.model("Title", schema);
