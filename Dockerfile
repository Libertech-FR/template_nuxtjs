FROM node:18.14.0-alpine AS builder

ENV NODE_OPTIONS=--openssl-legacy-provider

WORKDIR /usr/src/app

COPY . .

RUN apk add \
  git \
  jq \
  nano

RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

RUN yarn run build