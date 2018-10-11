exports.isValidServerForAdding = (server) => {
	if (!server || !server.createdBy || !server.name)
		return false;
	return true;
}
