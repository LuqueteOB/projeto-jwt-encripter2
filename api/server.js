const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();

const host = 'localhost';
const port = 3000;

app.get('/', (request, response) => {
    return response.status(200).send("Ola express + JWT");
});

const time = Date.now();
let segundosAteAgora = Math.floor(time / 1000);
let segundosDaquiUmaHora = segundosAteAgora + (60 * 60); // 3600 segundos = 1 hora

const dados = {
    nome: 'Max',
    login: 'max',
    exp: segundosDaquiUmaHora
};

app.get('/dados', (request, response) => {
    const { nome, login, exp } = request.query;

    if (!nome || !login || !exp) {
        return response.status(400).json({ mensagem: 'Dados incompletos na query' });
    }

    return response.json({ nome, login, exp });
});


app.get('/token', (request, response) => {
    const { nome, login } = request.query;

    if (!nome || !login) {
        return response.status(400).json({ mensagem: 'Dados incompletos na query' });
    }

    const exp = Math.floor(Date.now() / 1000) + (60 * 60); // 1 hora a partir de agora
    const dados = { nome, login, exp };

    // Gerando o token
    const token = jwt.sign(dados, process.env.key);

    return response.json({ token });
});


app.get('/validar-token', (request, response) => {
    try {
        const { token } = request.query;

        if (!token) {
            return response.status(400).json({ mensagem: 'Token não fornecido' });
        }

        // Verificando o token
        const validacao = jwt.verify(token, process.env.key);

        return response.json({ mensagem: 'Token Valido', dados: validacao });
    } catch (error) {
        return response.status(401).json({ mensagem: 'Token Inválido', erro: error.message });
    }
});

app.listen(port, host, () => {
    console.log(`Servidor executando na http://${host}:${port}`);
});