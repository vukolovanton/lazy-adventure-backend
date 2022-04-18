const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const { handleRegister } = require('../controllers/registerController');
const { handleLogin } = require('../controllers/loginController');
const { handleLogout } = require('../controllers/logoutController');

router.get('/', async (req, res) => {
	const users = await User.find().select('-password');

	if (!users) {
		res.status(500).send('Error fetching users');
	}

	res.send(users);
});

// Get single user
router.get('/:id', async (req, res) => {
	const users = await User.findById(req.params.id).select('-password');

	if (!users) {
		res.status(500).send('Error fetching users');
	}

	res.send(users);
});

// Create new user
router.post('/register', handleRegister);
// Login user
router.post('/login', handleLogin);
// Logout user
router.post('/logout', handleLogout);

module.exports = router;
