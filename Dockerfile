FROM node:20 as build


WORKDIR /App
COPY ./package.json ./yarn.lock ./
RUN yarn install
RUN npx update-browserslist-db@latest

WORKDIR /App

COPY . /App
ARG REACT_APP_API
ARG PUBLIC_URL
RUN yarn build

FROM php:8.3-apache
ARG UID
ARG GID
RUN groupadd -g ${UID} httpd
RUN useradd httpd -m -u ${UID} -g ${GID}
RUN a2enmod rewrite

COPY --from=build /App/build /var/www/html/cacao
COPY .htaccess /var/www/html/cacao
COPY .htaccess /var/www/html
USER httpd
