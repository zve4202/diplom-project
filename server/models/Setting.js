const { Schema, model } = require("mongoose");

const schema = new Schema({
    _id: { type: Number, default: 1 },
    curs: { type: Number, required: true, default: 100 },
    extra_charge: { type: Number, required: true, default: 10 }
});

module.exports = model("Setting", schema);
