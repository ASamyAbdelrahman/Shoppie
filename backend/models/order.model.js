import mongoose from "mongoose";

/**
 * Order Schema
 * 
 * This schema defines the structure of an order in the Shoppie application.
 * 
 * @typedef {Object} Order
 * @property {mongoose.Schema.Types.ObjectId} user - The ID of the user who placed the order. Required.
 * @property {Array.<Object>} products - The list of products in the order.
 * @property {mongoose.Schema.Types.ObjectId} products.product - The ID of the product. Required.
 * @property {Number} products.quantity - The quantity of the product. Required. Minimum value is 1.
 * @property {Number} products.price - The price of the product. Required. Minimum value is 0.
 * @property {Number} totalAmount - The total amount of the order. Required. Minimum value is 0.
 * @property {String} stripeSessionId - The Stripe session ID for the order. Unique and sparse.
 * @property {Date} createdAt - The date and time when the order was created. Automatically generated.
 * @property {Date} updatedAt - The date and time when the order was last updated. Automatically generated.
 */
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Product is required"],
        },
        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
          min: [1, "Quantity must be at least 1"],
        },
        price: {
          type: Number,
          required: [true, "Price is required"],
          min: [0, "Price must be at least 0"],
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Total amount must be at least 0"],
    },
    stripeSessionId: {
      type: String,
      unique: true,
      sparse: true, // allows null values for stripeSessionId, ensuring unique constraint is only applied to non-null values
    },
  },
  {
    timestamps: true,
    validateBeforeSave: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

