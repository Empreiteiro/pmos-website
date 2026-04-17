# PMOS — marketing site
# Quick reference for local development.

PORT ?= 3233
NODE_BIN := node_modules/.bin

.DEFAULT_GOAL := help

.PHONY: help
help: ## Show this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)
	@echo

.PHONY: install
install: ## Install npm dependencies
	npm install

.PHONY: init
init: install ## First-time setup (install deps, then run dev)
	@echo "\n✓ PMOS website ready. Starting dev server on http://localhost:$(PORT)\n"
	@$(MAKE) dev

.PHONY: dev
dev: node_modules ## Run the dev server (http://localhost:$(PORT))
	npx next dev -p $(PORT)

.PHONY: build
build: node_modules ## Build the production bundle
	npm run build

.PHONY: start
start: node_modules ## Start the production server (http://localhost:$(PORT))
	npx next start -p $(PORT)

.PHONY: lint
lint: node_modules ## Run ESLint
	npm run lint

.PHONY: typecheck
typecheck: node_modules ## Type-check the project
	npx tsc --noEmit

.PHONY: check
check: lint typecheck ## Run lint + typecheck

.PHONY: clean
clean: ## Remove build artifacts
	rm -rf .next out

.PHONY: reset
reset: clean ## Remove build artifacts and node_modules
	rm -rf node_modules

# Ensure dependencies exist before running any target that needs them.
node_modules: package.json package-lock.json
	npm install
	@touch node_modules
