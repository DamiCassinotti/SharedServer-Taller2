'use strict'
module.exports = function(app, client) {
	var tracking = require('../controllers/enviosController');

	app.route('/api/tracking')
		.get(tracking.obtener_envio)
		.put(tracking.actualizar_envio)
		.delete(tracking.eliminar_envio)

	app.route('/api/tracking/:envioId')
		.get(tracking.obtener_envio)
		.put(tracking.actualizar_envio)
		.delete(tracking.eliminar_envio)
};
