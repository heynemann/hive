run:
	@cd src/ && node app.js

test:
	@echo "running tests..."
	@cd src/test && expresso

setup:
	@echo "Installing Requirements to Hive"
	@cat requirements.txt | xargs npm install