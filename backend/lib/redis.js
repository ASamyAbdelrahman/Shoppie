/**
 * This module imports the ioredis library and configures it with the
 * UPSTASH_REDIS_URI environment variable. The configured Redis instance is
 * then exported for use in other modules.
 *
 * @requires ioredis
 * @requires dotenv
 * @exports {Redis} redis - The configured Redis instance
 */

import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.UPSTASH_REDIS_URI) {
  throw new Error(
    "UPSTASH_REDIS_URI is not defined in environment variables. Please set this variable to the connection string of your Upstash Redis instance."
  );
}

/**
 * The Redis instance configured with the UPSTASH_REDIS_URI environment variable.
 * @constant
 * @type {Redis}
 * @default
 */
export const redis = new Redis(process.env.UPSTASH_REDIS_URI);

