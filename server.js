const express = require('express')

//instanciar express
const app = express();

//levantar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});