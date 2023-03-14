FROM node:18.14.0-alpine AS builder
LABEL org.opencontainers.image.authors="contact@libertech.fr"

ENV NODE_OPTIONS=--openssl-legacy-provider

WORKDIR /usr/src/app

COPY . .

# Install dependencies
# @see https://github.com/gliderlabs/docker-alpine/blob/master/docs/usage.md#disabling-cache
# @see https://pkgs.alpinelinux.org/packages
RUN apk add --update-cache \
  git \
  jq \
  nano \
  vim \
  bash \
  bash-completion \
  iputils-ping \
  inetutils-telnet \
  && rm -rf /var/cache/apk/*

RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false \
  && yarn cache clean --force

RUN yarn run build
