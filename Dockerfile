FROM node:latest
WORKDIR /usr/app
COPY package.json .
COPY . .
RUN npm install
RUN npm run build
RUN ls
EXPOSE 3333
CMD ["npm", "run", "start"]
