const { response } = require("express");
const { Op } = require('sequelize');
const Usuario = require("../models/user.model");
const Perfil = require("../models/perfil.model");

const listarUsuarios = async (req, res = response) => {

    const { estado, termino, cod_perfil } = req.body;

    try {
        let whereClause = {};

        if (estado !== undefined) {
            if (estado === 2) {
                whereClause.estado = { [Op.in]: [0, 1] };
            } else if (estado === 0 || estado === 1) {
                whereClause.estado = estado;
            } else {
                return res.status(400).json({
                    ok: false,
                    data: null,
                    mensaje: 'Valor de estado no válido',
                });
            }
        }

        if (termino) {
            whereClause[Op.or] = [
                {
                    primer_nombre: { [Op.like]: `%${termino}%` },
                },
                {
                    segundo_nombre: { [Op.like]: `%${termino}%` },
                },
                {
                    apellido_paterno: { [Op.like]: `%${termino}%` },
                },
                {
                    apellido_materno: { [Op.like]: `%${termino}%` },
                },
            ];
        }

        if (cod_perfil !== 0) {
            whereClause.cod_perfil = cod_perfil;
        }

        const usuarios = await listarUsuariosPorEstado(whereClause);

        res.json({
            ok: true,
            data: usuarios,
            mensaje: 'Listado de usuarios correctamente',
        });
    } catch (error) {
        console.error('Error interno al listar usuarios:', error);
        res.status(500).json({
            ok: false,
            data: null,
            mensaje: 'Error interno al listar usuarios',
        });
    }
}

const registrarUsuario = async (req, res = response) => {

    try {
        const nuevoUsuario = req.body;
        const usuarioCreado = await Usuario.create(nuevoUsuario);

        await usuarioCreado.reload({
            include: [
                {
                    model: Perfil,
                    as: 'perfil',
                    attributes: ['cod_perfil', 'nombre_perfil'],
                },
            ],
        });

        res.status(201).json({
            ok: true,
            data: usuarioCreado,
            mensaje: 'Usuario registrado correctamente'
        });
    } catch (error) {
        console.error('Error interno al registrar usuario:', error);
        res.status(500).json({
            ok: false,
            data: null,
            mensaje: 'Error interno al registrar usuario'
        });
    }

}

const actualizarUsuario = async (req, res = response) => {

    const usuarioId = req.params.id;
    const datosActualizados = req.body;

    try {
        await Usuario.update(datosActualizados, {
            where: { cod_usuario: usuarioId },
        });

        // incluimos los campos del perfil
        const usuarioActualizado = await Usuario.findByPk(usuarioId, {
            include: [
                {
                    model: Perfil,
                    as: 'perfil',
                    attributes: ['cod_perfil', 'nombre_perfil'],
                },
            ],
        });

        // Línea importante para que el hook beforeUpdate se ejecute
        await usuarioActualizado.save();

        res.status(201).json({
            ok: true,
            data: usuarioActualizado,
            mensaje: 'Usuario actualizado correctamente'
        });
    } catch (error) {
        console.error('Error interno al actualizar usuario:', error);
        res.status(500).json({
            ok: false,
            data: null,
            mensaje: 'Error interno al actualizar usuario'
        });
    }
}

const eliminarUsuario = async (req, res = response) => {

    const usuarioId = req.params.id;

    try {
        await Usuario.update({ estado: 0 }, {
            where: { cod_usuario: usuarioId },
        });

        res.status(201).json({
            ok: true,
            data: true,
            mensaje: 'Usuario eliminado correctamente'
        });
    } catch (error) {
        console.error('Error interno al eliminar usuario:', error);
        res.status(500).json({
            ok: false,
            data: null,
            mensaje: 'Error interno al eliminar usuario'
        });
    }
}

async function listarUsuariosPorEstado(whereClause) {
    return Usuario.findAll({
        where: whereClause,
        include: [
            {
                model: Perfil,
                as: 'perfil',
                attributes: ['cod_perfil', 'nombre_perfil'],
            },
        ],
    });
}

module.exports = {
    registrarUsuario,
    actualizarUsuario,
    listarUsuarios,
    eliminarUsuario
}