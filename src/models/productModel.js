import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product_Name: { type: String, required: true },
  brand_Name: { type: String, required: true },
  category: { type: String, required: true },
  category2: { type: String },
  mediaURL: { type: String, required: true },
  about: { type: String },
  trending: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  form: { type: String, default: "4x4" },
  composition: { type: String, default: "xyz" },
});

const Product =
  mongoose.models.products || mongoose.model("products", productSchema);

export default Product;
