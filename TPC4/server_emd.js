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
                        res.end(templates.errorPage("Erro ao carregar a página do EMD: " + error.message, d))
                    })
                }

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