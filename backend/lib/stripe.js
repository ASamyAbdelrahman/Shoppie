/**
 * This file imports the Stripe library and configures it with the secret key
 * defined in the environment variables. The Stripe instance is then exported
 * for use in other modules.
 *
 * @requires Stripe
 * @requires dotenv
 * @exports {Stripe} stripe - The Stripe instance configured with the secret key
 */

import Stripe from "stripe";
import dotenv from "dotenv";

// Load environment variables from a .env file into process.env
dotenv.config();

// Ensure the Stripe secret key is defined in environment variables
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error(
    "STRIPE_SECRET_KEY is not defined in environment variables"
  );
}

// Configure the Stripe instance with the secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

