FROM node:18

WORKDIR /usr/src/app

# sí se va a trabajar en local no se necesita el COPY para copiar los archivos
COPY . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

# npm start is the command to start the application in development mode
CMD ["npm", "run", "dev"]

# Create image:
# docker build -f ./dev.Dockerfile -t myapp-backend-dev .
# Execute image with local files mounted:
# docker run -p 3003:3003 -v "$(pwd):/usr/src/app/" myapp-backend-dev
# docker run -p 3003:3003 myapp-backend-dev
# browse http://localhost:3003/api/users
# kill container: docker container ls && docker container kill <container_id>