const express = require('express');
const morgan = require('morgan');

const router = require('../routes/index.js')

const app = express();

//Lectura y parseo del body
app.use(express.json());

app.use(morgan("dev"))

app.use("/api/v1", router)

module.exports = app;