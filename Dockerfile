FROM --platform=linux/arm64 node:18-alpine

WORKDIR /build

RUN npm install -g serve

COPY build build

EXPOSE 3000

CMD ["serve", "-s", "build"]