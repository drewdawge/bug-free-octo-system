const router = require('express').Router();
const { Username, Expense } = require('../models');

router.get('/', async (req, res) => {
  if (req.session.loggedIn) {
    // User is logged in, render content for logged-in users. Need to add object remderomg with partials/expenses
    res.render('partials/expenses',  ); 
  } else {
    // User is not logged in, render content for non-logged-in users
    res.render('partials/login');
  }
});

  module.exports = router;