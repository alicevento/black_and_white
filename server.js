const express = require("express");
const fs = require("fs");
const Jimp = require("jimp");
const uuid = require("uuid");

//instanciar express
const app = express();
//levantar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
  });

//middlewares
app.use("/css", express.static(__dirname + "/public/assets/css"));

// Paso 0 Cargar el index.html desde el servidor
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

 app.get("/cargar", async (req, res) => {
    try {
        const url = req.query.imagen_url;
        console.log(url);
    }
    catch (error) {
      res.status(500).send(error.message);
    }
 });

//  const nombre = uuid.v4();
// console.log("Codigo UUID: ", identificador)
//     parcial = identificador.slice(identificador.length - 6)
//     console.log(identificador.length)
//     console.log("Últimos 6 digitos del UUID: ", parcial)




 