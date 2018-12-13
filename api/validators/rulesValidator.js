exports.isValidRule = (rule) => {
	if (!rule || !rule.description || !rule.description || !rule.condition || !rule.type || isNaN(rule.value) || (rule.type == 'multiply' && !rule.property))
		return false;
	return true;
};
