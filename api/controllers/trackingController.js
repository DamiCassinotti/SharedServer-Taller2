const trackingService = require('../services/trackingService')

exports.add_tracking = () => {
	return new Promise((resolve, reject) => {
		trackingService.addTracking()
			.then(tracking => resolve(tracking))
			.catch(err => reject(err))
	});
}

exports.get_trackings = () => {
	return new Promise((resolve, reject) => {
		trackingService.get_trackings()
			.then(trackings => resolve(trackings))
			.catch(err => reject(err))
	});
}

exports.get_tracking = (id_tracking) => {
	return new Promise((resolve, reject) => {
		trackingService.get_tracking(id_tracking)
			.then(tracking => resolve(tracking))
			.catch(err => reject(err))
	});
}

exports.update_tracking = (id_tracking, status) => {
	return new Promise((resolve, reject) => {
		trackingService.update_tracking(id_tracking, status)
			.then(tracking => resolve(tracking))
			.catch(err => reject(err))
	});
}
