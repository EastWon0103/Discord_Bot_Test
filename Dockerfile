# Dockerfile
FROM node:18.11.0

RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app/

RUN npm install
COPY *.js /app/
CMD ["node", "./deploy-commands.js"]
CMD ["node", "./index.js"]