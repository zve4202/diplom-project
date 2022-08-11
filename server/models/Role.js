const { Schema, model } = require("mongoose");

const colors = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "dark"
];

const schema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    color: { type: String, enum: colors, required: true }
});

module.exports = model("Role", schema);
