const { Schema, model } = require("mongoose");

const schema = new Schema({
    _id: { type: Number },
    alias: { type: String },
    barcode: { type: String },
    artist: { type: Object },
    name: { type: String },
    format: { type: Object },
    year: { type: String },
    label: { type: Object },
    style: { type: String },
    origin: { type: String },
    image: { type: String }
});

module.exports = model("Title_m", schema);
