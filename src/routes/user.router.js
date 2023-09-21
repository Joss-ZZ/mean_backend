const { Router } = require('express');

const { listarUsuarios, registrarUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/user.controller.js');

const router = Router();

//Listar usuarios por estado
router.post('/usuario/findAllByCustom', listarUsuarios);

//Crear usuario.
router.post('/usuario', registrarUsuario);

//Actualizar usuario.
router.put('/usuario/:id', actualizarUsuario);

//Eliminar (lógica) usuario.
router.delete('/usuario/:id', eliminarUsuario);

module.exports = router;