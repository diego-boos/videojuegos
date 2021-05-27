const Router = require('express');
const { cargarArchivos, mostrarImagen, actualizarImagen } = require('../controllers/uploads');
const router = Router();

//Rutas de mi app
router.get('/:id', mostrarImagen);    
router.post('/', cargarArchivos);
router.put('/:id', actualizarImagen);

module.exports = router;