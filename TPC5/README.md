# TCP 5
## Metainformação
- **Título:** Web App sobre Cinema utilizando a Express.js
- **Data:** 4 março 2026
- **Autor:** Tiago Figueiredo
- **UC:** Engenharia Web

## Autor
**Nome:** [Tiago Silva Figueiredo](https://github.com/tiagofigueiredo7)

**Número:** a106856

![foto](a106856.jpg)

## Resumo

Neste TPC o objetivo foi criar uma aplicação web utilizando o Express.js, sobre o tema de cinema. A aplicação atende aos seguintes serviços:

- `GET /` ou `GET /filmes` - responde com a página principal que apresenta uma lista de filmes
- `GET /filmes/:id` - responde com uma página com toda a informação sobre o filme com o id fornecido
- `GET /atores` - responde com uma página que apresenta uma lista de atores
- `GET /atores/:id` - responde com uma página com toda a informação sobre o ator, e os filmes em que este participou
- `GET /generos` - responde com uma página que apresenta uma lista de géneros
- `GET /generos/:id` - responde com uma página com uma lista de filmes daquele género

## Lista de Resultados

A resolução deste TPC deu origem aos seguintes ficheiros:

- [cinema.json](cinema.json) - dataset com a informação sobre os filmes, atores e géneros
- [script.py](script.py) - script utilizado para converter o dataset para um formato mais adequado
- [views/](views/) - templates feitos em pug paa criar as páginas da aplicação
- [index.js](index.js) - API do serviddor que responde aos serviços

> **Nota:** Os restantes ficheiros foram criados automaticamente com o comando `npx express-generator --view=pug cinemas` e não foram modificados, pelo que não são listados aqui.

## Dependências

Para poder correr a aplicação é necessário ter instalado:

- json-server

```
npm install -g json-server@0.17.4
```

- Outras dependências listadas no `package.json` (express, pug, etc.)

```
cd cinemas/
npm install
``` 

## Testar
Para testar basta correr os dois servidores (json-server e server aplicacional) com estes comandos respetivamente:

```bash
json-server --watch cinema.json
cd cinemas/
npm start
```

Depois basta aceder a `http://localhost:3007` para interagir com a aplicação.