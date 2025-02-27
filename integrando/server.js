// 400 = aviso q vai da erro / 404/500 = error / 200 = sucesso
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000 ;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Lopes1504$',
    database : 'db',
    port : 3306
});

db.connect((err) => {
    if(err){
        console.log('Error connecting to the database:'+ err.stack);
        return;
    }
    console.log('conectado ao banco com sucesso ');
});

app.post('/api/cadastro', (req,res) => {
    const { nome, email, senha } = req.body;

    if(!nome || !email || !senha){
        return res.status(400).json({
            message : 'por favor insira os campos de nome , email e senha '
        });
    }

    const query = 'INSERT INTO usuarios (nome , email, senha) VALUES (?, ?, ?)';
    db.execute(query, [nome, email, senha], (err, result) => {
        if(err){
            console.log('erro ao cadastrar usuario' ,err);
            return res.status(500).json({
                message : 'ocorreu um erro interno no sistema'
            });
        }
        res.status(200).json({
            message : 'usuario cadastrado com sucesso'
        });
    });
});

app.listen(port , () => {
    console.log(`servidor rodando na porta  http:/localhost${port}`);
});