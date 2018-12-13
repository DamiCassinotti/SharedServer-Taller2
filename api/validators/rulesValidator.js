exports.isValidRule = (rule) => {
	if (!rule || !rule.description || !rule.description || !rule.condition || !rule.type || !rule.value || (rule.type == 'multiply' && !rule.property))
		return false;
	return true;
};
