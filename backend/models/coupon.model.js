import mongoose from "mongoose";

/**
 * Coupon Schema
 *
 * This schema defines the structure of a coupon document in the database.
 * 
 * @typedef {Object} Coupon
 * @property {string} code - The unique code for the coupon. Required.
 * @property {number} discountPercentage - The discount percentage for the coupon. Required. Must be between 0 and 100.
 * @property {Date} expirationDate - The expiration date of the coupon. Required.
 * @property {boolean} isActive - Indicates if the coupon is active. Defaults to true.
 * @property {mongoose.Schema.Types.ObjectId} userId - The ID of the user associated with the coupon. Required. Must be unique.
 * @property {Date} createdAt - The date when the coupon was created. Automatically added by Mongoose.
 * @property {Date} updatedAt - The date when the coupon was last updated. Automatically added by Mongoose.
 */
const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Code is required"],
    },
    discountPercentage: {
      type: Number,
      required: [true, "Discount percentage is required"],
      min: [0, "Discount percentage must be at least 0"],
      max: [100, "Discount percentage must be at most 100%"],
    },
    expirationDate: {
      type: Date,
      required: [true, "Expiration date is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      unique: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

/**
 * The Coupon model represents coupons in the database, providing methods to interact with the coupon data.
 */
const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;

