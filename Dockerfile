FROM node:25.9.0-bookworm

WORKDIR /dist

RUN npm install -g serve

COPY dist dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
