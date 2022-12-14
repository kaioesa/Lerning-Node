import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "authors",
    required: true,
  },
  publisher: { type: String, required: true },
  totalPages: { type: Number, required: true },
});

const products = mongoose.model("products", productSchema);

export default products;
