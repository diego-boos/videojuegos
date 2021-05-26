const Router = require('express');
const {cargarArchivos,mostrarImagen} = require('../controllers/uploads');
const router = Router();

//Rutas de mi app
router.post('/', cargarArchivos);
router.get('/:id', mostrarImagen);

module.exports = router;