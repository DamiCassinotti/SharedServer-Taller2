FROM node:8
RUN mkdir docker-entrypoint-initdb.d
COPY db/scripts/login.sql /docker-entrypoint-initdb.d/
RUN mkdir /app
ADD . /app
WORKDIR /app
RUN npm i
EXPOSE 80
CMD ["npm", "start"]
