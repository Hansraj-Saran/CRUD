const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const bodyparser = require("body-parser");
const User = require('../models/User');

const cors = require('cors');

const app = express();
const upload = multer({ dest: 'uploads/' });



// Middleware to parse JSON data
app.use(express.json());
// Enable CORS
app.use(cors());

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// MongoDB setup
const mongoose = require('mongoose');
const url = "mongodb+srv://hansrajsaran2601:<Password>@cluster0.780govk.mongodb.net/crud"
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("MongoDB Connected…");
  })
  .catch((err) => console.log(err));;


// API to create a new user
router.post('/api/users', upload.single('profileImage'), (req, res) => {
  const {id, firstName, lastName, email, phoneNumber } = req.body;
  const profileImage = req.file ? req.file.filename : '';

  const user = new User({id, firstName, lastName, email, phoneNumber, profileImage });

  user.save()
    .then(() => {
      res.status(201).json({ message: 'User created successfully' });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// API to update an existing user
router.put('/api/users/:id', upload.single('profileImage'), (req, res) => {
  const { firstName, lastName, email, phoneNumber } = req.body;
  const profileImage = req.file ? req.file.filename : '';

  User.findAndUpdate({id:req.params.id}, { firstName, lastName, email, phoneNumber, profileImage })
    .then(() => {
      res.status(200).json({ message: 'User updated successfully' });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// API to get the list of all users
router.get('/api/userlist', (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// API to delete a user
router.delete('/api/users/:id', (req, res) => {
  User.findAndDelete({id:req.params.id})
    .then(() => {
      res.status(200).json({ message: 'User deleted successfully' });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// API to get details of a user
router.get('/api/users/:id', (req, res) => {
  User.find({id:req.params.id})
    .then(user => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
