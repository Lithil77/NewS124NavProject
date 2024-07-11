FROM node:18-alpine

<<<<<<< HEAD
WORKDIR /app
=======
WORKDIR /usr/src/index/
>>>>>>> b9629baa6d12eff5d2ffed82bbd9569191ab1d84

COPY package*.json ./

RUN npm install

COPY . .

<<<<<<< HEAD
EXPOSE 3006

CMD [ "npm", "run", "start" ]
=======
EXPOSE 3000

CMD [ "npm", "start" ]
>>>>>>> b9629baa6d12eff5d2ffed82bbd9569191ab1d84
