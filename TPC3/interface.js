const http = require('http')
const axios = require('axios')
const util = require('./utils.js')

var server = http.createServer(async function(req, res) {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + ' ' + req.url + ' ' + d)

    switch(req.method){
        case 'GET':

            // Página Inicial        
            if(req.url == '/'){
                try{
                    var corpo = `
                        <h2>Bem-vindo à página inicial do servidor de alunos, cursos e instrumentos musicais!</h2>
                        <h4>Ir para a página dos Alunos</h4>
                        ${util.botao('/alunos', 'Alunos')}
                        <h4>Ir para a página dos Cursos</h4>
                        ${util.botao('/cursos', 'Cursos')}
                        <h4>Ir para a página dos Instrumentos</h4>
                        ${util.botao('/instrumentos', 'Instrumentos')}
                    `

                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end(util.pagina('Página Inicial', corpo))
                }catch(erro){
                    res.writeHead(405, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end(`<pre>Erro no servidor de dados: ${erro}.</pre>`)
                }

            // Página dos alunos
            }else if(req.url == '/alunos'){
                try{
                    var alunos = await util.getAlunos()
                    var linhas = alunos.map(a => `
                        <tr>
                            <td>${a.id}</td>
                            <td>${a.nome}</td>
                            <td>${a.dataNasc}</td>
                            <td>${a.curso}</td>
                            <td>${a.anoCurso}</td>
                            <td>${a.instrumento}</td>
                        </tr>
                    `).join('')

                    var corpo = util.card('Lista dos Alunos', `
                        <table class=w3-table w3-striped w3-bordered w3-hoverable>
                            <tr class=w3-light-grey>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Data de Nascimento</th>
                                <th>Curso</th>
                                <th>Ano de Curso</th>
                                <th>Instrumento</th>
                            </tr>
                            ${linhas}
                        </table>
                        ${util.botaoVoltar()}
                    `)

                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end(util.pagina('Página dos Alunos', corpo))
                }catch(erro){
                    res.writeHead(405, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end(`<pre>Erro no servidor de dados: ${erro}.</pre>`)
                }
            
            // Página dos cursos
            }else if(req.url == '/cursos'){
                try{
                    var cursos = await util.getCursos()
                    var linhas = cursos.map(c => `
                        <tr>
                            <td>${c.id}</td>
                            <td>${c.designacao}</td>
                            <td>${c.duracao}</td>
                            <td>${c.instrumento.id}</td>
                            <td>${c.instrumento['#text']}</td>
                        </tr>
                    `).join('')

                    var corpo = util.card('Lista dos Cursos', `
                        <table class=w3-table w3-striped w3-bordered w3-hoverable>
                            <tr class=w3-light-grey>
                                <th>ID do Curso</th>
                                <th>Designação</th>
                                <th>Duração</th>
                                <th>ID do Instrumento</th>
                                <th>Nome do Instrumento</th>
                            </tr>
                            ${linhas}
                        </table>
                        ${util.botaoVoltar()}
                    `)

                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end(util.pagina('Página dos Cursos', corpo))
                }catch(erro){
                    res.writeHead(405, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end(`<pre>Erro no servidor de dados: ${erro}.</pre>`)
                }

            // Página dos instrumentos    
            }else if(req.url == '/instrumentos'){
                try{
                    var instrumentos = await util.getInstrumentos()
                    var linhas = instrumentos.map(i => `
                        <tr>
                            <td>${i.id}</td>
                            <td>${i['#text']}</td>
                        </tr>
                    `).join('')

                    var corpo = util.card('Lista dos Instrumentos', `
                        <table class=w3-table w3-striped w3-bordered w3-hoverable>
                            <tr class=w3-light-grey>
                                <th>ID</th>
                                <th>Nome do Instrumentos</th>
                            </tr>
                            ${linhas}
                        </table>
                        ${util.botaoVoltar()}
                    `)

                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end(util.pagina('Página dos Instrumentos', corpo))
                }catch(erro){
                    res.writeHead(405, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end(`<pre>Erro no servidor de dados: ${erro}.</pre>`)
                }
            
            // Em caso de rota inválida
            }else{
                res.writeHead(405, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<pre>Rota não suportada</pre>')
            }
            break
        
        //  Em caso de método inválido
        default:
            res.writeHead(405, {'Content-Type': 'text/html; charset=utf-8'})
            res.end(`<pre>Método não suportado: ${req.method}.</pre>`)
            break
    }
})

server.listen(25000)
console.log('Servidor à escuta na porta 25000...')
