import mongoose, { Schema } from "mongoose";
import pkg from "bcryptjs";
const { genSalt, hash, compare } = pkg;

/**
 * User Schema
 * 
 * This schema defines the structure of the User model in the Shoppie application.
 * 
 * @property {String} name - The name of the user. It is required.
 * @property {String} email - The email of the user. It is required, unique, lowercase, and trimmed.
 * @property {String} password - The password of the user. It is required and must be at least 6 characters long.
 * @property {Array} cartItems - The items in the user's cart. Each item has a quantity and a reference to a product.
 * @property {String} role - The role of the user. It can be either "customer" or "admin". The default is "customer".
 * @property {Date} createdAt - The date when the user was created. It is automatically generated.
 * @property {Date} updatedAt - The date when the user was last updated. It is automatically generated.
 */
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    cartItems: {
      type: [
        {
          quantity: {
            type: Number,
            default: 1,
          },
          product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
          },
        },
      ],
      default: [],
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await genSalt(10);
    const hashedPassword = await hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Compare the given password to the user's password
 *
 * @param {string} password - Password to compare
 * @returns {Promise<boolean>} True if the password matches, false otherwise
 */
userSchema.methods.comparePassword = async function (password) {
  if (!password) return false;
  if (!this.password) throw new Error("User password is not set");

  try {
    const isMatch = await compare(password, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("User", userSchema);

export default User;

