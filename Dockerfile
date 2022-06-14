FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
COPY yarn*.* ./
RUN yarn install
 
FROM node:16-alpine
WORKDIR /app
COPY --from=0 /app/ .
COPY ./ .
RUN npm run build
 
FROM nginx:1.19
RUN mkdir /app
COPY --from=1 /app/build /app
COPY ./nginx.conf /etc/nginx/nginx.conf