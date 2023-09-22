const cors = require('cors');
const express = require('express');
const serverless = require('serverless-http');

const app = require("./app/app")

//CORS
app.use(cors());

// Configura tus rutas y middleware aquí
app.use(express.json());

module.exports.handler = serverless(app);