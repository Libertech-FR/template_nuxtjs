DOCKERIMAGE?=exemple.front
APPNAME?=exemple.front
PORT?=3555

.DEFAULT_GOAL := help
help:
	@printf "\033[33mUsage:\033[0m\n  make [target] [arg=\"val\"...]\n\n\033[33mTargets:\033[0m\n"
	@grep -E '^[-a-zA-Z0-9_\.\/]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[32m%-15s\033[0m %s\n", $$1, $$2}'

dev: ## Démarre une image de développement
	docker run -it --rm \
		-v $(CURDIR):/usr/src/app \
		-e CHOKIDAR_USEPOLLING=true \
		--name $(APPNAME) \
		-p $(PORT):3000 \
		--network dev \
		--add-host host.docker.internal:host-gateway \
		$(DOCKERIMAGE) yarn dev

start-prod: ## Démarre une image de production
	docker run -it --rm \
		-v $(CURDIR):/usr/src/app \
		-e CHOKIDAR_USEPOLLING=true \
		--name $(APPNAME) \
		-p $(PORT):3000 \
		--network dev \
		--add-host host.docker.internal:host-gateway \
		$(DOCKERIMAGE) yarn start:prod

generate: ## Génère une image de développement
	docker run -it --rm \
		-v $(CURDIR):/usr/src/app \
		-e CHOKIDAR_USEPOLLING=true \
		-p $(PORT):3000 \
		$(DOCKERIMAGE) yarn generate

yarnbuild: ## Build une image de production
	docker run --rm \
		-v $(CURDIR):/usr/src/app \
		--name $(APPNAME) \
		-p $(PORT):3000 \
		$(DOCKERIMAGE) yarn build

start: ## Démarre une image de développement
	docker run --rm \
		-v $(CURDIR):/usr/src/app \
		--name $(APPNAME) \
		-p $(PORT):3000 \
		$(DOCKERIMAGE) yarn start

stop:
	docker stop $(APPNAME)

startprod: ## Démarre une image de développement
	docker run -it --rm \
		-v $(CURDIR)/.env:/usr/src/app/.env \
		--name $(APPNAME) \
		-p $(PORT):3000 \
		$(DOCKERIMAGE):latest

exec: ## Démarre une image de développement
	docker run -it --rm \
		-v $(CURDIR):/usr/src/app \
		$(DOCKERIMAGE) bash

build: ## Fabrique le conteneur de pré-production
	docker build -t $(DOCKERIMAGE):latest .

bundle: ## Fabrique le conteneur en production
	docker build -t $(DOCKERIMAGE):stable .

push: ## Pousse les images Docker de l'application sur le registry
	docker push $(DOCKERIMAGE)
	docker push $(DOCKERIMAGE):stable
