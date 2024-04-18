var express = require('express');
var router = express.Router();
const userHelpers = require('../helpers/userHelpers')

/* GET home page. */
router.get('^/$|index(.html)?|login', function(req, res, next) {
  res.render('frontend/login');
});

router.post('/login', (req, res) => {
  userHelpers.doLogin(req.body).then(() => {
    res.send('Login Success')
  }).catch(() => {
    res.send('Login error')
  })
})

router.get('/register', (req, res) => {
  res.render('frontend/register');
})

router.post('/register', (req, res) => {
  userHelpers.registerUser(req.body).then((createdUser) => {
    userHelpers.saveSession(createdUser, req.session)
    res.send('Registration success')
  }).catch(() => {
    res.render('frontend/register', {registerErr: true})
  })
})

module.exports = router;