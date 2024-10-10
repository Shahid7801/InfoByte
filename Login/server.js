const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

// In-memory user storage (for demonstration purposes)
const users = [];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false
}));

// Routes
app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Secured Page
app.get('/secured', (req, res) => {
      if (req.session.user) {
            res.render('secured', { username: req.session.user.username });
      } else {
            res.redirect('/login');
      }
});

// Registration
app.post('/register', async (req, res) => {
      const { username, password } = req.body;

      // Check if the user already exists
      const userExists = users.find(user => user.username === username);
      if (userExists) {
            return res.status(400).send('User already exists');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
            return res.json({ success: true }); // Respond with success

      // Store the user
      // users.push({ username, password: hashedPassword });
      // res.redirect('/login');
});

// Login
app.post('/login', async (req, res) => {
      const { username, password } = req.body;

      // Find the user
      const user = users.find(user => user.username === username);
      if (!user) {
            return res.status(400).send('User not found');
      }

      // Check password
      const match = await bcrypt.compare(password, user.password);
      if (match) {
            req.session.user = { username: user.username };
            return res.json({ success: true }); // Respond with success
      } else {
            res.status(400).send('Invalid password');
      }
});


// Logout
app.get('/logout', (req, res) => {
      req.session.destroy(err => {
            if (err) {
                  return res.status(500).send('Could not log out');
            }
            res.redirect('/');
      });
});

app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
});
