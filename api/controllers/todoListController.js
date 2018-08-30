'use strict'

exports.list_all_tasks = async function(req, res) {
	try {
		var tasks = await client.query('SELECT * FROM envios');
		res.json(tasks);
	} catch(err) {
		console.error(err);
		res.send(err);
	}
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
