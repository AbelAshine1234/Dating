FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json separately to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application source code
COPY . .

# Expose port 4000
EXPOSE 4000

# Use nodemon for development hot-reloading (make sure it's installed)
CMD ["npm", "run", "dev"]
