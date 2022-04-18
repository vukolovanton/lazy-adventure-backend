const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

router.get('/', async (req, res) => {
	const users = await User.find().select('-passwordHash');

	if (!users) {
		res.status(500).send('Error fetching users');
	}

	res.send(users);
});

// Get single user
router.get('/:id', async (req, res) => {
	const users = await User.findById(req.params.id).select('-passwordHash');

	if (!users) {
		res.status(500).send('Error fetching users');
	}

	res.send(users);
});

// Create new user
router.post('/register', async (req, res) => {
	const user = new User({
		name: req.body.name,
		passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
		isAdmin: req.body.isAdmin,
	});

	try {
		await user.save();
		res.send(user);
	} catch (err) {
		res.status(400).send(err);
	}
});

// Login user
router.post('/login', async (req, res) => {
	const user = await User.findOne({ name: req.body.name });

	if (!user) {
		return res.status(400).send('Invalid username or password');
	}

	const validPassword = bcrypt.compareSync(
		req.body.passwordHash,
		user.passwordHash
	);

	if (!validPassword) {
		res.status(400).send('Invalid username or password');
	}

	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
		expiresIn: '1d',
	});

	res.send({
		_id: user._id,
		username: user.name,
		token,
	});
});

module.exports = router;
