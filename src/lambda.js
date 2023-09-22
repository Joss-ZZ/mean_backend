const express = require('express');
const serverless = require('serverless-http');

const app = require("./app/app")

// Configura tus rutas y middleware aquí
app.use(express.json());

module.exports.handler = serverless(app);