# TCP 6
## Metainformação
- **Título:** Web App sobre Cinema com orquestração de containers
- **Data:** 11 março 2026
- **Autor:** Tiago Figueiredo
- **UC:** Engenharia Web

## Autor
**Nome:** [Tiago Silva Figueiredo](https://github.com/tiagofigueiredo7)

**Número:** a106856

![foto](a106856.jpg)

## Resumo

Neste TPC o objetivo foi criar uma aplicação web  sobre o tema de cinema, separando a API de dados da interface e da Base de Dados. Cada um destes está contido num container Docker. A aplicação atende aos seguintes serviços:

- `GET /` ou `GET /filmes` - responde com a página principal que apresenta uma lista de filmes
- `GET /filmes/:id` - responde com uma página com toda a informação sobre o filme com o id fornecido
- `GET /atores` - responde com uma página que apresenta uma lista de atores
- `GET /atores/:id` - responde com uma página com toda a informação sobre o ator, e os filmes em que este participou
- `GET /generos` - responde com uma página que apresenta uma lista de géneros
- `GET /generos/:id` - responde com uma página com uma lista de filmes daquele género

## Lista de Resultados

- [cinema.json](cinema.json) - dataset com a informação sobre os filmes, atores e géneros
- [filmes.json](filmes.json) - dataset com a informação sobre os filmes pronto para usar no mongoDB
- [atores.json](atores.json) - dataset com a informação sobre os atores pronto para usar no mongoDB
- [generos.json](generos.json) - dataset com a informação sobre os géneros pronto para usar no mongoDB
- [script.py](script.py) - script utilizado para converter o dataset em formato JSON para o formato necessário para o mongoDB
- [server_data.js](./cinemaApp/api_dados/server_data.js) - servidor da API de dados
- [app_interface.js](./cinemaApp/interface/app_interface.js) - servidor da interface
- [Dockerfile](./cinemaApp/api_dados/Dockerfile) - Dockerfile para o container da API de dados
- [Dockerfile.mongo](./cinemaApp/api_dados/Dockerfile.mongo) - Dockerfile para o container do mongoDB
- [Dockerfile.interface](./cinemaApp/interface/Dockerfile.interface) - Dockerfile para o container da interface
- [docker-compose.yml](./cinemaApp/docker-compose.yml) - ficheiro de configuração do docker-compose para orquestrar os containers

## Build
Para construir os containers e correr a aplicação, basta executar o seguinte comando na pasta `cinemaApp`:

```bash
docker compose up --build
```
Este comando irá construir os containers da API de dados, do mongoDB e da interface, e iniciar a aplicação. A interface estará disponível em `http://localhost:7790`.

## Clean
Para parar os containers e remover as imagens, basta executar o seguinte comando na pasta `cinemaApp`:

```bash
docker compose down
```
Este comando irá parar os containers e remover as imagens criadas.