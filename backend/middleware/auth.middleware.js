import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Utility function to extract access token from request
const getAccessToken = (req) => {
  return req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
};

// Utility function to handle unauthorized responses
const sendUnauthorizedResponse = (
  res,
  message = "Unauthorized - Invalid access token"
) => {
  return res.status(401).json({ message });
};

/**
 * Middleware to protect routes by verifying the access token.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 *
 * @throws {Error} If there is an error during token verification or user retrieval.
 */
export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = getAccessToken(req);

    if (!accessToken) {
      return sendUnauthorizedResponse(
        res,
        "Unauthorized - No access token provided"
      );
    }

    if (!process.env.ACCESS_TOKEN_SECRET) {
      return res.status(500).json({
        message: "Internal server error - Missing access token secret",
      });
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded?.userId).select("-password");

    if (!user) {
      return sendUnauthorizedResponse(res, "User not found");
    }

    req.user = user; // Attach the user object to the request
    next();
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return sendUnauthorizedResponse(res, `Unauthorized - ${error.message}`);
    }

    console.error("Error in protectRoute middleware:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });}
};

// Middleware to restrict access to admin users only
export const adminRoute = (req, res, next) => {
  if (req.user?.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied - Admin only" });
  }
};
