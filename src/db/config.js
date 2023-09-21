const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('meanapp_db', 'admin', 'admin2023$', {
  host: 'calzatec-database.c1ftc1fuxqvn.us-east-1.rds.amazonaws.com',
  dialect: 'mysql',
  port: 3306
})

const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('La conexión se ha establecido exitosamente.');
    } catch (error) {
        throw new Error('Hubo un error al iniciar la base de datos');
    }
}

module.exports = { 
    dbConnection,
    sequelize
};