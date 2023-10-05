FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the entire project to the working directory
COPY . .

# Install Node.js and npm
RUN apt-get update && apt-get install -y nodejs npm

RUN npm install

RUN npm install -g @quasar/cli

RUN npm install axios

# Expose the port the app runs on
EXPOSE 9000