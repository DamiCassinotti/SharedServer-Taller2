'use strict'

exports.obtener_envios = function(req, res) {
	var query = {
		text: 'SELECT * FROM envios'
	}
	client.query(query)
		.then(tasks => res.status(200).json(tasks.rows))
		.catch(e => res.json({state: 'ERROR ' + e.stack}));
};

exports.crear_envio = function(req, res) {
	var query = {
		text: 'INSERT INTO envios(desde, hasta) values($1, $2)',
		values: [req.body.desde, req.body.hasta]
	}
	client.query(query)
		.then(tasks => res.status(200).json(tasks.rows))
		.catch(e => res.json({state: 'ERROR ' + e.stack}));
};

exports.read_a_task = function(req, res) {
	/*client.query('SELECT * FROM test_table where id = $1', req.params.taskId)
		.then(tasks => res.json(tasks.rows))
		.catch(e => res.json({state: 'ERROR ' + e.stack}))*/
};

exports.update_a_task = function(req, res) {
	res.json({msg: 'update a task'});
	/*Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
		if (err)
			res.send(err);
		res.json(task);
	})*/
}

exports.delete_a_task = function(req, res) {
	res.json({msg: 'delete a task'});
	/*Task.remove({_id: req.params.taskId}, function(err, task) {
		if (err)
			res.send(err);
		res.json({message: 'Task deleted'});
	})*/
}

function executeSimpleQueryAndReturnRows(query, req, res) {
	client.query(query)
		.then(tasks => res.json(tasks.rows))
		.catch(e => res.json({state: 'ERROR ' + e.stack}));
}
