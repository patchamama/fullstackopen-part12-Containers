FROM node:19

WORKDIR /usr/src/app

# sí se va a trabajar en local no se necesita el COPY para copiar los archivos
COPY . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

# npm start is the command to start the application in development mode
CMD ["npm", "start"]

# Create image:
# docker build -f ./dev.Dockerfile -t myapp-frontend-dev .
# If you get an error like this: While building a docker files i'm getting error executor failed running [/bin/sh -c npm install]: exit code: 1
#   Increase node version in Dockerfile to 19 or higher
# If error: Docker run fails "return process.dlopen(module, path.toNamespacedPath(filename));"
#   rm -rf node_modules 
#   docker container cp myapp-frontend-dev:/usr/src/app/node_modules .
# Execute image with local files mounted:
#   docker run -p 3000:3000 -v "$(pwd):/usr/src/app/" myapp-frontend-dev
#   docker run -p 3000:3000 myapp-frontend-dev
# Open browser: http://localhost:3000
# kill container: docker container ls && docker container kill <container_id>