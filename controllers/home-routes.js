const router = require('express').Router();
const { Username, Expense } = require('../models');

router.get('/', async (req, res) => {
  if (req.session.loggedIn) {
    try {
      const userId = req.session.userId;
      const expenses = await Expense.findAll({ where: { userId } });
      res.render('partials/expenses', { expenses });
    } catch (error) {
      console.error('Error fetching expenses:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    // User is not logged in, render content for non-logged-in users
    res.render('partials/login');
  }
});

  module.exports = router;