# Ecommerce Full Stack Web App

This is a full-stack E-commerce web application built with Node.js, Express, React, and MongoDB. The project includes server-side and client-side code for seamless integration.

## Features

- Admin Panel: Admins can edit users and perform CRUD operations on products, users, and categories. They can also change the order state between pending and delivered.
- User Dashboard: Users can view their recent and current orders & User Also update Profile Details.
- Cart Functionality: Users can add products to their cart and proceed to checkout.
- JWT Verification: JWT tokens are used for authentication and authorization.
- Security: Bcrypt is used for password hashing.
- Cloudinary Integration: Cloudinary is used for storing product images.

## Prerequisites

Before running the application, make sure to create your own `.env` file in the root directory with the following environment variables:

1. `HOST`: Set to `127.0.0.1`
2. `PORT`: Set to `5000`
3. `DB_URL`: MongoDB connection URL (`mongodb://127.0.0.1:27017/<your-db-name>`)
4. `DEBUG_MODE`: Set to `true` or `false` (BOOLEAN)
5. `ACCESS_TOKEN_SECRET`: Secret key for JWT token generation
6. `ACCESS_TOKEN_EXPIRY`: Expiry time for JWT tokens (e.g., `1d` for one day)

### Cloudinary Configuration

[CLOUDINARY](https://cloudinary.com/) is used for uploading product images. Add the following Cloudinary environment variables:

7. `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
8. `CLOUDINARY_API_KEY`: Your Cloudinary API key
9. `CLOUDINARY_API_SECRET`: Your Cloudinary API secret

## Getting Started

### Installation

###### Install project dependencies for both the server and client:

```
npm install
```

### Install Dependencies

```
npm run dep
```

### Run Development Server
```
npm dev
```



###### Remember to replace placeholders like `<your-db-name>` with actual values. Additionally, consider creating a `CONTRIBUTING.md` file if you have specific guidelines for contributors. Feel free to adapt this template based on your project's specific needs.


