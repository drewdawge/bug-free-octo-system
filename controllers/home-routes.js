const router = require('express').Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  if (req.session.loggedIn) {
    // User is logged in, render content for logged-in users
    res.render('partials/expenses'); 
  } else {
    // User is not logged in, render content for non-logged-in users
    res.render('partials/login');
  }
});

  module.exports = router;