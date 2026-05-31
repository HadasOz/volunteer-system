const express = require('express');
const router = express.Router();

const volunteerRoutes = require('../src/routes/volunteers');
const requestRoutes = require('../src/routes/requests');

router.use('/volunteers', volunteerRoutes);
router.use('/requests', requestRoutes);

module.exports = router;

