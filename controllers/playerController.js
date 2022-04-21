const { Player } = require('../models/player');

async function handleGetPlayersSheet(req, res) {
	if (!req.params.userId) {
		return res.status(500).json({ message: 'User ID is required.' });
	}

	const playersSheet = await Player.findOne({
		userId: req.params.userId,
	}).exec();

	if (!playersSheet) {
		return res.send({});
		// return res.status(500).send('Error fetching players sheet');
	}

	return res.send(playersSheet);
}

async function handleSavePlayerSheet(req, res) {
	if (!req.body.userId) {
		return res.status(500).json({ message: 'User ID is required.' });
	}

	const player = new Player({
		userId: req.body.userId,
		baseInfo: req.body.baseInfo,
		additionalInfo: req.body.additionalInfo,
		baseStats: req.body.baseStats,
		skills: req.body.skills,
		spells: req.body.spells,
		inventory: req.body.inventory,
	});

	player.save().then((data) => {
		res.status(200).json(data);
	});
}

async function handleCreateOrUpdatePlayerSheet(req, res) {
	if (!req.body.userId) {
		return res.status(500).json({ message: 'User ID is required.' });
	}

	const player = await Player.findOne({
		userId: req.body.userId,
	}).exec();

	if (!player) {
		const player = new Player({
			userId: req.body.userId,
			baseInfo: req.body.baseInfo,
			additionalInfo: req.body.additionalInfo,
			baseStats: req.body.baseStats,
			skills: req.body.skills,
			spells: req.body.spells,
			inventory: req.body.inventory,
		});

		player.save().then((data) => {
			return res.status(200).json(data);
		});

		return;
	}

	player.baseInfo = req.body.baseInfo;
	player.additionalInfo = req.body.additionalInfo;
	player.baseStats = req.body.baseStats;
	player.skills = req.body.skills;
	player.spells = req.body.spells;
	player.inventory = req.body.inventory;

	player.save().then((data) => {
		return res.status(200).json(data);
	});
}

module.exports = {
	handleSavePlayerSheet,
	handleGetPlayersSheet,
	handleCreateOrUpdatePlayerSheet,
};
