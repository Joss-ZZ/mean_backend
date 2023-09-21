const { Sequelize, DataTypes, Model } = require('sequelize');
const Perfil = require('./perfil.model');

const { sequelize } = require('../db/config');

class Usuario extends Model {}

Usuario.init(
    {
        cod_usuario: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          autoIncrement: true,
        },
        cod_perfil: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        primer_nombre: {
          type: DataTypes.STRING(200),
        },
        segundo_nombre: {
          type: DataTypes.STRING(200),
        },
        apellido_paterno: {
          type: DataTypes.STRING(200),
        },
        apellido_materno: {
          type: DataTypes.STRING(200),
        },
        correo: {
          type: DataTypes.STRING(100),
        },
        contrasena: {
          type: DataTypes.STRING(100),
        },
        estado: {
          type: DataTypes.TINYINT,
          defaultValue: 1,
        },
        fecha_registro: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        fecha_modificacion: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize: sequelize,
        modelName: 'Usuario',
        timestamps: false,
      }
);

Usuario.belongsTo(Perfil, {
    foreignKey: 'cod_perfil',
    as: 'perfil'
});

Usuario.beforeUpdate((usuario, options) => {
  usuario.fecha_modificacion = new Date();
});
  
module.exports = Usuario;