// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');

// Render login form
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// Handle login post
router.post('/login', authController.getLogin);

// Render logout confirmation
router.get('/logout', (req, res) => {
  res.render('auth/logout');
});

// Handle logout post
router.post('/logout', authController.getLogout);

module.exports = router;