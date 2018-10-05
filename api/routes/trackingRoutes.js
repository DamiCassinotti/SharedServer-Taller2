const express = require('express');
const trackingController = require('../controllers/trackingController');

const router = express.Router();

router.post('/', (req, res, then) => {
	trackingController.add_tracking()
		.then(tracking => res.status(201).json(tracking))
		.catch(err => res.status(500).json({
			code: 0,
			message: err
		}));
});

router.get('/', (req, res, then) => {
	trackingController.get_trackings()
		.then(trackings => res.status(200).json(trackings))
		.catch(err => res.status(500).json({
			code: 0,
			message: err
		}));
});

router.get('/:trackingId', (req, res) => {
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

router.put('/:trackingId', (req, res, then) => {
	const id_tracking = req.params.trackingId;
	const new_status = req.body.status;
	trackingController.update_tracking(id_tracking, new_status)
		.then(tracking => {
			if (!tracking)
				return res.status(200).json({
					code: 1,
					message: 'TrackingNotFound'
				});
			res.status(200).json(tracking)
		})
		.catch(err => res.status(500).json({
			code: 0,
			message: err
		}))
})

module.exports = router;
