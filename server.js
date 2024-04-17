const express = require("express");
const app = express();
const fs = require("fs");
const Jimp = require("jimp");
const uuid = require("uuid");
const path = require("path");

//levantar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/cargar", async (req, res) => {
  //capturar la url de la imagen
  const url = req.query;
  console.log(url);

  const imagenCapturada = "captura.jpg"; //procesamiento de la imagen
  console.log(imagenCapturada);

  const data = fs.readFileSync(url);
  // console.log("Valor de data: ", data);

  // calcular el tamaño de la imagen en varias unidades
  const fileSizeBytes = data.length; // tamaño del archivo en bytes
  const fileSizeKB = fileSizeBytes / 1024; // Convertir bytes a kilobytes
  const fileSizeMB = fileSizeKB / 1024; // Convertir kilobytes a megabytes
  console.log("Tamaño del archivo en bytes:", fileSizeBytes);
  console.log("Tamaño del archivo en KB:", fileSizeKB.toFixed(2));
  console.log("Tamaño del archivo en MB:", fileSizeMB.toFixed(2));

  // obtener extension del archivo enviado como parametro
  const extension = path.extname("imagen_url");
  console.log("Extensión del archivo:", extension);

  // validar para evitar procesar imagenes de mas de 10mb

  if (fileSizeMB > 5.0) {
    console.log(chalk.white.bgRed.bold("Archivo excede el limite 5MB"));
    res.send({ error: "No puede procesarse imagen excede el limite 5mb" });
  } else {
    if (extensionesPermitidas.includes(extension)) {
      // imagen puede ser procesada por tamaño y extension
      const IMG = await Jimp.read(object.imagen_url);
      await IMG.resize(350, Jimp.AUTO).greyscale().writeAsync(imagenCapturada);
      res.sendFile(__dirname + "/" + imagenCapturada);
    } else {
      console.log(
        chalk.white.bgRed.bold(
          "Extension " +
            extension +
            " no soportada, solo: " +
            extensionesPermitidas.join(" - ")
        )
      );
      res.send({
        error: "No puede procesarse imagen excede el limite 5mb",
        extensiones: extensionesPermitidas,
      });
    }
  }
});

//middlewares
app.use("/front", express.static(__dirname + "/public"));

// Paso 0 Cargar el index.html desde el servidor

//  const nombre = uuid.v4();
// console.log("Codigo UUID: ", identificador)
//     parcial = identificador.slice(identificador.length - 6)
//     console.log(identificador.length)
//     console.log("Últimos 6 digitos del UUID: ", parcial)

// probaremos con una imagen en la ruta raiz del proyecto
app.get("/load", async (req, res) => {
  const { imagen } = req.query; // capturo el nombre de archivo desde la url
  const nombreDeLaImagen = `salida.jpg`; // nombre del resultado del procesamiento
  // leer el archivo que esta en la carpeta raiz
  const data = fs.readFileSync(imagen);
  //console.log("Valor de data: ", data);

  // calcular el tamaño de la imagen en varias unidades
  const fileSizeBytes = data.length; // tamaño del archivo en bytes
  const fileSizeKB = fileSizeBytes / 1024; // Convertir bytes a kilobytes
  const fileSizeMB = fileSizeKB / 1024; // Convertir kilobytes a megabytes
  console.log("Tamaño del archivo en bytes:", fileSizeBytes);
  console.log("Tamaño del archivo en KB:", fileSizeKB.toFixed(2));
  console.log("Tamaño del archivo en MB:", fileSizeMB.toFixed(2));

  // obtener extension del archivo enviado como parametro
  const extension = path.extname(imagen);
  console.log("Extensión del archivo:", extension);

  // validar para evitar procesar imagenes de mas de 10mb

  if (fileSizeMB > 5.0) {
    console.log(chalk.white.bgRed.bold("Archivo excede el limite 5MB"));
    res.send({ error: "No puede procesarse imagen excede el limite 5mb" });
  } else {
    if (extensionesPermitidas.includes(extension)) {
      // imagen puede ser procesada por tamaño y extension
      const IMG = await Jimp.read(imagen);
      await IMG.resize(350, Jimp.AUTO).greyscale().writeAsync(nombreDeLaImagen);
      res.sendFile(__dirname + "/" + nombreDeLaImagen);
    } else {
      console.log(
        chalk.white.bgRed.bold(
          "Extension " +
            extension +
            " no soportada, solo: " +
            extensionesPermitidas.join(" - ")
        )
      );
      res.send({
        error: "No puede procesarse imagen excede el limite 5mb",
        extensiones: extensionesPermitidas,
      });
    }
  }
});
