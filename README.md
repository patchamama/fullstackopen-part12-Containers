# Part 12. Containers

_https://fullstackopen.com/en/part12_

## a. Introduction to Containers

- [Exercises 12.1.](https://github.com/patchamama/fullstackopen-part12-Containers/commit/dad4bdbb9ccfbd8b101de6a05dd8b07a9b55b08e) | [Exercises 12.2.](https://github.com/patchamama/fullstackopen-part12-Containers/commit/7458b84f0eb9939d0cbdd6905415d7cb82f9bdd8) | [Exercises 12.3.](https://github.com/patchamama/fullstackopen-part12-Containers/commit/44f5502587a1e427ca34d37e66eabf55bc6ff0f9) | [Exercises 12.4.](https://github.com/patchamama/fullstackopen-part12-Containers/commit/45135ac26e3882ae91295fdece3ac1717557409f)

## b. Building and configuring enviroments

- [Exercises 12.5.](https://github.com/patchamama/fullstackopen-part12-Containers/commit/66b2409602f67154075f8049c9836fff84d775db) | [Exercises 12.6.](https://github.com/patchamama/fullstackopen-part12-Containers/commit/a98efb0b1cd0857e102bd927b8f9d3e260279a5f) | [Exercises 12.7.](https://github.com/patchamama/fullstackopen-part12-Containers/commit/53802821a552c02e1dcbbf125fe26e6d0856ed3d) | [Exercises 12.8.](https://github.com/patchamama/fullstackopen-part12-Containers/commit/7ffc1dca0fb7c056fca1359dd7fa2b15d25b1af5) | [Exercises 12.9.](https://github.com/patchamama/fullstackopen-part12-Containers/commit/b44364d2160a28dfcaf8385606ebfde9beca5aa2) | [Exercises 12.10.](https://github.com/patchamama/fullstackopen-part12-Containers/commit/702c2871ad148d13911c88de3f9e3e016809cff3) | [Exercises 12.11.](https://github.com/patchamama/fullstackopen-part12-Containers/commit/190ac89f4097815fbaea46eb8dc6cc3c4118b391) | [Exercises 12.12.](https://github.com/patchamama/fullstackopen-part12-Containers/commit/a78870217819d3faf46e0ba6e0aa2bc5bafdee32)

## c. Basics of Orchestration

- [Exercises 12.13.](https://github.com/patchamama/fullstackopen-part12-Containers/commit/9810b873450a1c5557e56ff6decf9eb1dc49d7c6) | [Exercises 12.14.](https://github.com/patchamama/fullstackopen-part12-Containers/commit/ac93749efa86feeeea95084b393107dab2af870f) | [Exercises 12.15.](https://github.com/patchamama/fullstackopen-part12-Containers/commit/7124c4b4eed72bebc09685cd0693b7e8ae3b9ddb) | [Exercises 12.16.](https://github.com/patchamama/fullstackopen-part12-Containers/commit/298c95ad09db9cb193673da2a6555007c9ecf60b) | [Exercises 12.17.](https://github.com/patchamama/fullstackopen-part12-Containers/commit/dd154fdbb75085d2ef4dc70f110f72f3bfc24b69) | [Exercises 12.18.](https://github.com/patchamama/fullstackopen-part12-Containers/commit/bab04b435a2a4e1d57934fc346f588197be187a0) | [Exercises 12.19.](https://github.com/patchamama/fullstackopen-part12-Containers/commit/ad8fd3d04e92ea40c55b91147c5ab78dc01f60c2) | [Exercises 12.20.](https://github.com/patchamama/fullstackopen-part12-Containers/commit/a392734c0948376b9aba155e0adfe344230bc499) | [Exercises 12.21.](https://github.com/patchamama/fullstackopen-part12-Containers/commit/171f0236d40756cb0ea6d29b0ec280a4669eae09) | [Exercises 12.22.](https://github.com/patchamama/fullstackopen-part12-Containers/commit/ad45eacbff02c13c77892dfbde321c7b980e3bd5)

## Some errors found and solutions:

- Error: Docker run fails "return process.dlopen(module, path.toNamespacedPath(filename));"
  solution: remove node_modules binary for macOsX and copy from container (linux) to host (macOsX), so
  when the volume is mounted, the node_modules will be replaced by the linux version

```sh
rm -rf ./backend/node_modules
# myapp-backend-dev is the container name created with libs compiled in node_modules
docker container cp myapp-backend-dev:/usr/src/app/node_modules ./backend
```

- If error sh: 1: react-scripts: not found... (libraries or apps not found in directory node_modules)

```sh
rm -rf ./frontend/node_modules
# myapp-frontend-dev is the container name created with libs compiled in node_modules
docker container cp myapp-frontend-dev:/usr/src/app/node_modules ./frontend
```

- While building a docker files i'm getting error executor failed running [/bin/sh -c npm install]: exit code: 1
  Solution: Use in the Dockerfile a version of higher version of node (19 or more), example:

```yaml
FROM node:19
```
