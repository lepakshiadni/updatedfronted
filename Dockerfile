# Use Node.js as base image
FROM node:alpine3.18 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build

# Display the contents of /app/build
RUN ls -al /app/build

# Stage 2: Serve the React app with a lightweight HTTP server
FROM nginx:1.23-alpine

# Copy the built app from the previous stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
