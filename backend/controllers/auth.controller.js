import { redis } from "../lib/redis.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Utility function to generate access and refresh tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "8d",
  });
  return { accessToken, refreshToken };
};

// Utility function to store refresh token in Redis
const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refreshToken:${userId}`,
    refreshToken,
    "EX",
    8 * 24 * 60 * 60
  ); // 8 days
};

// Utility function to set cookies
const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true, // Prevent XSS attacks
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 8 * 24 * 60 * 60 * 1000, // 8 days
  });
};

// Utility function to clear cookies
const clearCookies = (res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
};

// Signup controller
export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = await User.create({ email, password, name });

    // Generate tokens and set cookies
    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);

    // Respond with user data
    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and password is correct
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate tokens and set cookies
    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);

    // Respond with user data
    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "User logged in successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Logout controller
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    // Verify and delete refresh token from Redis
    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      await redis.del(`refreshToken:${decoded.userId}`);
    }

    // Clear cookies
    clearCookies(res);

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Refresh token controller
/**
 * Refreshes the access token using the provided refresh token.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.cookies - The cookies from the request.
 * @param {string} req.cookies.refreshToken - The refresh token from the cookies.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the token is refreshed.
 *
 * @throws {Error} - Throws an error if the refresh token is invalid or if there is an internal server error.
 */
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    // Check if refresh token exists
    if (!refreshToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const storedToken = await redis.get(`refreshToken:${decoded.userId}`);

    // Check if refresh token is valid
    if (storedToken !== refreshToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Generate new access token
    const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15m',
    });

    // Set new access token in cookie
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({ message: 'Token refreshed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Get user profile controller
export const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.log("Error in getProfile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
