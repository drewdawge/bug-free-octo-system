const router = require('express').Router();
const { User, Expense } = require('../../models');

// Authentication
router.get('/user_auth', (req, res) => {
  if (req.session.loggedIn) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

// CREATE new user
router.post('/new_user', async (req, res) => {
  try {
    const dbUserData = await User.create({
      email: req.body.email,
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
    const { email, password } = req.body;
    const userData = await User.findOne({ where: { email } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password' });
      return;
    }
    const validPassword = userData.checkPassword(password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password' });
      return;
    }

    req.session.save(() => {
          req.session.loggedIn = true;
          req.session.userId = userData.id; 

          res.status(200).json({ user: userData, message: 'You are now logged in' });
        });
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

// // Logout
// router.post('/logout', (req, res) => {
//   if (req.session.loggedIn) {
//     req.session.destroy(() => {
//       res.json({ message: 'Logout successful' });
//     });
//   } else {
//     res.status(404).end();
//   }
// });

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
  const { date, name, type, amount } = req.body;
  if (!date || !name || !type || !amount) {
    return res.status(400).json({ error: 'All fields are required' });
  }
    try {
    const newExpense = await Expense.create({
      date: date,
      name: name,
      type: type,
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

module.exports = router;