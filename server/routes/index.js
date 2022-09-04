const express = require('express');

const app = express();

app.use(require('./equipo'));
app.use(require('./upload'));
app.use(require('./imagenes'));

module.exports = app;