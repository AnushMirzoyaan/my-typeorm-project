# Use a base image with Node.js
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code to the container (excluding the node_modules and .dockerignore)
COPY . .

# # Build TypeScript code to JavaScript (compiles all .ts files to .js)
RUN npm install typescript -g

RUN tsc

# # Expose the port that the Node.js application will listen on
EXPOSE 3000

# # Command to start the Node.js application
CMD ["node", "dist/index.js"]
