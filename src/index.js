const app = require("./app/app")
const { dbConnection } = require('./db/config');

// Conectamos la base de datos
dbConnection();

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`---- Server corriendo en el puesto ${port}`)
})