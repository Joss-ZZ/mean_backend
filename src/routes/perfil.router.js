const { Router } = require('express');

const { listarPerfiles } = require('../controllers/perfil.controller.js');

const router = Router();

//Listar perfiles por estado
router.get('/perfil/findAllByEstado/:estado', listarPerfiles);

module.exports = router;