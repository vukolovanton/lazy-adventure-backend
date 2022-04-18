const bcrypt = require('bcryptjs');
const { User } = require('../models/user');

async function handleRegister(req, res) {
	if (!req.body.username || !req.body.password)
		return res
			.status(400)
			.json({ message: 'Username and password are required.' });

	const user = new User({
		username: req.body.username,
		password: bcrypt.hashSync(req.body.password, 10),
		isAdmin: req.body.isAdmin,
	});

	try {
		const duplicate = await User.findOne({ username: user.username }).exec();
		if (duplicate)
			return res.status(409).json({ message: 'Username already exists.' });

		await user.save();
		res.send(user);
	} catch (err) {
		res.status(400).send(err);
	}
}

module.exports = { handleRegister };
