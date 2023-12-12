const { Router } = require('express');

const routes = Router();
const EventosController = require('../Controller/eventosController')
const eventoscontroller = new EventosController()

routes.post('/celulose',eventoscontroller.eventosCelulose)
routes.post('/utilidades',eventoscontroller.eventosUtilidades)




module.exports = routes