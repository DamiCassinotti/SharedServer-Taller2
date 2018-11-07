exports.isValidLogin = (login) => {
	if (!login || !login.username || !login.password)
		return false;
	return true;
}
