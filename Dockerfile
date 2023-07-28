FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install typescript -g

RUN tsc

EXPOSE 3000

CMD ["node", "dist/index.js"]
