FROM node:9.4
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install && npm update
COPY . /app
EXPOSE 5000
CMD ["npm","start"]