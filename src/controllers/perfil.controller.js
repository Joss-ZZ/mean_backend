const { response } = require("express");
const { Op } = require('sequelize');
const Perfil = require("../models/perfil.model");

const listarPerfiles = async (req, res = response) => {

    const { estado } = req.params;

    try {
        let whereClause = {};

        if (estado === '2') {
            whereClause.estado = { [Op.in]: [0, 1] };
        } else if (estado === '0' || estado === '1') {
            whereClause.estado = estado;
        } else {
            return res.status(400).json({
                ok: false,
                data: null,
                mensaje: 'Valor de estado no válido',
            });
        }

        const perfiles = await Perfil.findAll({
            where: whereClause,
            attributes: ['cod_perfil', 'nombre_perfil'],
        });

        res.json({
            ok: true,
            data: perfiles,
            mensaje: 'Listado de perfiles correctamente',
        });
    } catch (error) {
        console.error('Error interno al listar perfiles:', error);
        res.status(500).json({
            ok: false,
            data: null,
            mensaje: 'Error interno al listar perfiles',
        });
    }
}

module.exports = {
    listarPerfiles,
}