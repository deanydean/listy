ready-dev:
	docker-compose build
	docker-compose up -d
	@echo "Run 'make db-ip' to get the DB_URI, backend, environment variable."

db-ip:
	@echo "Set DB_URI in ./backend/.env as: mongodb://$(shell docker inspect test | grep Gateway | grep -Po "(?:[0-9]{1,3}\.){3}[0-9]{1,3}"):27017/mongodb"

test:
	npm run test

	
test-coverage:
	npm run test:coverage
	