const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json()); // Permite receber JSON no body das requisições

// Configuração da conexão com o MySQL
const db = mysql.createConnection({
    host: 'mysqldbaula.mysql.database.azure.com',
    user: 'user_admin',
    password: 'admin@123456',
    database: 'db01',
    port: 3306
});

// Conectar ao banco de dados
db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
    } else {
        console.log('Conectado ao banco de dados!');
    }
});

// Rota para cadastrar um usuário
app.post('/cadastrar', (req, res) => {
    const { nome, usuario, senha, email } = req.body;

    if (!nome || !usuario || !senha || !email) {
        return res.status(400).json({ erro: 'Preencha todos os campos!' });
    }

    const sql = 'INSERT INTO usuario (nome, usuario, senha, email) VALUES (?, ?, ?, ?)';
    db.query(sql, [nome, usuario, senha, email], (err, result) => {
        if (err) {
            console.error('Erro ao inserir usuário:', err);
            return res.status(500).json({ erro: 'Erro no servidor' });
        }
        res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
    });
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
