const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.get('/token', (request, response) => {
    const { nome, login } = request.query;

    if (!nome || !login) {
        return response.status(400).json({ mensagem: 'Dados incompletos na query' });
    }

    const exp = Math.floor(Date.now() / 1000) + (60 * 60); // 1 hora a partir de agora
    const dados = { nome, login, exp };

    const token = jwt.sign(dados, process.env.key);

    return response.json({ token });
});

module.exports = app;
