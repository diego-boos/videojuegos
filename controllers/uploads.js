const path = require("path");
const fs = require("fs");

const mostrarImagen = async (req, res = response) => {
  const { id } = req.params;

  req.getConnection((err, connection) => {
    connection.query(
      `SELECT imagen FROM juegos WHERE id = ${id}`,
      function (error, juegos, fields) {
        if (error) throw error;

        if (juegos[0].imagen !== null) {
          const pathImagen = path.join(
            __dirname,
            "../uploads",
            juegos[0].imagen
          );
          if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen);
          }
        }

        const pathImagen = path.join(__dirname, "../assets/no-image.jpg");
        res.sendFile(pathImagen);
      }
    );
  });
};

const cargarArchivos = (req, res) => {
  console.log(req.files);
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({ msg: "No hay archivos que subir" });
    return;
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  const { archivo } = req.files;
  const nombre = archivo.name;
  const uploadPath = path.join(__dirname, "../uploads/", nombre);

  // Use the mv() method to place the file somewhere on your server
  archivo.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ err });
    }

    res.json("El archivo se subió a" + uploadPath);
  });
};

const actualizarImagen = (req, res) => {
  const { id } = req.params;

  console.log(req.files);
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({ msg: "No hay archivos que subir" });
    return;
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  const { archivo } = req.files;
  const nombre = archivo.name;
  const uploadPath = path.join(__dirname, "../uploads/", nombre);

  // Use the mv() method to place the file somewhere on your server
  archivo.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ err });
    }
  });

  req.getConnection((err, connection) => {
    connection.query(
      `UPDATE juegos SET imagen = ${nombre} WHERE id = ${id}?`,
      (error, rows) => {
        if (error) throw error;

        res.json("Imagen Actualizada");
      }
    );
  });
};

module.exports = {
  mostrarImagen,
  cargarArchivos,
  actualizarImagen,
};
