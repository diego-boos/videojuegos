const path = require('path');

const getJuegos = (req, res) => {
  const url_icono = 'https://i.ibb.co/KF2SRQQ/icono.png';
  req.getConnection((err, connection) => {
    connection.query('SELECT * FROM juegos', (error, juegos) =>  {
      if (error) throw error;
      res.render('index', {
        juegos: juegos,
        icono: url_icono,
      });
    });
  });
}

const showJuego = (req, res) => {

  const { id } = req.params; 

  req.getConnection((err, connection) => {
    connection.query(`SELECT * FROM juegos WHERE id = ${id}`, (error, juegos) => {
      if (error) throw error;
      res.render('show', {
        juego: juegos[0],
      });
    });
  });
}

const crearJuego = (req,res) => {
  
  console.log(req.files);
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.imagen) {
    res.status(400).json({ msg: "No hay imagenes para subir" });
    return;
  }
  
  // EXTRAE LA IMAGEN, NOMBRE Y LA CARPETA DONDE SE VA A GUARDAR
  const { imagen } = req.files;
  const nombreImagen = imagen.name;
  const uploadPath = path.join(__dirname, "../uploads/", nombreImagen);
  
  // MUEVE LA IMAGEN A LA CARPETA
  imagen.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ err });
    }
  });
  
  // EXTRAE LOS DATOS QUE SE ENVIAN POR EL FORMULARIO
  const datosFormulario = req.body;
  // CONSTRUYE EL OBJETO DEL JUEGO PARA PODER GRABARLO EN LA BASE DE DATOS
  const datosJuego = {nombre: datosFormulario.nombre, descripcion: datosFormulario.descripcion, desarrollador: datosFormulario.desarrollador, genero: datosFormulario.genero, imagen: nombreImagen}
 
  req.getConnection((err, connection) => {
    connection.query('INSERT INTO juegos set ?', [datosJuego], (error, juegos) => {
      if (error) throw error;
      res.redirect('/');
    });
  });
}

const editJuego = (req, res) => {
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

module.exports = {
  getJuegos,
  showJuego,
  crearJuego,
  editJuego
}