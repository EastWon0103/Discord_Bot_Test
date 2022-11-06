FROM node:18.11.0

RUN mkdir -p /app
WORKDIR /app
EXPOSE 3000
CMD ["node", "./deploy-commands.js"]
CMD ["node", "./index.js"]