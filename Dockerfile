FROM node:12.19-slim

WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/
RUN npm ci --loglevel info

COPY src /app/src
COPY .eslintrc.js .prettierrc nest-cli.json tsconfig.build.json tsconfig.json /app/
RUN npm run build

COPY .env.default /app/

ARG VERSION
ENV VERSION=$VERSION
ARG VERSION_BUILD
ENV VERSION_BUILD=$VERSION_BUILD

EXPOSE 8080

CMD ["node", "dist/index.js"]
