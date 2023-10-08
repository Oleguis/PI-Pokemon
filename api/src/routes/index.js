const { Router } = require('express')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const pokemonRoute = require('./pokemon')
const tiposRoute = require('./tipos')

const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemon', pokemonRoute)
router.use('/tipos', tiposRoute)

module.exports = router
