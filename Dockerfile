FROM node:18-bullseye AS builder

RUN npm install -g serve

FROM --platform=linux/arm/v7 node:18-bullseye

COPY --from=builder /usr/local /usr/local

WORKDIR /build
COPY build build
EXPOSE 3000

CMD ["serve", "-s", "build"]
