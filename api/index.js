const express = require('express');
const path = require('path');
const tokenRoutes = require('./token');
const validarTokenRoutes = require('./validar-token');
require('dotenv').config();

const app = express();

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, '..'))); // Serve arquivos na raiz do projeto

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html')); // Serve o index.html
});

// Usando as rotas
app.use('/api/token', tokenRoutes);
app.use('/api/validar-token', validarTokenRoutes);

module.exports = app;