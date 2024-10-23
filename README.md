# User-Auth-API

## Overview

The Auth API is a robust authentication solution designed to handle user registration, login, and secure access to protected routes. This API supports both MongoDB and JSON file storage, allowing for flexible deployment options. Built with TypeScript and Express, it offers a modern approach to user authentication with easy-to-use endpoints and comprehensive features.

## Unique Features

- **Dual Storage Support**: The API can operate with MongoDB for production use or with a simple JSON file for development and testing, making it versatile and easy to set up.
  
- **JWT Authentication**: Utilizes JSON Web Tokens (JWT) for secure authentication, ensuring that user sessions are handled efficiently.

- **Protected Routes**: Provides middleware to protect routes and ensure only authenticated users can access sensitive information.

- **User Data Management**: Supports CRUD operations (Create, Read, Update, Delete) for user data, allowing users to manage their profiles seamlessly.

- **Password Hashing**: Implements secure password storage using bcrypt, ensuring user passwords are never stored in plain text.

- **Dynamic Token Generation**: Automatically generates and assigns new JWT tokens whenever a user updates their profile, maintaining session integrity.

- **Customizable Configuration**: Easily configure the application to switch between storage options via environment variables.

- **Service Layer**: The API includes a service layer that functions similarly to an Object-Relational Mapping (ORM) system, allowing for abstraction in database operations. This makes it easier to manage data interactions regardless of whether MongoDB or JSON is used as the storage solution.

## Services Features

The Auth API’s service layer provides several key functionalities:

- **User Creation**: Handles user registration, ensuring data validation and secure password storage.
  
- **User Authentication**: Manages user login and token generation, including checks for existing users.

- **User Retrieval**: Implements methods to find users by various identifiers, such as email, username, or user ID.

- **User Update**: Allows updating user details while preserving existing data unless explicitly changed.

- **User Deletion**: Provides a mechanism for removing users from both the database and JSON file storage.

- **Data Synchronization**: Ensures that data remains consistent across both MongoDB and JSON storage when using dual storage.

## Installation

### Prerequisites

- Node.js (>= 14.x)
- MongoDB (if using MongoDB storage)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/lawalstacks/user-auth-api.git
   cd user-auth-api


2. Install dependencies:

```bash
 npm install
```


3. Create a .env file in the root directory and define the following environment variables:

MONGO_URL=mongodb://<username>:<password>@localhost:27017/yourdbname
JWT_SECRET=your_jwt_secret


4. Run the server:

npm run start



###API Endpoints

##User Registration

POST /signup

Request Body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}

Response:

```json
201 Created: User created successfully.

400 Bad Request: Validation errors or user already exists.




##User Login

POST /login

Request Body:
```json
{
  "username": "string",
  "password": "string"
}

Response:

```json
200 OK: User logged in successfully with JWT token.

401 Unauthorized: Invalid credentials.




##User Profile Update

PATCH /update-profile

Request Body:
```json
{
  "username": "string",
  "email": "string",
  "password": "string" (optional)
}

Response:

```json
200 OK: User profile updated successfully.

404 Not Found: User not found.




##User Logout

POST /logout

Response:
```json

200 OK: User logged out successfully.




###Middleware

Protected Route

The protectedRoute middleware ensures that only authenticated users can access certain endpoints. It verifies the JWT token sent in the cookies and fetches the user data.

###Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request with your changes.

###License

This project is licensed under the MIT License - see the LICENSE file for details.

###Acknowledgments

Express - Web framework for Node.js

jsonwebtoken - For handling JWTs

bcrypt - For password hashing

TypeScript - For enhancing JavaScript with static types


### Notes for Customization
- **Update the GitHub link** to your actual repository.
- **Add any additional services** or endpoints that might be included later.
- **Adjust descriptions** or features based on your actual implementation.