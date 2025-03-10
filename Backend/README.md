# PetNeeds Backend

## Description
This is the backend for the PetNeeds application. It is built using Node.js, Express, and MongoDB.

## Setup

### Prerequisites
- Node.js
- MongoDB

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the backend directory:
   ```bash
   cd PetNeeds/Backend
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Configuration
1. Create a `.env` file in the `Backend` directory and add the following environment variables:
   ```properties
   PORT=4000
   DB_CONNECT=mongodb://0.0.0.0/PetNeeds
   JWT_SECRET=your_jwt_secret
   ```

### Running the Application
1. Start the server:
   ```bash
   node server.js
   ```
2. The server will be running on `http://localhost:4000`.

## API Endpoints

### User Routes
- `POST /users/register` - Register a new user
- `POST /users/login` - Login a user

## Models

### User Model
- `fullname.firstName` - First name of the user (required, minimum 3 characters)
- `fullname.lastName` - Last name of the user (required, minimum 3 characters)
- `email` - Email of the user (required, unique, minimum 3 characters)
- `password` - Password of the user (required, not selected by default)

## License
This project is licensed under the MIT License.


### User Registration

- **Endpoint:** `/users/register`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "password": "yourpassword"
    }
    ```

     **Response:**
    ```json
    {
        "token": "jwt_token",
        "user": {
            "_id": "user_id",
            "fullname": {
                "firstname": "John",
                "lastname": "Doe"
            },
            "email": "john.doe@example.com"
        }
    }
    ```

## Middleware

### Authentication Middleware

 **File:** `middlewares/user.middleware.js`
- **Function:** `authUser`
- **Description:** This middleware checks if the user is authenticated by verifying the JWT token and checking if it is blacklisted.

## Models

### User Model

- **File:** `moduls/user.model.js`
- **Schema:**
    ```javascript
    const userSchema = new mongoose.Schema({
        fullname: {
            firstName: {
                type: String,
                required: true,
                minlength: [3, 'First name must be at least 3 characters']
            },
             lastName: {
                type: String,
                required: true,
                minlength: [3, 'Last name must be at least 3 characters']
            }
        },
        email: {
            type: String,
            required: true,
            unique: true,
            minlength: [3, 'Email must be at least 3 characters']
        },
         password: {
            type: String,
            required: true,
            select: false
        }
    });
    ```

    ### Blacklist Token Model

- **File:** `moduls/blacklistToken.model.js`
- **Schema:**
    ```javascript
    const blackListTokenSchema = new mongoose.Schema({
        token: { 
            type: String, 
            required: true, 
            unique: true 
        },
        createdAt : { 
            type: Date, 
            default: Date.now,
            expires: 86400
        }
    });
    ```

## Services

### User Service

**File:** `services/user.service.js`
- **Function:** `createUser`
- **Description:** This function creates a new user in the database after validating the required fields.

## Controllers

### User Controller

- **File:** `controller/user.controller.js`
- **Function:** `registerUser`
- **Description:** This function handles user registration, including validation, password hashing, and token generation.

## Routes

### User Routes

- **File:** `routes/user.routes.js`
- **Endpoint:** `/users/register`
- **Method:** `POST`
**Description:** This route handles user registration with validation using `express-validator`.