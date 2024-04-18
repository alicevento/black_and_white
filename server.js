const express = require("express");
const app = express();
const fs = require("fs");
const Jimp = require("jimp");
const uuid = require("uuid");
const path = require("path");

// const renombrar = uuid.v4();
//levantar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express iniciado en el puerto ${PORT}`);
});
//creando carpeta pública
app.use("/front", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/cargar", async (req, res) => {
  //capturar la url de la imagen
  const { imagen_url } = req.query;
  console.log(req.query);

//Para verificar si la URL esta vacía o termine en .jpg o .png
const validarExtension = /\.(jpg|png|gif)$/i;

//Verificamos si la extension es .jpg o .png:
if (!validarExtension.test(imagen_url)) {
    // if (imagen_url.startsWith("http")) {
  res.status(400).send("La URL está vacía o no termina en.jpg, .png o .gif. Intenta de nuevo");
  return;
    // } else {
    //     res.status(400).send("El archivo no se encontró en la ruta raíz");
    //     return;
    // }
}

//Capturamos la imagen

  try {
    const imagenCapturada = `img${uuid.v4().slice(0, 6)}.jpg`; //renombramos la imagen con UUID
    const imagen = await Jimp.read(imagen_url)

    await imagen 
    .resize(350, Jimp.AUTO)
    .grayscale()
    .writeAsync(`${imagenCapturada}`)
    
    res.sendFile(__dirname + "/" + imagenCapturada);
  } catch (error) {
    console.log('Mensaje de error: ', error);
  }

});

//Probar con esta url: https://en.meming.world/images/en/3/3f/This_Is_Fine.jpg
//URL que no tiene jpg o png: https://getbootstrap.com/docs/5.3/getting-started/introduction/





//   const data = fs.readFileSync(url);
//   // console.log("Valor de data: ", data);

//   // calcular el tamaño de la imagen en varias unidades
//   const fileSizeBytes = data.length; // tamaño del archivo en bytes
//   const fileSizeKB = fileSizeBytes / 1024; // Convertir bytes a kilobytes
//   const fileSizeMB = fileSizeKB / 1024; // Convertir kilobytes a megabytes
//   console.log("Tamaño del archivo en bytes:", fileSizeBytes);
//   console.log("Tamaño del archivo en KB:", fileSizeKB.toFixed(2));
//   console.log("Tamaño del archivo en MB:", fileSizeMB.toFixed(2));
//   // obtener extension del archivo enviado como parametro
//   const extension = path.extname("imagen_url");
//   console.log("Extensión del archivo:", extension);

//   // validar para evitar procesar imagenes de mas de 10mb

//   if (fileSizeMB > 5.0) {
//     console.log(chalk.white.bgRed.bold("Archivo excede el limite 5MB"));
//     res.send({ error: "No puede procesarse imagen excede el limite 5mb" });
//   } else {
//     if (extensionesPermitidas.includes(extension)) {
//       // imagen puede ser procesada por tamaño y extension
//       const IMG = await Jimp.read(imagenCapturada);
//       await IMG.resize(350, Jimp.AUTO).greyscale().writeAsync(imagenCapturada);
//       res.sendFile(__dirname + "/" + imagenCapturada);
//     } else {
//       console.log(
//         chalk.white.bgRed.bold(
//           "Extension " +
//             extension +
//             " no soportada, solo: " +
//             extensionesPermitidas.join(" - ")
//         )
//       );
//       res.send({
//         error: "No puede procesarse imagen excede el limite 5mb",
//         extensiones: extensionesPermitidas,
//       });
//     }
//   }
// });

