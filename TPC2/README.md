# TCP 2
## Metainformação
- **Título:** Processamento de dados através de *requests* para um json-server
- **Data:** 11 fevereiro 2026
- **Autor:** Tiago Figueiredo
- **UC:** Engenharia Web

## Autor
**Nome:** [Tiago Silva Figueiredo](https://github.com/tiagofigueiredo7)

**Número:** a106856

![foto](a106856.jpg)

## Resumo
As opções, neste TPC, são aceder a informação contida no json-server ([dataset_reparacoes.json](dataset_reparacoes.json)) através das rotas:

- localhost:7777/reparacoes
- localhost:7777/intervencoes
- localhost:7777/viaturas

Cada uma destas rotas levará para um *output* diferente. 

Na primeira será mostrada uma tabela com toda a informação referente a todas as reparaões que se encontram no json-server.

Na segunda será mostrada uma tabela com todas a informação das intervenções possíveis (sem haver repetições), e o número de reparações que exigiram essa intervenção.

Na terceira e última será mostrada uma tabela com o número de intervenções feitas por marca de viatura (sem haver repetições de viaturas).

## Lista de Resultados

A resolução deste TPC deu origem aos seguintes ficheiros:

- [dataset_reparacoes.json](dataset_reparacoes.json) : dataset utilizado para o json-server
- [app_server.js](app_server.js) : servidor aplicacional desenvolvido
- [util.js](util.js) : ficheiro com apenas o header de HTML (para ser mais clean)

## Dependências

Para poder correr estes servidores e testes é necessário ter instalado:

- json-server

```
npm install -g json-server@0.17.4
```

- axios

```
npm install axios
```

## Testar

Para testar basta correr os dois servidores (json-server e server aplicacional) com estes comandos respetivamente:

```
json-server --watch dataset_reparacoes.json

node app_server.js
```

Depois basta no browser procurar por estas rotas

- [localhost:7777/reparacoes](localhost:7777/reparacoes)
- [localhost:7777/intervencoes](localhost:7777/intervencoes)
- [localhost:7777/viaturas](localhost:7777/viaturas)
