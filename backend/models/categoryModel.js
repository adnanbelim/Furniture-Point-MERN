import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { type: String, require: true },
    image: { type: Array, require: true },
    category: { type: String, require: true },
});

const categoryModel = mongoose.models.category || mongoose.model("category", categorySchema);

export default categoryModel;