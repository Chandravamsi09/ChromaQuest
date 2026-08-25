# Use official Node.js runtime as parent image
FROM node:20-alpine

# Set working directory in container
WORKDIR /app

# Copy package manifests
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application source code
COPY . .

# Expose server port
EXPOSE 3000

# Set environment variable
ENV PORT=3000

# Run static web server
CMD ["npm", "start"]
