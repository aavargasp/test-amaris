## Description

Tech challenge for Amaris job interview.

## Requirements

RETO TECNICO Pokemon
- Disponibilizar un servicio nestjs en local
- Conectar a una base de datos (al gusto)
- Crear un endpoint que permita crear un pokemon con 3 datos basicos + el id de pokemon
- Consumir un servicio externo que triaga la informacion del pokemon y guardar 3 campos adicionales
- Obtenga el nombre del pokemon desde el campo pokemon.name... suponga que aveces el nombre llega como string en el campo "pokemon" y prepare el codigo para que lo pueda obtener de las dos formas.

## Versions
```bash
$ node -v
v23.1.0
$ npm -v
10.9.0
```

## Important Paths
- [Database config](src/config/orm.option.ts)
- [PokeAPI Module](src/services/pokeapi)
- [Pokemon Module](src/modules/pokemon)
- [Dockerfile](Dockerfile)
- [Docker-compose](docker-compose.yml)

## Run Locally

```bash
# docker deploys only database
$ docker compose up -d database

$ npm install

$ npm run start:dev
```

## Run Dockerized

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
  "id": "1da5b432-00e7-4295-8470-798c0d04f245"
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
