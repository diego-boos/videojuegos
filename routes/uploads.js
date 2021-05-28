const Router = require('express');
const mostrarImagen = require('../controllers/uploads');
const router = Router();

//Rutas de mi app
router.get('/:id', mostrarImagen);    

module.exports = router;