FROM node:stretch AS builder

WORKDIR /build
ADD ./target/package.json ./
ADD ./target/src ./src
ADD ./target/tests ./tests
ADD ./target/.eslintrc.js ./

RUN npm install

RUN npm run build

FROM node:stretch-slim
COPY --from=builder /build/dist /dist

RUN npm install --global serve

ENTRYPOINT ["serve", "-l", "1970", "dist"]
