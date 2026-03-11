const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// Configurações do Express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public'));

// URL da API (Se estiveres a correr fora do Docker, usa localhost)
const API_URL = process.env.API_URL || "http://localhost:7789";

// Rota principal - redireciona para /filmes
app.get('/', (req, res) => {
    res.redirect('/filmes');
});

app.get('/cinema', (req, res) => {
    res.redirect('/filmes');
});


// Rota para filmes
app.get('/filmes', (req, res) => {
    const d = new Date().toISOString().substring(0, 16);
    
    // Faz o pedido à API de dados
    axios.get(API_URL + '/filmes?_sort=id')
        .then(response => {
            res.render('index', { 
                list: response.data, 
                date: d 
            });
        })
        .catch(err => {
            res.render('error', { 
                error: err, 
                message: "Erro ao obter dados da API" 
            });
        });
});

// Rota para filme específico
app.get('/filmes/:id', (req, res) => {
    const d = new Date().toISOString().substring(0, 16);
    const id = req.params.id;
    
    // Faz o pedido à API de dados
    axios.get(`${API_URL}/filmes/${id}`)
        .then(response => {
            res.render('filme', { 
                f: response.data, 
                date: d 
            });
        })
        .catch(err => {
            res.render('error', { 
                error: err, 
                message: `Erro ao obter dados do filme com ID ${id}` 
            });
        });
});

// Rota para atores
app.get('/atores', (req, res) => {
    const d = new Date().toISOString().substring(0, 16);
    
    // Faz o pedido à API de dados
    axios.get(API_URL + '/atores?_sort=name')
        .then(response => {
            res.render('atores', { 
                list: response.data, 
                date: d 
            });
        })
        .catch(err => {
            res.render('error', { 
                error: err, 
                message: "Erro ao obter dados da API" 
            });
        });
});

// Rota para ator específico
app.get('/atores/:id', (req, res) => {
    const d = new Date().toISOString().substring(0, 16);
    const id = req.params.id;
    
    // Faz o pedido à API de dados
    axios.get(`${API_URL}/atores/${id}`)
        .then(response => {
            res.render('ator', { 
                a: response.data, 
                date: d 
            });
        })
        .catch(err => {
            res.render('error', { 
                error: err, 
                message: `Erro ao obter dados do ator com ID ${id}` 
            });
        });
});

// Rota para géneros
app.get('/generos', (req, res) => {
    const d = new Date().toISOString().substring(0, 16);
    
    // Faz o pedido à API de dados
    axios.get(API_URL + '/generos?_sort=name')
        .then(response => {
            res.render('generos', { 
                list: response.data, 
                date: d 
            });
        })
        .catch(err => {
            res.render('error', { 
                error: err, 
                message: "Erro ao obter dados da API" 
            });
        });
});

// Rota para género específico
app.get('/generos/:id', (req, res) => {
    const d = new Date().toISOString().substring(0, 16);
    const id = req.params.id;
    
    // Faz o pedido à API de dados
    axios.get(`${API_URL}/generos/${id}`)
        .then(response => {
            res.render('genero', { 
                g: response.data, 
                date: d 
            });
        })
        .catch(err => {
            res.render('error', { 
                error: err, 
                message: `Erro ao obter dados do género com ID ${id}` 
            });
        });
});  


const PORT = 7790;
app.listen(PORT, () => {
    console.log(`Servidor de Interface em http://localhost:${PORT}/filmes`);
});