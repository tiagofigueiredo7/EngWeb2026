const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// O meu logger
app.use(function(req, res, next){
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)
    next()
})

// 1. Conexão ao MongoDB
const nomeBD = "cinema"
const mongoHost = process.env.MONGO_URL || `mongodb://127.0.0.1:27017/${nomeBD}`
mongoose.connect(mongoHost)
    .then(() => console.log(`MongoDB: liguei-me à base de dados ${nomeBD}.`))
    .catch(err => console.error('Erro:', err));

// 2. Esquemas flexíveis para as 3 coleções
const filmesSchema = new mongoose.Schema({}, { strict: false, collection: 'filmes', versionKey: false });
const atoresSchema = new mongoose.Schema({}, { strict: false, collection: 'atores', versionKey: false });
const generosSchema = new mongoose.Schema({}, { strict: false, collection: 'generos', versionKey: false });

const Filmes = mongoose.model('Filmes', filmesSchema);
const Atores = mongoose.model('Atores', atoresSchema);
const Generos = mongoose.model('Generos', generosSchema);

// 3. Mapeamento de coleções para modelos
const collections = {
    'filmes': Filmes,
    'atores': Atores,
    'generos': Generos
};

// 4. Middleware para validar e obter o modelo da coleção
function getModel(req, res, next) {
    const collectionName = req.params.collection;
    const Model = collections[collectionName];
    
    if (!Model) {
        return res.status(404).json({ 
            error: `Coleção '${collectionName}' não existe. Coleções disponíveis: ${Object.keys(collections).join(', ')}` 
        });
    }
    
    req.Model = Model;
    next();
}

// 5. Rotas CRUD genéricas para todas as coleções

// GET /:collection - Listar com FTS, Ordenação e Projeção de Campos
app.get('/:collection', getModel, async (req, res) => {
    try {
        let queryObj = { ...req.query };
        
        // 1. Extração de parâmetros especiais
        const searchTerm = queryObj.q;
        const fields = queryObj._select;
        const sortField = queryObj._sort;
        const order = queryObj._order === 'desc' ? -1 : 1;

        // Limpeza do objeto de query para não filtrar por parâmetros de controlo
        delete queryObj.q;
        delete queryObj._select;
        delete queryObj._sort;
        delete queryObj._order;

        let mongoQuery = {};
        let projection = {};
        let mongoSort = {};

        // 2. Configuração da Pesquisa de Texto
        if (searchTerm) {
            mongoQuery = { $text: { $search: searchTerm } };
            // Score de relevância
            projection.score = { $meta: "textScore" };
            mongoSort = { score: { $meta: "textScore" } };
        } else {
            mongoQuery = queryObj;
        }

        // 3. Configuração da Projeção (_select)
        if (fields) {
            fields.split(',').forEach(f => {
                projection[f.trim()] = 1;
            });
        }

        // 4. Execução da Query
        let execQuery = req.Model.find(mongoQuery, projection);

        // Prioridade de ordenação: _sort manual ou textScore se houver pesquisa
        if (sortField) {
            execQuery = execQuery.sort({ [sortField]: order });
        } else if (searchTerm) {
            execQuery = execQuery.sort(mongoSort);
        }

        const results = await execQuery.exec();
        res.json(results);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /:collection/:id - Procurar por id numérico ou _id do MongoDB
app.get('/:collection/:id', getModel, async (req, res) => {
    try {
        const idParam = req.params.id;
        let doc = null;
        
        // Se o parâmetro é numérico, procura pelo campo "id" (inteiro)
        if (/^\d+$/.test(idParam)) {
            doc = await req.Model.findOne({ id: parseInt(idParam) });
        } else {
            // Caso contrário, tenta procurar por _id do MongoDB (ObjectId)
            doc = await req.Model.findById(idParam);
        }
        
        if (!doc) return res.status(404).json({ error: "Não encontrado" });
        res.json(doc);
    } catch (err) {
        res.status(400).json({ error: "ID inválido ou erro de sistema" });
    }
});

// POST /:collection - Inserir documento
app.post('/:collection', getModel, async (req, res) => {
    try {
        const newDoc = new req.Model(req.body);
        const saved = await newDoc.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT /:collection/:id - Atualizar por _id
app.put('/:collection/:id', getModel, async (req, res) => {
    try {
        const updated = await req.Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: "Não encontrado" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE /:collection/:id - Remover por _id
app.delete('/:collection/:id', getModel, async (req, res) => {
    try {
        const deleted = await req.Model.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Não encontrado" });
        res.json({ message: "Eliminado com sucesso", id: req.params.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(7789, () => console.log('API minimalista em http://localhost:7789 - Coleções: /filmes, /atores, /generos'));