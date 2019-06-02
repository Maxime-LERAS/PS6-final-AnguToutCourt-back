const { Router } = require('express');
const ReviewRouter = require('./reviews');

const router = new Router();
router.get('/status', (req, res) => res.status(200).json('ok'));
router.use('/reviews', ReviewRouter);

module.exports = router;
