const {Router} = require('express');

const routesAlarmes = require('./alarmes.routes.js')


const routers = Router();

routers.use('/alarmes',routesAlarmes)

module.exports = routers