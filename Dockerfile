FROM node:18-bullseye

WORKDIR /build

RUN npm install -g serve

COPY dist build

EXPOSE 3000

CMD ["serve", "-s", "build"]
