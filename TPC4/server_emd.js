var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates.js')           // Necessario criar e colocar na mesma pasta
var static = require('./static.js')                 // Colocar na mesma pasta

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Gera um ID válido (apenas letras, números e underscore)
function generateValidId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
    let id = '';
    for (let i = 0; i < 10; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

// Transforma os dados do formulário para o formato correto
function formatEMDData(formData, index) {
    return {
        index: index,
        dataEMD: formData.dataEMD,
        nome: {
            primeiro: formData['nome.primeiro'],
            último: formData['nome.último']
        },
        idade: parseInt(formData.idade),
        género: formData.género,
        morada: formData.morada,
        modalidade: formData.modalidade,
        clube: formData.clube,
        email: formData.email,
        federado: formData.federado === 'Sim' || formData.federado === 'true' || formData.federado === true,
        resultado: formData.resultado === 'Aprovado' || formData.resultado === 'true' || formData.resultado === true
    }
}

var emdServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                //--------------------------------------------------------
                // GET '/' ou '/emd' (com ou sem query string para ordenação)
                //--------------------------------------------------------
                if(req.url == '/' || req.url == '/emd' || req.url.startsWith('/emd?')){
                    var apiUrl = "http://localhost:3000/emd?_sort=nome.primeiro,nome.último"
                    
                    // Verifica se há query string para ordenação
                    if(req.url.includes('?order=asc')){
                        apiUrl = "http://localhost:3000/emd?_sort=dataEMD&_order=asc"
                    }
                    else if(req.url.includes('?order=desc')){
                        apiUrl = "http://localhost:3000/emd?_sort=dataEMD&_order=desc"
                    }
                    
                    axios.get(apiUrl)
                    .then(resp => {
                        var emds = resp.data 
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.mainPage(emds, d))
                    })
                    .catch(error => {
                        res.writeHead(505, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.errorPage("Erro ao carregar a página principal: " + error.message, d))
                    })
                }

                //--------------------------------------------------------
                // GET '/emd/registo'
                //--------------------------------------------------------
                else if(req.url == '/emd/registo'){
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end(templates.formPage(null, d))
                }

                //--------------------------------------------------------
                // GET '/emd/editar/:id'
                //--------------------------------------------------------
                else if(req.url.match(/\/emd\/editar\/[a-zA-Z0-9_]+$/)){
                        var id = req.url.split('/')[3]
                        axios.get('http://localhost:3000/emd/' + id)
                        .then(resp => {
                            var registo = resp.data 
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end(templates.formPage(registo, d))
                        })
                        .catch(error => {
                            res.writeHead(505, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end(templates.errorPage("Erro ao carregar a página de edição do registo: " + error.message, d))
                        })
                }

                //--------------------------------------------------------
                // GET '/emd/apagar/:id'
                //--------------------------------------------------------
                else if(req.url.match(/\/emd\/apagar\/[a-zA-Z0-9_]+$/)){
                    var id = req.url.split('/')[3]
                    axios.delete('http://localhost:3000/emd/' + id)
                    .then(resp => {
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.successPage("Registo apagado com sucesso!", d))
                    })
                    .catch(error => {
                        res.writeHead(505, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.errorPage("Erro ao apagar o registo: " + error.message, d))
                    })
                }

                //--------------------------------------------------------
                // GET '/emd/stats'
                //--------------------------------------------------------
                else if(req.url == '/emd/stats'){
                    axios.get('http://localhost:3000/emd')
                    .then(resp => {
                        var emds = resp.data 
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.statsPage(emds, d))
                    })
                    .catch(error => {
                        res.writeHead(505, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.errorPage("Erro ao carregar a página de estatísticas: " + error.message, d))
                    }) 
                }

                //--------------------------------------------------------
                // GET '/emd/:id'
                //--------------------------------------------------------
                else if(req.url.match(/\/emd\/[a-zA-Z0-9_]+$/)){
                    var id = req.url.split('/')[2]
                    axios.get('http://localhost:3000/emd/' + id)
                    .then(resp => {
                        var infoPerson = resp.data 
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.idPage(infoPerson, d))
                    })
                    .catch(error => {
                        res.writeHead(505, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.errorPage("Erro ao carregar a página do registo: " + error.message, d))
                    })
                }

                //--------------------------------------------------------
                // ROTA NÃO SUPORTADA
                //--------------------------------------------------------
                else{
                    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end(templates.errorPage("Rota não suportada!", d))
                }
                break
            
            case "POST":
                //--------------------------------------------------------
                // POST '/emd'
                //--------------------------------------------------------
                if(req.url == '/emd'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            // Buscar todos os registros para encontrar o próximo index
                            axios.get('http://localhost:3000/emd')
                            .then(resp => {
                                var emds = resp.data
                                // Encontrar o maior index
                                var maxIndex = emds.length > 0 ? Math.max(...emds.map(e => e.index)) : -1
                                var nextIndex = maxIndex + 1
                                
                                // Formatar os dados corretamente
                                var emdData = formatEMDData(result, nextIndex)
                                
                                // Gerar ID válido (sem hífen)
                                emdData.id = generateValidId()
                                
                                // Inserir no json-server
                                return axios.post('http://localhost:3000/emd', emdData)
                            })
                            .then(resp => {
                                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                                res.end(templates.successPage("Registo inserido com sucesso!", d))
                            })
                            .catch(error => {
                                res.writeHead(505, {'Content-Type': 'text/html; charset=utf-8'})
                                res.end(templates.errorPage("Erro ao inserir o registo: " + error.message, d))
                            })
                        }
                        else{
                            res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end(templates.errorPage("Dados do formulário inválidos!", d))
                        }
                    })
                }

                //--------------------------------------------------------
                // POST '/emd/:id'
                //--------------------------------------------------------
                else if(req.url.match(/\/emd\/[a-zA-Z0-9_]+$/)){
                    var id = req.url.split('/')[2]
                    collectRequestBodyData(req, result => {
                        if(result){
                            // Buscar o registro atual para manter o index
                            axios.get('http://localhost:3000/emd/' + id)
                            .then(resp => {
                                var currentEMD = resp.data
                                
                                // Formatar os dados corretamente mantendo o index original
                                var emdData = formatEMDData(result, currentEMD.index)
                                emdData.id = id  // Manter o id
                                
                                // Atualizar no json-server
                                return axios.put('http://localhost:3000/emd/' + id, emdData)
                            })
                            .then(resp => {
                                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                                res.end(templates.successPage("Registo atualizado com sucesso!", d))
                            })
                            .catch(error => {
                                res.writeHead(505, {'Content-Type': 'text/html; charset=utf-8'})
                                res.end(templates.errorPage("Erro ao atualizar o registo: " + error.message, d))
                            })
                        }
                        else{
                            res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end(templates.errorPage("Dados do formulário inválidos!", d))
                        }
                    })
                }

                //--------------------------------------------------------
                // ROTA NÃO SUPORTADA
                //--------------------------------------------------------
                else{
                    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end(templates.errorPage("Rota não suportada!", d))
                }
                break

            default: 
                res.writeHead(405, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(templates.errorPage("Método não suportado!", d))    
        }
    }
})

emdServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})