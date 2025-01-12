# Full-Stack Authentication System

## Project Overview
This is a full-stack authentication system built with Express, Sequelize, TypeScript, and MySQL. It supports user registration, login, password reset, JWT authentication, and role-based access control.

## Requirements
- Node.js
- MySQL database
- TypeScript

## Setup Instructions
1. Clone the repository.
2. Install dependencies: `npm install`
3. Create a `.env` file based on the provided `.env.example`.
4. Run database migrations.
5. Start the server: `npm run dev`

## API Documentation
### Register
POST `/api/auth/register`

### Login
POST `/api/auth/login`

### Admin - Get Users
GET `/api/admin/users` (Requires authentication)

### Admin - Modify User Role
PUT `/api/admin/modify-role` (Requires authentication)
