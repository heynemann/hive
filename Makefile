run:
	@cd src/ && node dev_server.js

test:
	@echo "running tests..."
	@cd src && expresso

setup:
	@echo "Installing Requirements to Hive"
	@cat requirements.txt | xargs npm install