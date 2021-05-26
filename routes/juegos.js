const Router = require('express');
const { getJuegos } = require('../controllers/juegos');
const router = Router();

//Rutas de mi app
router.get('/', getJuegos);

module.exports = router;