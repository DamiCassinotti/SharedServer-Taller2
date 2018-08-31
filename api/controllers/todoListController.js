'use strict'

var pg = require('pg'),
	connectionString = process.env.DATABASE_URL || 'postgres://damian:password@localhost:5432/damian',
	client = new pg.Client(connectionString);

client.connect();

exports.list_all_tasks = function(req, res) {
	client.query('SELECT * FROM test_table')
		.then(tasks => res.json(tasks.rows))
		.catch(e => res.json({state: 'ERROR' + e.stack}))
	/*try {
		var tasks = client.query('SELECT * FROM envios');
		res.json({state: 'OK'});
	} catch(err) {
		console.error(err);
		res.send(err);
	}*/
};

exports.create_a_task = function(req, res) {
	res.json({msg: 'create a task'});
	/*var new_task = new Task(req.body);
	new_task.save(function(err, task) {
		if (err)
			res.send(err);
		res.json(task);
	})*/
};

exports.read_a_task = function(req, res) {
	res.json({msg: 'read a task'});
	/*Task.findById(req.params.taskId, function(err, task) {
		if (err)
			res.send(err);
		res.json(task);
	})*/
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
