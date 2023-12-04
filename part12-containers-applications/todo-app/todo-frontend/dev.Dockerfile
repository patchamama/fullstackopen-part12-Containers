FROM node:16

WORKDIR /usr/src/app

# sí se va a trabajar en local no se necesita el COPY para copiar los archivos
COPY . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

# npm start is the command to start the application in development mode
CMD ["npm", "start"]