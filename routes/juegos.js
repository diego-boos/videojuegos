const Router = require('express');
const { getJuegos, showJuego, crearJuego, editJuego, showEditJuego, deleteJuego } = require('../controllers/juegos');
const router = Router();

//Rutas de mi app
router.get('/', getJuegos);
router.get('/show/:id', showJuego );

router.get('/nav-create', (req,res) => res.render('create') );
router.post('/create', crearJuego );

router.get('/nav-edit/:id', showEditJuego);
router.post('/edit/:id', editJuego);

router.get('/delete/:id', deleteJuego);

module.exports = router;