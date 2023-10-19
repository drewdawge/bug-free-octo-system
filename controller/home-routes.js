const router = require('express').Router();
const User = require('../models/User');

// need to add Get route for pulling up expense list

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });

  module.exports = router;