install:	pull /opt/nginx/secure/city/asset-manifest.json

pull:
	git pull

/opt/nginx/secure/city/asset-manifest.json:	src/App.js
	npm run build
	rm -Rf /opt/nginx/secure/city/*
	cp -R build/* /opt/nginx/secure/city/
