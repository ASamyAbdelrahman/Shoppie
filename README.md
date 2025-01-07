<h1 align="center">Shoppie Store 🛒</h1>

**Shoppie** is a scalable and extensible **MERN**-based multi-user e-commerce platform. This repository contains the backend API that powers the platform, handling user authentication, product management, order cycle, and more.

![Demo App](/frontend/public/image.png)

## Features

- 🛒 Built using the **MERN stack** (MongoDB, Express, React, Node.js)

- 🔑 **JWT authentication** for secure user login and registration
- 🗄️ **MongoDB & Redis** Integration
- 💳 **Stripe** Payment Setup
- 🔐 Robust Authentication System
- 📝 User Signup & Login
- 📦 Product & Category Management
- 🛍️ Shopping Cart Functionality
- 💰 Checkout with Stripe
- 🏷️ Coupon Code System
- 👑 Admin Dashboard
- 📊 Sales Analytics
- 🎨 Design with **Tailwind**
- 🛒 Cart & Checkout Process
- 🔒 Security
- 🛡️ Data Protection
- 🚀 Caching with **Redis**
- ⌛ And a lot more...

## Setup .env file

```bash
PORT=5000
MONGO_URI=your_mongo_uri

UPSTASH_REDIS_URL=your_redis_url

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

## Run this app locally

```shell
npm run build
```

## Start the app

```shell
npm run start
```

## Project Directory Structure

The project follows a clean and modular structure for scalability:

``` markdown
  Shoppie/backend/
  ├── controllers/        # Logic for handling requests
  ├── models/             # MongoDB models for users, products, orders, coupons
  ├── middleware/         # Custom middleware for validation, authentication, etc.
  ├── routes/             # Routes defining the API endpoints
  ├── utils/              # Helper utilities and functions
  ├── .env                # Environment variables (secrets, salts, JWT secret)
  └── server.js           # Entry point for the application
```
## Contributing
Feel free to fork the repository and submit pull requests. Contributions are welcome to improve the platform and add more features.
