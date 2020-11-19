# Use Node LTS 14
FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
RUN npm ci --only=production
RUN npm install --production

# Bundle app source
COPY ./src ./src

# Expose port 8080
EXPOSE 8080
ENV NODE_ENV production
CMD [ "npm", "start" ]