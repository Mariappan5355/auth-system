# Use Node.js base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./

# Install dependencies before copying the full application code
RUN npm install

# Install TypeScript globally
RUN npm install -g typescript

# Copy the application code (after dependencies)
COPY . .

# Compile TypeScript code to JavaScript
RUN npx tsc

# Expose the backend port (adjust if not 5000)
EXPOSE 5000

# Start the compiled JavaScript file (ensure the server file is compiled into dist/)
CMD ["node", "dist/server.js"]
