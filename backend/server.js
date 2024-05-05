const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://konark11solanki:mYHqBheNxuJLIi2N@cluster0.ejy6t8t.mongodb.net/todo_list');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// User schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  }, { collection: 'users' });

const User = mongoose.model('User', UserSchema, 'users');

// Register endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Could not register user' });
    }
  });
  
// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user._id }, 'secret_key');
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
