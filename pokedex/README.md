<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Environment variables required to run the application

| Environment variable | Description |
| -------------------- | ----------- |
| `NODE_ENV` | Node environment. In this mode, four values are supported: `development`, `development-docker`, `production`, `production-docker`. For `development`, file `.env.development` is loaded. For `production`, file `.env.production` is loaded |
| `MONGODB_URL` | URI to the MongoDB database of your application. Must be a valid MongoDB URI |
| `PORT` | Port where the application will be deployed to. Defaults to `3000` if not specified |
| `POKEMON_SEED_API` | API used to fetch the pokemon data. Recommended value is `https://pokeapi.co/api/v2/pokemon` |
| `POKEMON_SEED_LIMIT` | Amount of pokemon objects fetched from `POKEMON_SEED_API`. Defaults to `30` if not specified |

## Running the project

### Using `node.js` installed in your computer

1. Verify that you are running version 16 of `node.js` or a superior one
2. Create a `pokedex/env/.env.<node-env>` environment file that matches the structure below. `<node-env>` is a dynamic value injected from `process.env.NODE_ENV`, which can be either `development` or `production`

```env
NODE_ENV=<node-environment>
MONGODB_URL=<your-mongodb-url>
PORT=<application-port>
POKEMON_SEED_API=<pokemon-seed-api-url>
POKEMON_SEED_LIMIT=<pokemon-seed-limit>
```

> Please refer to the `pokedex/env/.env.template` file to know how to define your `.env` files

### Using `docker` and `docker-compose`

1. Verify that your system has `docker` and `docker-compose` installed
2. Clone the repository
3. Create a `secrets/docker/pokedex/mongodb-url.txt` filepath from the root of the project
4. Inside the file, store a text string with a value of `mongodb://pokedex-mongodb:27017/<your-database-name>`. The reason for the database URL being a secret instead of a public environment variable is in case it implements sensible credentials in the future
5. Define environment values for `PORT`, `POKEMON_SEED_API`, and `POKEMON_SEED_LIMIT` either in `docker-compose.yaml` for the *production* version of in `docker-compose.dev.taml` for the *development* version
6. Run the *production* version of the application with command

```bash
docker-compose up
```

7. Run the *development* version of the application with command

```bash
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up
```

> Change the image tags for `rodarte/nestjs-fr-pokedex-prod` and `rodarte/nestjs-fr-pokedex-dev` to valid tags found either in the [production](https://hub.docker.com/repository/docker/rodarte/nestjs-fr-pokedex-prod) and [development](https://hub.docker.com/repository/docker/rodarte/nestjs-fr-pokedex-dev) DockerHub repos, or in images that you built locally using the provided `Dockerfile`

## Populating the database

1. Make sure that you have a stable internet connection available
2. Hit the `GET /seed` endpoint from a browser or a utility like Postman
3. If you get back a simple `Seed executed. <limit> records saved to the database.` string token as result, data should have been populated into the database
