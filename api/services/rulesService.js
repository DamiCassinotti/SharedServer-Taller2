exports.getRules = () => {
	return new Promise((resolve, reject) => {
		var query = {
			text: 'select * from rules order by position asc;'
		}
		client.query(query)
			.then((data) => resolve(data.rows))
			.catch((err) => reject(err));
	});
}

exports.addRule = (rule) => {
	return new Promise((resolve, reject) => {
		var query = {
			text: 'insert into rules (description, position, condition, type, value, property) values ($1, $2, $3, $4, $5, $6) returning *',
			values: [rule.description, rule.position, rule.condition, rule.type, rule.value, rule.property]
		}
		client.query(query)
			.then((data) => resolve(data.rows))
			.catch((err) => reject(err));
	});
}

exports.getRule = (idRule) => {
	return new Promise((resolve, reject) => {
		var query = {
			text: 'select * from rules where id = $1;',
			values: [idRule]
		}
		client.query(query)
			.then((data) => resolve(data.rows[0]))
			.catch((err) => reject(err));
	});
}

exports.editRule = (idRule, rule) => {
	return new Promise((resolve, reject) => {
		var query = {
			text: 'update rules set description = $2, position = $3, condition = $4, type = $5, value = $6, property = $7 where id = $1 returning *;',
			values: [idRule, rule.description, rule.position, rule.condition, rule.type, rule.value, rule.property]
		}
		client.query(query)
			.then((data) => resolve(data.rows[0]))
			.catch((err) => reject(err));
	});
}

exports.deleteRule = (idRule) => {
	return new Promise((resolve, reject) => {
		var query = {
			text: 'delete from rules where id = $1 returning *;',
			values: [idRule]
		}
		client.query(query)
			.then((data) => resolve(data.rows[0]))
			.catch((err) => reject(err));
	});
}
