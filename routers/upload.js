const express = require('express');
const multer = require('multer');

const router = express.Router();

let storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, __dirname + '/resources/static/uploads');
	},
	filename: function (req, file, cb) {
		cb(null, `${file.fieldname}-${Date.now()}.png`);
	},
});

const upload = multer({ storage }).single('file');

router.post(`/`, async (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			res.status(400).send('Something went wrong!');
			console.log(err);
		}
		res.send(req.file);
	});
});

module.exports = router;
