const express = require('express');
const trackingController = require('../controllers/trackingController');

const router = express.Router();

router.post('/', async (req, res, then) => {
	const tracking = await trackingController.add_tracking();
	res.status(201).send(tracking);
});

router.get('/', async (req, res, then) => {
	const trackings = await trackingController.get_trackings();
	res.status(200).send(trackings);
});

router.get('/:trackingId', async (req, res, then) => {
	const id_tracking = req.params.trackingId;
	trackingController.get_tracking(id_tracking)
		.then(tracking => {
			if (!tracking)
				return res.status(200).json({
					code: 1,
					message: 'TrackingNotFound'
				});
			res.status(200).json(tracking);
		})
		.catch(err => res.status(500).json({
			code: 0,
			message: err
		}))

});

module.exports = router;

/*module.exports = function(app) {


	app.route('/tracking')
		.post(async (req, res) => {
			var tracking = await trackingController.addTracking();
			res.status(201).json(tracking);
			trackingController.addTracking()
				.then(user => res.status(201).json(user))
				.catch(err => res.status(500).json({
					code: 0,
					message: err.message
				}));
		})
		.get(trackingController.get_trackings)

	app.route('/tracking/:trackingId')
		.get(trackingController.get_tracking)
		.put(trackingController.update_tracking)

};*/
