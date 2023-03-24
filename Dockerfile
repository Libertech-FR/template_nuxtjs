FROM node:18.14.0-alpine
LABEL org.opencontainers.image.authors="contact@libertech.fr"

ENV NODE_OPTIONS=--openssl-legacy-provider

WORKDIR /usr/src/app

# Install dependencies
# @see https://github.com/gliderlabs/docker-alpine/blob/master/docs/usage.md#disabling-cache
# @see https://pkgs.alpinelinux.org/packages
RUN apk update && apk --no-cache upgrade && apk add --no-cache \
  git \
  jq \
  nano \
  vim \
  curl \
  bash \
  bash-completion \
  iputils \
  inetutils-telnet \
  bind-tools \
  net-tools \
  tcpdump

COPY . .

RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false \
  && yarn cache clean --force

EXPOSE 3000

CMD ["yarn", "start:prod"]
