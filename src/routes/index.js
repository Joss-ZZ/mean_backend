const express = require('express');
const app = express();

app.use(require('./perfil.router'));
app.use(require('./user.router'));

module.exports = app;