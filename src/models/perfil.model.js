const { DataTypes, Model } = require('sequelize');

const { sequelize } = require('../db/config');

class Perfil extends Model { }

Perfil.init(
    {
        cod_perfil: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_perfil: {
            type: DataTypes.STRING(50),
        },
        descripcion_perfil: {
            type: DataTypes.STRING(200),
        },
        estado: {
            type: DataTypes.TINYINT,
            defaultValue: 1,
        },
        fecha_registro: {
            type: DataTypes.DATE,
        },
        fecha_modificacion: {
            type: DataTypes.DATE,
        },
    },
    {
        sequelize: sequelize,
        modelName: 'Perfil',
        tableName: 'Perfil',
        timestamps: false,
    }
);

module.exports = Perfil;

