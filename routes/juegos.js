const Router = require('express');
const { getJuegos, showJuego, crearJuego, editJuego } = require('../controllers/juegos');
const router = Router();

//Rutas de mi app
router.get('/', getJuegos);
router.get('/show/:id', showJuego );

router.get('/nav-create', (req,res) => res.render('create') );
router.post('/create', crearJuego );

router.get('/edit/:id', editJuego);

module.exports = router;