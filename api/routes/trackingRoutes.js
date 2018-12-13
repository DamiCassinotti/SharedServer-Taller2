const express = require('express');
const jwt = require('jsonwebtoken');
const trackingController = require('../controllers/trackingController');

const router = express.Router();

router.post('/', (req, res, then) => {
	trackingController.add_tracking()
		.then(tracking => res.status(201).json(tracking))
		.catch(error => {console.log(error); then({name: 'UnexpectedError'});});
});

router.get('/', (req, res, then) => {
	trackingController.get_trackings()
		.then(trackings => res.status(200).json(trackings))
		.catch(error => {console.log(error); then({name: 'UnexpectedError'});});
});

router.get('/:trackingId', (req, res, then) => {
	const id_tracking = req.params.trackingId;
	trackingController.get_tracking(id_tracking)
		.then(tracking => {
			if (!tracking || !tracking.length)
				return res.status(404).json({
					code: 1,
					message: 'TrackingNotFound'
				});
			res.status(200).json(tracking);
		})
		.catch(error => {console.log(error); then({name: 'UnexpectedError'});});
});

router.put('/:trackingId', (req, res, then) => {
	const id_tracking = req.params.trackingId;
	const new_status = req.body.status;
	if (!new_status)
		return then({name: 'ParametersError'});
	trackingController.update_tracking(id_tracking, new_status)
		.then(tracking => {
			if (!tracking)
				return res.status(404).json({
					code: 2,
					message: 'TrackingNotFound'
				});
			res.status(200).json(tracking)
		})
		.catch(error => {console.log(error); then({name: 'UnexpectedError'});});
})

module.exports = router;
