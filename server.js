const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');
const sequelize = require('./config/connection');
const Expense = require('./models/Expense');
const financial = require('financial');

const app = express();


const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'Super secret secret',
    cookie: {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  };

app.use(session(sess));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.get('/expenses', async (req, res) => {
  try {
    if (req.session.loggedIn) {
      const expenses = await Expense.findAll({ where: { userid: req.session.userId } });

      res.render('partials/expenses', {
        expenses,  
        loggedIn: req.session.loggedIn,
      });
    } else {
      // If the user is not logged in, redirect them to the login page
      res.redirect('/login');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(
      `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
    )
  );
});