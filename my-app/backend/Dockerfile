FROM node:18
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

# ENV DEBUG=backend:*
  
USER node
CMD npm start

# docker build -t myapp-backend-prod .
# docker run -p 3003:3003 myapp-backend-prod
# browse http://localhost:3003/api/users
# kill container: docker container ls && docker container kill <container_id>