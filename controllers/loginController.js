const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

async function handleLogin(req, res) {
	const user = await User.findOne({ username: req.body.username });

	if (!user) {
		return res.status(401).send('Invalid username or password');
	}

	const validPassword = bcrypt.compareSync(req.body.password, user.password);

	if (!validPassword) {
		return res.status(401).send('Invalid username or password');
	}

	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
		expiresIn: '7d',
	});

	res.cookie('token', token, { httpOnly: true });

	res.send({
		user: {
			id: user._id,
			username: user.username,
		},
		token,
	});
}

module.exports = { handleLogin };
