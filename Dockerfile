ARG NODE_VERSION=18.14.2

FROM node:${NODE_VERSION}-slim as base

ENV NODE_ENV=development

WORKDIR /app

FROM base as build

COPY --link package*.json ./
RUN npm install

FROM base

COPY --from=build /app/node_modules /app/node_modules

CMD [ "npm", "run", "dev" ]