## Description

[Nuxt](https://github.com/nestjs/nest) framework starter repository.

## Installation

```bash
$ make build
$ make exec
yarn install
```

## Running the app

Dupliquer le .env.exemple puis supprimer la partie .exemple
Remplir ensuite les variables

Remplir les variables dans le Makefile

```bash
#Pour lancer l'application :
make dev

#Pour ajouter une dépendance au projet :
make exec
yarn 'nom de la dependance'
```

Le compte ldap par default est dc@ab.com/test

## Documentations
[Nuxt](https://nuxtjs.org/docs/get-started/directory-structure#the-nuxtconfigjs-file)

[VueJS](https://vuejs.org/guide/introduction.html)

[Vuetify](https://vuetifyjs.com/en/labs/introduction/#header/)

## Mise en production

- Créer un dossier ui dans le quel il y a un fichier Dockerfile du front ainsi que le .env
- Créer un dossier api dans le quel il y a le .env du back
- Dans le .env du back, remplir les données relatives au ldap
- Dans /ui/.env, changer la variable APP_BASE_URL en mettant le nom du conteneur exemple.api et son port
- Modifier ce docker-compose pour que les noms de services/images soient cohérents 

```yml
version: '3'
services:
  exemple.ui:
    container_name: exemple.ui
    build: ./ui/
    restart: always
    volumes:
      - ./ui/.env:/usr/src/app/.env
    environment:
      - NODE_TLS_REJECT_UNAUTHORIZED=0
    ports:
      - 3000:3000
    networks:
      - exemple

  exemple.api:
    container_name: exemple.api
    image: ghcr.io/libertech-fr/exemple.service:latest
    restart: always
    volumes:
      - ./api/.env:/usr/src/app/.env
    environment:
      - NODE_TLS_REJECT_UNAUTHORIZED=0
    ports:
      - 4000:4000
    networks:
      - exemple
      - reverse

  exemple.mongodb:
    container_name: exemple.mongodb
    image: mongo:5.0
    command: --wiredTigerCacheSizeGB 1.5
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - ./mongo:/data/db
    networks:
      - exemple

  exemple.redis:
    container_name: exemple.redis
    image: redis:7.0
    restart: always
    networks:
      - exemple

networks:
  exemple:
  reverse:
    external: true
```


