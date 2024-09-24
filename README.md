# Blog App Backend

This project is a RESTful API backend for a blog application, developed using Node.js, Express, and MongoDB. It supports user authentication, blog post creation, and image uploads, making it a versatile solution for blog management.

## Features

- **User Authentication**: Register, login, and authorization using JWT.
- **Blog Management**: Create, read, update, and delete blog posts.
- **User Profiles**: Manage user information.
- **Image Uploads**: Upload and attach images to blog posts.
- **Middleware Support**: Secured routes with authentication middleware and user validation.

## Tech Stack

- **Node.js**: JavaScript runtime for building scalable applications.
- **Express.js**: Fast, unopinionated web framework.
- **MongoDB**: NoSQL database for storing blog data.
- **Mongoose**: ODM for MongoDB, used for modeling data.
- **JWT**: Token-based authentication system.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+)
- [MongoDB](https://www.mongodb.com/) (local or cloud-based)

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/blogAppBackend.git
   cd blogAppBackend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the root directory based on `.env.example`:
   ```
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   ```

4. **Run the server locally**:
   Start the application with:
   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000` by default.

## AWS Deployment

This application is deployed on AWS, taking advantage of services like EC2 and S3.

### Steps for AWS Deployment:

1. **Setup an EC2 Instance**:
   - Launch an EC2 instance using Ubuntu or your preferred operating system.
   - Configure security groups to allow HTTP/HTTPS traffic.
   - SSH into the instance and install Node.js and MongoDB (or connect to an external MongoDB like Atlas).

2. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/blogAppBackend.git
   cd blogAppBackend
   ```

3. **Environment Variables**:
   - Use an `.env` file to store environment variables such as `MONGO_URI` and `JWT_SECRET`.

4. **Install Dependencies & Run**:
   ```bash
   npm install
   npm start
   ```

5. **AWS S3 for Image Uploads**:
   - Set up an S3 bucket to store images.
   - Ensure the correct permissions are in place for the bucket.
   - Modify the image upload middleware to use AWS SDK for uploading images to S3.

6. **AWS RDS for MongoDB (Optional)**:
   If you're using AWS RDS, connect your MongoDB instance through the appropriate connection string in your `.env` file.

## API Endpoints

### Authentication Routes

- `POST /api/auth/register` – Register a new user.
- `POST /api/auth/login` – Login a user and receive a token.

### Blog Routes

- `GET /api/blogs` – Retrieve all blog posts.
- `GET /api/blogs/:id` – Retrieve a single blog post by ID.
- `POST /api/blogs` – Create a new blog post (authenticated users only).
- `PUT /api/blogs/:id` – Update an existing blog post (authenticated users only).
- `DELETE /api/blogs/:id` – Delete a blog post (authenticated users only).

### User Routes

- `GET /api/users/:id` – Get user details by ID.
- `PUT /api/users/:id` – Update user details.
- `DELETE /api/users/:id` – Delete a user account.

### Image Upload Routes

- `POST /api/uploads` – Upload an image for a blog post (using AWS S3).

## Folder Structure

```
blogAppBackend/
│
├── src/
│   ├── config/             # Environment configurations
│   ├── controllers/        # API business logic
│   ├── middleware/         # Authentication, user checks, etc.
│   ├── models/             # Database models (User, Blog, Auth)
│   ├── routes/             # API routes
│   └── app.js              # Express app setup
├── .env.example            # Environment variables example
├── package.json            # Project metadata and dependencies
├── server.js               # Main server entry point
└── README.md               # Project documentation
```

## Contributing

If you'd like to contribute to this project, feel free to submit a pull request or open an issue to discuss any improvements or bugs.

## License

This project is licensed under the MIT License.

---
