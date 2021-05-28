const path = require("path");
const fs = require("fs");

const getJuegos = (req, res) => {
  const url_icono = 'https://i.ibb.co/rQbW5Hj/icon.png';
  req.getConnection((err, connection) => {
    connection.query("SELECT * FROM juegos", (error, juegos) => {
      if (error) throw error;
      res.render("index", {
        juegos: juegos,
        icono: url_icono,
      });
    });
  });
};

const showJuego = (req, res) => {
  const { id } = req.params;

  req.getConnection((err, connection) => {
    connection.query(
      `SELECT * FROM juegos WHERE id = ${id}`,
      (error, juegos) => {
        if (error) throw error;
        res.render("show", {
          juego: juegos[0],
        });
      }
    );
  });
};

const crearJuego = (req, res) => {
  console.log(req.files);
  let nombreImagen = '';
  if (req.files !== null) {
    // EXTRAE LA IMAGEN, NOMBRE Y LA CARPETA DONDE SE VA A GUARDAR
    const { imagen } = req.files;
    nombreImagen = imagen.name;
    const uploadPath = path.join(__dirname, "../uploads/", nombreImagen);
    
    // MUEVE LA IMAGEN A LA CARPETA
    imagen.mv(uploadPath, (err) => {
      if (err) {
        return res.status(500).json({ err });
      }
    });
  } else {
    nombreImagen = null
  }

  // EXTRAE LOS DATOS QUE SE ENVIAN POR EL FORMULARIO
  const datosFormulario = req.body;
  // CONSTRUYE EL OBJETO DEL JUEGO PARA PODER GRABARLO EN LA BASE DE DATOS
  const datosJuego = {
    nombre: datosFormulario.nombre,
    descripcion: datosFormulario.descripcion,
    desarrollador: datosFormulario.desarrollador,
    genero: datosFormulario.genero,
    imagen: nombreImagen,
  };

  req.getConnection((err, connection) => {
    connection.query(
      "INSERT INTO juegos set ?",
      [datosJuego],
      (error, juegos) => {
        if (error) throw error;
        res.redirect("/");
      }
    );
  });
};

const showEditJuego = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query(`SELECT * FROM juegos WHERE id=${id}`, (error, juegos) => {
      if (error) throw error;
      res.render('edit', {
        juego: juegos[0],
      });
    });
  });
};

const editJuego = (req, res) => {
  console.log(req.files);
  let nombreImagen = '';
  if (req.files !== null) {    
    // EXTRAE LA IMAGEN, NOMBRE Y LA CARPETA DONDE SE VA A GUARDAR
    const { imagen } = req.files;
    nombreImagen = imagen.name;
    const uploadPath = path.join(__dirname, "../uploads/", nombreImagen);
    
    // MUEVE LA IMAGEN A LA CARPETA
    imagen.mv(uploadPath, (err) => {
      if (err) {
        return res.status(500).json({ err });
      }
    });
  } else {
    nombreImagen = null
  }

  const { id } = req.params;
  // EXTRAE LOS DATOS QUE SE ENVIAN POR EL FORMULARIO
  const datosFormulario = req.body;
  // CONSTRUYE EL OBJETO DEL JUEGO PARA PODER GRABARLO EN LA BASE DE DATOS
  const datosJuego = {nombre: datosFormulario.nombre, descripcion: datosFormulario.descripcion, desarrollador: datosFormulario.desarrollador, genero: datosFormulario.genero, imagen: nombreImagen}
  req.getConnection((err, connection) => {
    connection.query(`SELECT * FROM juegos WHERE id=${id}`, (error, juegos) => {
      if (error) throw error;
      // Limpiar imagen
      if (juegos[0].imagen != null) {
        //Borrar imagen
        const pathImagen = path.join(__dirname, "../uploads", juegos[0].imagen);
        // Si existe la elimina
        if (fs.existsSync(pathImagen)) {
          fs.unlinkSync(pathImagen);
        }
      }
    });
    connection.query('UPDATE juegos set ? WHERE id=?', [datosJuego, id], (error, juegos) => {
      if (error) throw error;
      res.redirect('/');
    });
  });
};


const deleteJuego = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query(`SELECT * FROM juegos WHERE id=${id}`, (error, juegos) => {
      if (error) throw error;
      // Limpiar imagen
      if (juegos[0].imagen != null) {
        //Borrar imagen
        const pathImagen = path.join(__dirname, "../uploads", juegos[0].imagen);
        // Si existe la elimina
        if (fs.existsSync(pathImagen)) {
          fs.unlinkSync(pathImagen);
        }
      }
    });
    connection.query(`DELETE FROM juegos WHERE id=${id}`, (error, juegos) => {
      if (error) throw error;
      res.redirect("/");
    });
  });
};

module.exports = {
  getJuegos,
  showJuego,
  crearJuego,
  editJuego,
  showEditJuego,
  deleteJuego,
};
