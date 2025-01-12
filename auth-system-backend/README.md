# Backend Setup for Auth System

This repository contains the backend of an authentication system powered by Node.js with a MySQL database and using Sequelize ORM for database interaction.

## Prerequisites

Before running the application, ensure you have the following installed:

1. [Node.js](https://nodejs.org/)
2. [MySQL](https://www.mysql.com/)
3. [npm](https://www.npmjs.com/)

## Backend Folder Structure

```
auth-system-backend/     # Node.js Backend
├── config/             # Database configuration
├── controllers/        # API logic
├── models/            # Sequelize models
├── routes/            # Express routes
├── seeders/           # Seed data
├── .env               # Environment variables
├── server.js          # Entry point for the server
├── package.json       # Project dependencies
```

## Setup Instructions

### Step 1: Clone the Repository
```bash
git clone <repository_url>
cd auth-system-backend
```

### Step 2: Install Dependencies
Install the necessary packages for the backend:
```bash
npm install
```

### Step 3: Configure Database
1. Create a `.env` file in the root of the `auth-system-backend/` directory.
2. Add the following configuration for your MySQL database (modify according to your setup):
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=auth_system_db
JWT_SECRET=yourjwtsecret
```

### Step 4: Run Migrations
Sequelize is used to manage the database schema. Run the following command to apply migrations and create the necessary tables:
```bash
npx sequelize-cli db:migrate
```

### Step 5: Run Seeders
To insert seed data (users), run the following command:
```bash
npx sequelize-cli db:seed:all
```

This will insert two seed users into the database:
* **Admin User**:
   * Name: `Admin`
   * Email: `admin@example.com`
   * Password: `password` (hashed)
   * Role: `admin`
* **Regular User**:
   * Name: `User`
   * Email: `user@example.com`
   * Password: `password` (hashed)
   * Role: `user`

These users can be used to log in to the application for testing purposes.

### Step 6: Start the Backend Server
Run the following command to start the backend server:
```bash
npm run dev
```

The backend API will now be running at `http://localhost:5000`.

### Step 7: Stop the Backend Server
To stop the backend server, press `Ctrl+C` in the terminal.

## Notes
* Modify environment variables in the `.env` file as needed
* Ensure MySQL is running and accessible on the specified host and port
* Ensure no other services are using port `5000` on your machine before starting the server
* 


### Step 8: API Documentation with Swagger
You can access the API documentation via Swagger at:

http://localhost:5000/api-docs#/

