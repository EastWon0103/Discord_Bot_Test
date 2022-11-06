FROM node:18.11.0

RUN mkdir -p /app
WORKDIR /app
EXPOSE 3000
CMD ["node", "./index.js"]