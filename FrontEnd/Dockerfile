FROM node:alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install 

COPY . .

RUN npm run build

FROM caddy:2

COPY --from=build /app/dist/front-end/browser /var/www/html

COPY Caddyfile /etc/caddy/Caddyfile