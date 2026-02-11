const axios = require('axios')
const http = require('http')
const util = require('./util.js')

//import {createServer} from 'http'
//import axios from 'axios'
//import {header} from './util.js'

var server = http.createServer(function(req, res){
    let html = util.header

    if(req.url == "/reparacoes"){ //Para a rota das reparacoes
        axios.get('http://localhost:3000/reparacoes')
            .then(resp => {
                html+=`
                <body>
                    <h1>Reparações</h1>
                    <table border="1">
                        <tr>
                            <th>nome</th>
                            <th>nif</th>
                            <th>data</th>
                            <th>marca</th>
                            <th>modelo</th>
                            <th>matricula</th>
                            <th>nr_intervencoes</th>
                        </tr>
                `
                //Processamento de dados e construção do HTML
                dados = resp.data
                sorted_data = dados.sort((a, b) => a.nome.localeCompare(b.nome))
                
                sorted_data.forEach(r => {
                    html += `
                        <tr>
                            <td>${r.nome}</td>
                            <td>${r.nif}</td>
                            <td>${r.data}</td>
                            <td>${r.viatura.marca}</td>
                            <td>${r.viatura.modelo}</td>
                            <td>${r.viatura.matricula}</td>
                            <td>${r.nr_intervencoes}</td>
                        </tr>
                    `
                })

                //Finalização do HTML e envio de resposta
                html+=`</table></body></html>`
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(html)
            })
            .catch(error => {
                //No caso do get ao json-server falhar
                res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<pre>" + JSON.stringify(error) + "</pre>")
            })

    }else if(req.url == "/intervencoes"){ //Para a rotas das intervencoes
        axios.get('http://localhost:3000/reparacoes')
            .then(resp => {
                html+=`
                <body>
                    <h1>Intervenções</h1>
                    <table border="1">
                        <tr>
                            <th>codigo</th>
                            <th>nome</th>
                            <th>descricao</th>
                            <th>nr_vezes</th>
                        </tr>
                `
                //Processamento de dados e construção do HTML
                dic = {} //Dicionario para guadar as informações de cada intervenção

                dados = resp.data
                dados.forEach(r => {
                    r.intervencoes.forEach(i => {
                        if(dic[i.codigo] == undefined){ //Primeira vez que é encontrado
                            dic[i.codigo] = {
                                codigo: i.codigo,
                                nome: i.nome,
                                descricao: i.descricao,
                                nr_vezes: 1
                            }
                        }else{ //Quando já existe no dicionario
                            dic[i.codigo].nr_vezes++
                        }
                    })
                })

                sorted_dic = Object.values(dic).sort((a, b) => a.codigo.localeCompare(b.codigo))

                sorted_dic.forEach(i => {
                    html += `
                        <tr>
                            <td>${i.codigo}</td>
                            <td>${i.nome}</td>
                            <td>${i.descricao}</td>
                            <td>${i.nr_vezes}</td>
                        </tr>
                    `
                })

                //Finalização do HTML e envio de resposta     
                html+=`</body></html>`
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(html)
            })
            .catch(error => {
                //No caso do get ao json-server falhar
                res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<pre>" + JSON.stringify(error) + "</pre>")
            })

    }else if(req.url == "/viaturas"){ //Para a rota das viaturas
        axios.get('http://localhost:3000/reparacoes')
        .then(resp => {
                html+=`
                <body>
                    <h1>Viaturas</h1>
                    <table border="1">
                        <tr>
                            <th>marca</th>
                            <th>nr_intervencoes</th>
                        </tr>
                `
                //Processamento de dados e construção do HTML
                dic = {} //Dicionario para as marcas e nr de carros intervencionados

                dados = resp.data
                dados.forEach(r => {
                    let marca = r.viatura.marca
                    if(dic[marca] == undefined){ //Primeira vez que é encontrado
                        dic[marca] = {
                            marca : marca,
                            nr_intervencoes : r.nr_intervencoes
                        }
                    }else{ //Quando já existe no dicionario
                        dic[marca].nr_intervencoes += r.nr_intervencoes
                    }
                })

                sorted_dic = Object.values(dic).sort((a, b) => a.marca.localeCompare(b.marca))

                sorted_dic.forEach(m => {
                    html += `
                        <tr>
                            <td>${m.marca}</td>
                            <td>${m.nr_intervencoes}</td>
                        </tr>
                    `
                })

                //Finalização do HTML e envio de resposta
                html+=`</body></html>`
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(html)
            })
            .catch(error => {
                //No caso do get ao json-server falhar
                res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<pre>" + JSON.stringify(error) + "</pre>")
            })

    }else{
        //No caso de nenhuma das rotas coincidir com as suportadas
        res.writeHead(520, {'Content-Type': 'text/plan; charset=utf-8'})
        res.end("<p>Pedido não suportad, por favor tente novamente.</p>")
    }
})

server.listen(7777)
console.log("Server à escuta na porta 7777...")