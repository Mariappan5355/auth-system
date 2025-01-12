
# React Auth System Frontend

This is the frontend for the authentication system built with React. It interacts with the backend API to provide user login and registration functionality.

## Prerequisites

Before running the application, ensure you have the following installed:

1. [Node.js](https://nodejs.org/) (LTS version recommended)
2. [npm](https://www.npmjs.com/) (Usually comes with Node.js)

## Installation

1. Navigate to the `auth-system-frontend` directory:

```bash
cd auth-system-frontend
```

2. Install the required dependencies:

```bash
npm install
```

## Running the Application

Once the dependencies are installed, run the following command to start the development server:

```bash
npm start
```

This will start the React development server, and you can access the frontend at `http://localhost:3000`.

## Features

- **Login Page**: Users can log in with predefined credentials (for testing purposes, use the seed users like `admin@example.com` and `user@example.com`).
- **Registration Page**: Users can register by providing their email, password, and role.
- **Dashboard**: After logging in, users are redirected to the dashboard, which displays user-specific information.

## Environment Variables

You can modify or add environment variables in the `.env` file for the following configuration:

- **REACT_APP_API_URL**: Set the URL for the backend API (default is `http://localhost:5000`).

Example `.env`:

```
REACT_APP_API_URL=http://localhost:5000
```


## Build for Production

To create a production-ready build of the application, use the following command:

```bash
npm run build
```

This will create an optimized build of the application inside the `build/` directory.

## Additional Notes

- The frontend interacts with the backend API, which must be running for the authentication functionality to work.
- Ensure that the backend API is correctly set up with the necessary seed users for testing.
- The React app is set up with basic routing for login and dashboard pages.

