
const router = require('express').Router();
// required routes for api router
const userRoute = require('./user-route.js');
const postRoute = require('./post-route.js');
const commentRoute = require('./comment-route.js')
// express routers with the declared /api/ query route
router.use('/users', userRoute);
router.use('/posts', postRoute);
router.use('/comments', commentRoute);

module.exports = router;