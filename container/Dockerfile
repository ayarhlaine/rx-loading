FROM node:12-alpine
# Install rx-loading
COPY package*.json ./
RUN npm install
COPY . .

CMD npm start
