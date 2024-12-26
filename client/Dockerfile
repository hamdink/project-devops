# Use the official Node.js image as the base image
FROM node:18.17-alpine

ENV PORT=3001

# Set the working directory
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the production version of the application
RUN npm run build

# Set the command to start the application
CMD ["npm", "run","start"]