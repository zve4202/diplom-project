import mongoose from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import slug from "mongoose-slug-generator";

import { dataHistory } from "order-delivery-details";

mongoose.plugin(slug);
const sexes = ["male", "female"];

const schema = new mongoose.Schema(
    {
        alias: { type: String, slug: "name" },
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        sex: { type: String, enum: sexes, default: sexes[0], required: true },
        role: { type: String, ref: "Role" },
        image: { type: String },
        deliveryPlaces: {
            type: Object,
            default: { lastPlace: "", dataHistory }
        }
    },
    { timestamps: true }
);

schema.plugin(aggregatePaginate);

export default mongoose.model("User", schema);
