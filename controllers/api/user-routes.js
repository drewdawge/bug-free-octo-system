const router = require('express').Router();
const { User } = require('../../models');

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
    const user = await User.findOne({ where: { username } });

    if (!user || !user.checkPassword(password)) {
      res.status(400).json({ error: 'Invalid credentials' });
      return;
    }

    req.session.userId = user.id;
    req.session.loggedIn = true;
    res.json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.json({ message: 'Logout successful' });
    });
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
      res.json({ expenses });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

module.exports = router;
