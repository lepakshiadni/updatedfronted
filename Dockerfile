# Use an official Node.js runtime as the base image
FROM node:alpine3.18 AS build 

ARG REACT-APP-BASEURL
ARG BACKEND_URL 

ARG REACT-APP-BASEURL=REACT-APP-BASEURL
ARG BACKEND_URL=BACKEND_URL  
# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build
#--------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>--------------------------------->>>>>>>>>>>>>>>> 
# Use a second stage for the production environment
FROM nginx:1.23-alpine

# Remove the default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx configuration file with custom filename
COPY custom.conf /etc/nginx/nginx.conf

# Expose port 80 to the outside world
EXPOSE 80


# FROM nginx:1.23-alpine 
# WORKDIR /usr/share/nginx/html 
# RUN rm -rf * 
# COPY --from=build /app/build .
# EXPOSE 80 
ENTRYPOINT ["nginx", "-g", "daemon off;" ]
