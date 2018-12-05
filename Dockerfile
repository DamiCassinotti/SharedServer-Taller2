FROM node:8
RUN mkdir /app
ADD . /app
WORKDIR /app
RUN npm i
EXPOSE 80
CMD ["npm", "start"]
