'use strict'
module.exports = function(app, client) {
	var todoList = require('../controllers/todoListController');

	app.route('/envios')
		.get(todoList.obtener_envios)
		.post(todoList.crear_envio)

	app.route('/tasks/:taskId')
		.get(todoList.read_a_task)
		.put(todoList.update_a_task)
		.delete(todoList.delete_a_task)
};
