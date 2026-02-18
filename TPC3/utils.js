const axios = require('axios')

// Funções para get no json-server
async function getAlunos(){
    const resp = await axios.get('http://localhost:3000/alunos')
    return resp.data
}

async function getCursos(){
    const resp = await axios.get('http://localhost:3000/cursos')
    return resp.data
}

async function getInstrumentos(){
    const resp = await axios.get('http://localhost:3000/instrumentos')
    return resp.data
}

// Função da página principal
function pagina(titulo, corpo){
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8"/>
        <title>${titulo}</title>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
        <style>
            body {
                min-height: 100vh;
                display: flex;
                flex-direction: column;
            }
            .conteudo-principal {
                flex: 1;
            }
        </style>
    </head>
    <body class="w3-light-grey">

        <div class="w3-container w3-teal">
            <h1>${titulo}</h1>
        </div>

        <div class="w3-container w3-margin-top conteudo-principal">
            ${corpo}
        </div>

        <footer class="w3-container w3-teal w3-center w3-padding">
            <p>Servidor desenvolvido por <b>Tiago Figueiredo</b> - 2026</p>
        </footer>

    </body>
    </html>
    `
}

// Função para criar um link
function link(href, texto){
    return `<a href="${href}">${texto}</a>`
}

// Função para criar um card
function card(titulo, conteudo){
    return `
    <div class="w3-card-4 w3-white w3-margin-bottom">
        <header class="w3-container w3-teal">
            <h3>${titulo}</h3>
        </header>
        <div class="w3-container w3-padding">
            ${conteudo}
        </div>
    </div>
    `
}

// Função para criar uma lista
function lista(items){
    if(items.length === 0)
        return `<p><i>Sem registos.</i></p>`

    return `
      <ul class="w3-ul w3-hoverable">
        ${items.map(i => `<li>${i}</li>`).join("")}
      </ul>
    `
}

// Botão de voltar
function botaoVoltar(){
    return `<a class="w3-button w3-teal w3-margin-top" href="/">Voltar</a>`
}

function botao(href, nome){
    return `<a class="w3-button w3-teal w3-margin-top" href="${href}">${nome}</a>`
}

// Exportação
module.exports = {
    getAlunos,
    getCursos,
    getInstrumentos,
    pagina,
    link,
    card,
    lista,
    botaoVoltar,
    botao
}
