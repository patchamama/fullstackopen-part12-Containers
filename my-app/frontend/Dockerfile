# The first FROM is now a stage called build-stage
FROM node:19 AS build-stage
WORKDIR /usr/src/app

COPY . .

RUN npm ci

# Run tests in the intermediate testing stage
# RUN CI=true npm test

ENV REACT_APP_BACKEND_URL=http://localhost:3003

RUN npm run build

# RUN npm install -g serve
# CMD ["serve", "build", "-n"]

# This is a new stage, everything before this is gone, except the files we want to COPY

FROM nginx:1.20-alpine
# COPY the directory build from build-stage to /usr/share/nginx/html
# The target location here was found from the Docker hub page

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html

# docker build -t myapp-frontend-prod .
# docker run -p 8080:80 myapp-frontend-prod
# browse http://localhost:8080
# kill container: docker container ls && docker container kill <container_id>