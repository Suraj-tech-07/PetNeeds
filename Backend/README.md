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
