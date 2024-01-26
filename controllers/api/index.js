const router = require('express').Router();
const userRoutes = require('./userRoutes');
const itemRoutes = require('./itemRoutes');
const listRoutes = require('./listRoutes');

router.use('/users', userRoutes);
router.use('/items', itemRoutes);
router.use('/lists', listRoutes);

module.exports = router;
