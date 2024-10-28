<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
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
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Tech challenge for Amaris job interview.

## Project setup

```bash
$ npm install
```

## Important Paths
- [Database config](src/config/orm.option.ts)
- [PokeAPI Module](src/services/pokeapi)
- [Pokemon Module](src/modules/pokemon)
- [Dockerfile](Dockerfile)
- [Docker-compose](docker-compose.yml)

## Deployment

```bash
# docker deploys a database and the backend
$ docker compose up -d
```

## Request && Response OK
```bash
curl -X PUT 'localhost:3000/pokemon' \
  --header 'Content-Type: application/json' \
  --data-raw $'{
  "name": "pikachu",
  "color": "yellow",
  "usesPokeball": true
}'

201 Created
{
  "color": "yellow",
  "usesPokeball": true,
  "name": "pikachu",
  "height": 4,
  "weight": 60,
  "type": "electric",
  "id": "a3fcf74a-db52-419a-b230-f319de58733e"
}

MariaDB [amaris]> select * from pokemon;
+--------------------------------------+---------+--------+--------------+--------+--------+----------+
| id                                   | name    | color  | usesPokeball | height | weight | type     |
+--------------------------------------+---------+--------+--------------+--------+--------+----------+
| 1da5b432-00e7-4295-8470-798c0d04f245 | pikachu | yellow |            1 |      4 |     60 | electric |
+--------------------------------------+---------+--------+--------------+--------+--------+----------+
1 row in set (0,001 sec)
```

## Request NOK && Response NOK
```bash
curl -X PUT 'localhost:3000/pokemon' \
  --header 'Content-Type: application/json' \
  --data-raw $'{
  "name": "tanos"
}'

400 Bad Request
{
  "message": [
    "color must be a string",
    "color should not be empty",
    "usesPokeball must be a boolean value",
    "usesPokeball should not be empty"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

## Request NOK && Response NOK
```bash
curl -X PUT 'localhost:3000/pokemon' \
  --header 'Content-Type: application/json' \
  --data-raw $'{
  "name": "tanos",
  "color": "purple",
  "usesPokeball": false
}'

404 Not Found
{
  "statusCode": 404,
  "message": "Not Found"
}
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
