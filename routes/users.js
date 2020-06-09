var express = require('express');
var router = express.Router();
var userController = require('../controller/user.controller.js')
const auth = require('../middleware/auth')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/login', function(req, res) {

  res.render('login')
})

/* Register users */
router.post('/', userController.register)
/* Allow users to login. */
router.post('/login', userController.login)
/* Get user profile. */
router.get('/me', auth, async(req, res) => {
    // View logged in user profile
    res.render('me', {user: req.user})
})
/* Logout the user */
router.post('/logout', function(req, res) {
  res.send('Logout')
})
/* Logout from all devices. */
router.post('/logoutall', function(req, res) {
  res.send('Logout from all devices.')
})
module.exports = router;
