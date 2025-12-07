FROM node:trixie AS builder

WORKDIR /build
ADD ./package.json ./
ADD ./src ./src
ADD ./tests ./tests
ADD ./.eslintrc.js ./

RUN npm install

ENV NODE_OPTIONS="--openssl-legacy-provider"
RUN npm run build

FROM nginx:latest

COPY --from=builder /build/dist /usr/share/nginx/html
