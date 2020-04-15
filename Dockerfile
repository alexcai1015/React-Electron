FROM node:12.16.1-alpine as builder

WORKDIR /app

COPY . .

RUN npm install

ARG REACT_APP_API_KEY
ENV REACT_APP_API_KEY=$REACT_APP_API_KEY

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build

FROM openresty/openresty:alpine

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/nginx/nginx.conf /usr/local/openresty/nginx/conf/nginx.conf

COPY --from=builder /app/build .

EXPOSE 3030

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]