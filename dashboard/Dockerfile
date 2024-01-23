FROM node:latest

WORKDIR /usr/bin/app    
COPY ./package.json /usr/bin/app/
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "dev" ]