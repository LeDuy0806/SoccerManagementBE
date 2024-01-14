# NodeJS Version 18
FROM node:18.16.0-alpine3.17

# Copy Dir
COPY . ./app

# Work to Dir
WORKDIR /app

# Install Node Package
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 8080

# Cmd script
CMD ["npm", "run", "dev"]
