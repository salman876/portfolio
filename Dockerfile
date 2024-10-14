# Setup base image with node
FROM node:20-alpine3.19 AS node_base

# Setup builder from base image
FROM node_base AS builder

# Copy over only package.json & yarn.lock files to utilize docker layer caching
COPY package.json yarn.lock ./

# Copy over config files
COPY tsconfig.json tsconfig.node.json vite.config.ts ./

# Install all dependencies
RUN yarn install --frozen-lockfile

# Copy over source code files
COPY public ./public
COPY src ./src
COPY index.html ./

# Copy over envs files
COPY .env ./

# Build the application
RUN yarn build

# Only contain compiled dist files used to run the app
FROM openresty/openresty:1.25.3.1-3-alpine-fat AS server

# Copy files from builder
COPY nginx.conf /usr/local/openresty/nginx/conf/nginx.conf

WORKDIR /usr/share/nginx/html
COPY --from=builder /dist .

EXPOSE 3000

ENTRYPOINT ["nginx","-g","daemon off;"]