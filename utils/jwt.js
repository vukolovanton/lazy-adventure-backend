const expressJwt = require('express-jwt');

function authJwt(req, res, next) {
	const secret = process.env.TOKEN_SECRET;

	// const token = req.headers['x-access-token'];

	// if (!token) {
	// 	return res.status(401).send({
	// 		message: 'No token provided.',
	// 	});
	// }

	// jwt.verify(token, process.env.SECRET, (err, decoded) => {
	// 	if (err) {
	// 		return res.status(401).send({
	// 			message: 'Failed to authenticate token.',
	// 		});
	// 	}

	// 	req.userId = decoded.id;
	// 	next();
	// });

	return expressJwt({
		secret,
		algorithms: ['HS256'],
	}).unless({
		path: 'api/v1/users/login',
		path: 'api/v1/users/register',
	});
}

module.exports = authJwt;
