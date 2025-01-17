import mongoose from "mongoose";

/**
 * Product Schema
 * 
 * This schema defines the structure of product documents in the database.
 * 
 * @property {String} name - The name of the product. This field is required.
 * @property {String} description - A brief description of the product. This field is required.
 * @property {Number} price - The price of the product. This field is required.
 * @property {String} image - The URL of the product image. This field is required.
 * @property {String} category - The category to which the product belongs. This field is required.
 * @property {Boolean} isFeatured - Indicates whether the product is featured. Defaults to false.
 * @property {Date} createdAt - The date when the product was created. Automatically generated.
 * @property {Date} updatedAt - The date when the product was last updated. Automatically generated.
 */
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be at least 0"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

/**
 * The Product model represents products in the database.
 */
const Product = mongoose.model("Product", productSchema);

export default Product;

