const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

// function authJwt(req, res, next) {
// 	const secret = process.env.TOKEN_SECRET;

// 	return expressJwt({
// 		secret,
// 		algorithms: ['HS256'],
// 	}).unless({
// 		path: ['api/v1/users/login', 'api/v1/users/register'],
// 	});
// }

function authJwt(req, res, next) {
	const authHeader = req.headers.authorization || req.headers.Authorization;
	if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

	const token = authHeader.split(' ')[1];
	jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
		if (err) return res.sendStatus(403); //invalid token
		req.id = decoded._id;
		next();
	});
}

module.exports = authJwt;
