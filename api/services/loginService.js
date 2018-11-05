exports.isValidLogin = (username, password) => {
	return new Promise((resolve, reject) => {
		if (username == 'administrator' && password == 'password')
			return resolve(true);
		else
			resolve(false);
	})
}
