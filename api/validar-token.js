const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.get('/validar-token', (request, response) => {
    try {
        const { token } = request.query;

        if (!token) {
            return response.status(400).json({ mensagem: 'Token não fornecido' });
        }

        const validacao = jwt.verify(token, process.env.key);

        return response.json({ mensagem: 'Token Valido', dados: validacao });
    } catch (error) {
        return response.status(401).json({ mensagem: 'Token Inválido', erro: error.message });
    }
});

module.exports = app;
