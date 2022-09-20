const express = require('express');
const ctrl = require('../controllers/shows')

const router = express.Router();


// views
router.get('/shows/', ctrl.listAPI)
router.get('/shows/:id/', ctrl.detailAPI)

// stream api
router.get('/stream/:id/', ctrl.streamAPI)


module.exports = router;
