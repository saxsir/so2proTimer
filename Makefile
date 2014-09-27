NPM=$(shell which npm)
GRUNT=$(shell pwd)/node_modules/grunt-cli/bin/grunt

setup:
	$(NPM) install

install: setup
	$(GRUNT) install

build:
	$(GRUNT) build

watch:
	$(GRUNT)
