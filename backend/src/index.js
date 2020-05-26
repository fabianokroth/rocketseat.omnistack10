const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://omnistack10:omnistack10@cluster0-zqbi8.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use(routes);

/*
    app.use() -- é válido para todos os métodos
    app.post() -- é válido apenas para o post
    pode ser usado nos demais métodos
*/

app.listen(3333);
