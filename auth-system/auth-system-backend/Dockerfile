# Use Node.js base image
FROM node:18

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

RUN npm install -g ts-node

# Copy the application code
COPY . .

# Expose the backend port (adjust if not 5000)
EXPOSE 5000

# Start the application
CMD ["ts-node", "src/server.ts"]
