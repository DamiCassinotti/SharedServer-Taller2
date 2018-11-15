exports.isValidDelivery = (delivery) => {
	if (!delivery || !delivery.ammount || !delivery.distance || !delivery.user
		|| !delivery.user.deliveries || !delivery.user.email || isNaN(delivery.user.points))
		return false;
	return true;
}
