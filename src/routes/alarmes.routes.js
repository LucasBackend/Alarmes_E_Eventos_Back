const { Router } = require('express');

const routes = Router();
const AlarmesController = require('../Controller/alarmesController')
const alarmescontroller = new AlarmesController()

routes.post('/celulose',alarmescontroller.alarmesCelulose)



module.exports = routes