# FROM node:22-alpine as build
# WORKDIR /usr/local/app
# COPY ./ /usr/local/app/
# RUN npm install
# RUN npm run build

# FROM nginx:1.27.4
# COPY --from=build /usr/local/app/dist/feature-toggle-app /usr/share/nginx/html
# EXPOSE 80

# FROM node:22.14-alpine3.20 AS build
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# FROM busybox:1.30 AS runner
# WORKDIR /app
# COPY --from=build /app/dist .
# CMD ["busybox", "httpd", "-f", "-v", "-p", "8080"]


FROM node:22-alpine3.20 AS build
WORKDIR /app
# COPY package.json package-lock.json ./
# COPY tsconfig.base.json tsconfig.json ./
COPY ./ ./

ENV VITE_WEBSOCKET_SERVER_URL=http://localhost:4000

RUN npm install
RUN npm run build
# RUN npm run start:frontend

# FROM nginx:stable-alpine AS production
# COPY --from=build /app/nginx /etc/nginx/conf.d
# COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 3000

# ENTRYPOINT ["nginx", "-g", "daemon off;"]
CMD ["npm", "run", "start:frontend"]