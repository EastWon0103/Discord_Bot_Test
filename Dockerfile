# Dockerfile
FROM node:18.11.0

RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app/

RUN npm install
COPY index.js README.md deploy-commands.js /app/
RUN mkdir -p /commands
COPY ./commands /app/commands
CMD ["node", "./deploy-commands.js"]
CMD ["node", "./index.js"]