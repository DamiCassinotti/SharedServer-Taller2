exports.isValidServerForAdding = (server) => {
	if (!server || !server.createdBy || !server.name)
		return false;
	return true;
}

exports.isValidServerForUpdating = (server) => {
	if (!server || !server.name || isNaN(server._rev))
		return false;
	return true;
}
