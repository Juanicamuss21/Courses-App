const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const canalRouter = require("./canalRouter")
const videosRouter = require('./videosRouter')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
 router.use('/', canalRouter);
 router.use('/', videosRouter);


module.exports = router;
