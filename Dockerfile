FROM node:16-alpine

# Create app directory
WORKDIR /app
# Install app dependencies

COPY package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
COPY . .

# STAGE 2
# Build the react app

RUN npm run build

EXPOSE 5173
CMD ["npm", "run", "dev"]