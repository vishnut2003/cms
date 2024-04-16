var express = require('express');
var router = express.Router();
const userHelpers = require('../helpers/userHelpers')

/* GET home page. */
router.get('^/$|index(.html)?', function(req, res, next) {
  res.render('frontend/login');
});

router.get('/register', (req, res) => {
  res.render('frontend/register');
})

router.post('/register', (req, res) => {
  userHelpers.registerUser(req.body)
  res.send('User Successfully Registerd')
})

module.exports = router;