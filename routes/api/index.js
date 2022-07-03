//Import express router
const router = require('express').Router();

//Import thought and user routes
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

//Tell router to use thought and user routes
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

//export router
module.exports = router;