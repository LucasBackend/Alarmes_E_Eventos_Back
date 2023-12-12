const {Router} = require('express');

const routesAlarmes = require('./alarmes.routes.js')
const routesEventos = require('./eventos.routes')


const routers = Router();

routers.use('/alarmes',routesAlarmes)
routers.use('/eventos',routesEventos)

module.exports = routers