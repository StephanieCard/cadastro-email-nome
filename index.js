const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const expressMongoDb = require('express-mongo-db');

app.use(expressMongoDb('mongodb://localhost/emails'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('static'));

// const cadastros = {};

app.get('/emails', (req, res) => {
    req.db.collection('cadastros').find({}).toArray((err, cadastros) => {
        res.send(cadastros);
    });
});

app.get('/email/:nome', (req, res) => {
    // let email = cadastros[req.params.nome];

    // if(!email){
    //     return res.status(404).send({mensagem: `Lamentamos, mas não encontramos ${req.params.nome}.`})
    // }

    req.db.collection('cadastros').findOne({nome: req.params.nome}, (err, cadastro) => {
        return res.send(cadastro);
    });
});

app.post('/cadastrar', (req, res) => {
    if(!req.body.nome || !req.body.email){
        return res.status(400).send({mensagem: "Nome e email são obrigatórios"});
    }

    // cadastros[req.body.nome] = req.body.email;

    req.db.collection('cadastros').insert(req.body, (err) => {
        console.log(err);
    });

    res.send({mensagem: 'Cadastro realizado com sucesso!'});
});

app.listen(3000, () => console.log('Aplicação iniciada.'));