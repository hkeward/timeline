FROM node:stretch AS builder

WORKDIR /build
ADD ./package.json ./
ADD ./src ./src
ADD ./tests ./tests
ADD ./.eslintrc.js ./

RUN npm install

RUN npm run build

FROM node:stretch-slim
COPY --from=builder /build/dist /dist

RUN npm install --global serve

ENTRYPOINT ["serve", "-l", "1970", "dist"]
