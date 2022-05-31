balloonpop.js: ./src/*.ts
	tsc
	tsc --module amd --outFile ./balloonpop.js ./src/*.ts

all: balloonpop.js

clean:
	rm balloonpop.js