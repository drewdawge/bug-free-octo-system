const router = require('express').Router();
const Expense = require('../models');

// need to add Get route for pulling up expense list

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });