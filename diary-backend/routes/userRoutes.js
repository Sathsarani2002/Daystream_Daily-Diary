const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', getUserProfile); // ✅ Added this

module.exports = router;
