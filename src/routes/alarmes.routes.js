const { Router } = require('express');

const routes = Router();
const AlarmesController = require('../Controller/alarmesController')
const alarmescontroller = new AlarmesController()



routes.post('/celulose',alarmescontroller.alarmesCelulose)
routes.post('/celulose/sistema',alarmescontroller.alarmesCeluloseSistema)
routes.post('/utilidades',alarmescontroller.alarmesUtilidades)
routes.post('/utilidades/sistema',alarmescontroller.alarmesUtilidadesSistema)



module.exports = routes