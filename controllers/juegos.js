
const getJuegos = (req, res) => {
  const url_icono = 'https://i.ibb.co/KF2SRQQ/icono.png';
  req.getConnection((err, connection) => {
    connection.query('SELECT * FROM juegos', function (error, juegos, fields) {
      if (error) throw error;
      res.render('index', {
        juegos: juegos,
        icono: url_icono,
      });

    });
  });
}

module.exports = {
  getJuegos
}