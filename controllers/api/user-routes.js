const router = require('express').Router();
const { Username, Expense } = require('../../models');

// CREATE new user
router.post('/new_user', async (req, res) => {
  try {
    const dbUserData = await Username.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const userData = await Username.findOne({ where: { username } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect username or password' });
      return;
    }
    const validPassword = userData.checkPassword(password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password' });
      return;
    }

    req.session.save(() => {
          req.session.loggedIn = true;
          req.session.userId = userData.id; 

          res.status(200).json({ username: userData, message: 'You are now logged in' });
        });
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
      req.session.userId = null;
      res.json({ message: 'Logout successful' });
      res.redirect('/');
  } else {
    res.status(404).end();
  }
});

// Route to fetch expenses
router.get('/expenses', async (req, res) => {
  if (req.session.loggedIn) {
    try {
      const userId = req.session.userId;
      const expenses = await Expense.findAll({ where: { userId } });
      res.status(200).json({ expenses, loggedIn: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Route to add expense
router.post('/addExpense', async (req, res) => {
  const { date, item, amount } = req.body;
  if (!date || !item || !amount) {
    return res.status(400).json({ error: 'All fields are required' });
  }
    try {
    const newExpense = await Expense.create({
      date: date,
      item: item,
      amount: amount,
      userid: req.session.userId,
    });
    
    console.log('New expense added:', newExpense);
    
    res.status(201).json(newExpense); 
  } catch (err) {
    console.error('Error adding expense:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE expense
router.delete('/expenses/:id', async (req, res) => {
  try {
    const userId = req.session.userId;
    const expenseId = req.params.id;
    const expense = await Expense.findOne({ where: { id: expenseId, userId } });

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    await expense.destroy();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;