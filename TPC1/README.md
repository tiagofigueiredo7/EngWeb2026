# TCP 1
## Metainformação
- **Título:** Definição de um website a partir de um *script* python e um dataset
- **Data:** 4 fevereiro 2026
- **Autor:** Tiago Figueiredo
- **UC:** Engenharia Web

## Autor
**Nome:** [Tiago Silva Figueiredo](https://github.com/tiagofigueiredo7)

**Número:** a106856

![foto](a106856.jpg)

## Resumo
Análise do dataset **reparacoes.json** sobre as intervenções realizadas numa oficina automóvel;

Definição da estrutura de um website de exploração do dataset:

- Página principal: lista de dados consultáveis;

- Listagem das reparações: Data, nif, nome, marca, modelo, número de intervenções realizadas;

- Listagem dos tipos de intervenção: lista alfabética de código das intervenções - código, nome e descrição;

- Listagem das marcas e modelos dos carros intervencionados: lista alfabética das marcas e modelos dos carros reparados - marca, modelo, número de carros;

- Página da Reparação: página com toda a informação de uma reparação;

- Página do tipo de intervenção: dados da intervenção (código, nome e descrição) e lista de reparações onde foi realizada;

- Página do marca/modelo: número de carros com essa marca/modelo e matriculas com essa marca/modelo

Criação de um *script* em Python para gerar o website a partir do dataset.

## Lista de Resultados
A resolução deste TCP deu origem aos seguintes ficheios:

- [reparacoes.json](reparacoes.json) : dataset utilizado
- [json2html.py](json2html.py) : *script* python para converter o dataset num website
- [index.html](/output/index.html) : página principal do website com os links para as três listas
- [reparacoes.html](/output/reparacoes.html) : página com a lista das reparações
- [intervencoes.html](/output/intervencoes.html) : página com a lista das intervenções
- [marcas.html](/output/marcas.html) : página com as listas das marcas e dos modelos
- páginas individuais de cada reparação, intervenção, marca e modelo

**Nota:** Não se encontram neste repositório as páginas individuais de cada reparação, intervenção, marca ou modelo pelo simples motivo do conjunto delas constituir mais de 5000 ficheiros.

Para correr o *script* e ter acesso a todas as páginas pretendidas basta fazer:
```bash
python3 json2html.py
```

