## Overview

The User-Auth-API is a robust authentication solution designed to handle user registration, login, and secure access to protected routes. This API supports both MongoDB and JSON file storage, allowing for flexible deployment options. Built with TypeScript and Express, it offers a modern approach to user authentication with easy-to-use endpoints and comprehensive features.

## Unique Features

- **Dual Storage Support**: The API can operate with MongoDB for production use or with a simple JSON file for development and testing, making it versatile and easy to set up.
  
- **JWT Authentication**: Utilizes JSON Web Tokens (JWT) for secure authentication, ensuring that user sessions are handled efficiently.

- **Protected Routes**: Provides middleware to protect routes and ensure only authenticated users can access sensitive information.

- **User Data Management**: Supports CRUD operations (Create, Read, Update, Delete) for user data, allowing users to manage their profiles seamlessly.

- **Password Hashing**: Implements secure password storage using bcrypt, ensuring user passwords are never stored in plain text.

- **Dynamic Token Generation**: Automatically generates and assigns new JWT tokens whenever a user updates their profile, maintaining session integrity.

- **Customizable Configuration**: Easily configure the application to switch between storage options via environment variables.

- **Service Layer**: The API includes a service layer that functions similarly to an Object-Relational Mapping (ORM) system, allowing for abstraction in database operations. This makes it easier to manage data interactions regardless of whether MongoDB or JSON is used as the storage solution.

## Services and Utils->helpers Middlewares Features

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
   git clone https://github.com/yourusername/auth-api.git
   cd auth-api