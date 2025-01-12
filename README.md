
# Auth System Setup

This repository contains a full-stack authentication system consisting of a frontend built with React and a backend powered by Node.js with a MySQL database.

## Prerequisites

Before running the application, ensure you have the following installed:

1. [Docker](https://www.docker.com/)
2. [Docker Compose](https://docs.docker.com/compose/)

## Folder Structure

```
project-root/
├── auth-system-frontend/   # React Frontend
├── auth-system-backend/    # Node.js Backend
├── docker-compose.yml      # Docker Compose Configuration
```

## Setup Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/Mariappan5355/auth-system.git
cd auth-system
```

### Step 2: Build and Start the Containers

Run the following command to build and start the containers:

```bash
docker-compose up --build
```

This will build and start the following services:

- **Frontend**: React application accessible at `http://localhost:3000`
- **Backend**: Node.js API accessible at `http://localhost:5000`
- **Database**: MySQL database accessible on port `3307`

### Step 3: Run Migrations and Seeders

After the containers are up, connect to the backend container and run the migrations and seeders:

1. **Access the Backend Container**

```bash
docker exec -it <backend-container-name> bash
```

Replace `<backend-container-name>` with the actual name of your backend container (e.g., `auth-system-backend-1`). You can find it using:

```bash
docker ps
```

2. **Run Migrations**

Inside the backend container, run:

```bash
npx sequelize-cli db:migrate
```

3. **Run Seeders**

Inside the backend container, run:

```bash
npx sequelize-cli db:seed:all
```

This will insert two seed users into the database:

**1. Admin User**:
- Name: Admin
- Email: admin@example.com
- Password: password (hashed)
- Role: admin

**2. Regular User**:
- Name: User
- Email: user@example.com
- Password: password (hashed)
- Role: user
### Step 4: Verify the Application

- **Frontend**: Navigate to `http://localhost:3000` to access the application UI.
- **Backend**: Test API endpoints at `http://localhost:5000`.
- **Database**: Connect to the MySQL database using your preferred client.

### Step 5: Stop the Containers

To stop the containers, press `Ctrl+C` in the terminal running the `docker-compose` command or run:

```bash
docker-compose down
```

### Step 6: API Documentation with Swagger
You can access the API documentation via Swagger at:

http://localhost:5000/api-docs#/

### Notes

- Modify environment variables in `docker-compose.yml` as needed.
- Ensure no other services are using ports `3000`, `5000`, or `3307` on your machine before starting the containers.


