#!/bin/bash
# Importa o JSON para a base de dados cinema, coleção filmes
mongoimport --host localhost --db cinema --collection filmes --type json --file /docker-entrypoint-initdb.d/filmes.json --jsonArray

# Importa o JSON para a base de dados cinema, coleção atores
mongoimport --host localhost --db cinema --collection atores --type json --file /docker-entrypoint-initdb.d/atores.json --jsonArray

# Importa o JSON para a base de dados cinema, coleção generos
mongoimport --host localhost --db cinema --collection generos --type json --file /docker-entrypoint-initdb.d/generos.json --jsonArray


# Cria o índice de texto necessário para o parâmetro ?q= funcionar
mongosh cinema --eval 'db.filmes.createIndex({title: "text"})'
mongosh cinema --eval 'db.atores.createIndex({name: "text"})'
mongosh cinema --eval 'db.generos.createIndex({name: "text"})'