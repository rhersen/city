install:	pull /opt/nginx/secure/city/asset-manifest.json

pull:
	git pull

/opt/nginx/secure/city/asset-manifest.json:	src/App.js
	rm -Rf /opt/nginx/secure/city/*
	npm run build
	cp -R build/* /opt/nginx/secure/city/
