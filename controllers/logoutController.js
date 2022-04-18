const { User } = require('../models/user');

async function handleLogout(req, res) {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(204); //No content
	const refreshToken = cookies.jwt;

	const foundUser = await User.findOne({ token: refreshToken }).exec();
	if (!foundUser) {
		res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
		return res.sendStatus(204);
	}

	res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
	res.sendStatus(204);
}

module.exports = { handleLogout };
