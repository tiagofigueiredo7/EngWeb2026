# TCP 4
## Metainformação
- **Título:** Criação de uma aplicação web para gestão de Exames Médicos Desportivos
- **Data:** 26 fevereiro 2026
- **Autor:** Tiago Figueiredo
- **UC:** Engenharia Web

## Autor
**Nome:** [Tiago Silva Figueiredo](https://github.com/tiagofigueiredo7)

**Número:** a106856

![foto](a106856.jpg)

## Resumo

Neste TPC o objetivo foi criar uma aplicação web para gerir Exames Médicos Desportivos (EMD). A aplicação permite criar, ler, atualizar e eliminar registos de EMD, bem como visualizar estatísticas sobre os dados inseridos.

Para atender aos serviços exigidos pela aplicação, foram implementados os seguintes endpoints:

- `GET /` ou `GET /emd` - responde com uma página principal onde consta uma tabela com os EMD; a tabela apresenta os campos: nome do atleta, data, modalidade, resultado;

- `GET /emd/:id` - responde com uma página composta por um card com toda a informação do EMD

- `GET /emd/registo` - responde com o formulário para recolha dos dados do novo EMD;

- `GET /emd/editar/:id` - responde com o formulário para edição dos dados do registo selecionado;

- `GET /emd/apagar/:id` - apaga o registo selecionado e redireciona para a página principal;

- `GET /emd/stats` - responde com uma página (layout à tua escolha) com as distribuições dos registos por: sexo, modalidade, clube, resultado, federado;

- `POST /emd` - insere o registo na base de dados e redireciona para a página principal;

- `POST /emd/:id` - altera o registo na base de dados e redireciona para a página principal.

## Lista de Resultados

A resolução deste TPC deu origem aos seguintes ficheiros:

- [script.py](script.py) : script python para converter o dataset JSON num formato adequado para o json-server
- [dataset_emd.json](dataset_emd.json) : dataset usado no json-server
- [server_emd.js](server_emd.js) : servidor aplicacional com a implementação da API
- [static.js](static.js)
- [template.js](template.js)
- [views/layout.pug](views/layout.pug) : template base para as páginas da aplicação
- [views/index.pug](views/index.pug) : template para a página principal
- [views/infoPersonal.pug](views/infoPersonal.pug) : template para a página de detalhes de um registo
- [views/form.pug](views/form.pug) : template para os formulários de inserção e edição de registos
- [views/stats.pug](views/stats.pug) : template para a página de estatísticas 
- [views/success.pug](views/success.pug) : template para a página de sucesso após inserção ou edição de registos
- [views/error.pug](views/error.pug) : template para a página de erro

## Dependências

Para poder correr a aplicação é necessário ter instalado:
- json-server

```bash
npm install -g json-server@0.17.4
```

- axios
- pug

```bashbash
npm install axios pug   
```

## Testar
Para testar basta correr os dois servidores (json-server e server aplicacional) com estes comandos respetivamente:

```bash
json-server --watch dataset_emd.json

node server_emd.js
```

Depois basta aceder a `http://localhost:7777` para interagir com a aplicação.
