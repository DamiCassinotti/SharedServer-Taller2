'use strict'
module.exports = function(app, client) {
	var todoList = require('../controllers/enviosController');

	app.route('/envios')
		.get(todoList.obtener_envios)
		.post(todoList.crear_envio)

	app.route('/envios/:envioId')
		.get(todoList.obtener_envio)
		.put(todoList.actualizar_envio)
		.delete(todoList.eliminar_envio)
};
