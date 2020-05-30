const { Router } = require('express');
// não é preciso importar todo o expresso toda vez
// quando eu inform o { Router } é apenas uma package do express
const DevController = require('./controlers/DevController');
const SearchController = require('./controlers/SearchController');

const routes = Router();

// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de parâmetros:
// Query Params: request.query (filtros, ordenação, paginação, ...)
// Route Params: request.params (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

routes
    .get('/devs', DevController.index)
    .post('/devs', DevController.store)
    .post('/devs/update', DevController.update)
    .delete('/devs/delete/:name', DevController.destroy)
    .get('/search', SearchController.index);

module.exports = routes;
