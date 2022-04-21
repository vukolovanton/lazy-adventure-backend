const express = require('express');
const router = express.Router();
const {
	handleCreateOrUpdatePlayerSheet,
	handleGetPlayersSheet,
} = require('../controllers/playerController');

router.get('/:userId', handleGetPlayersSheet);
router.post('/', handleCreateOrUpdatePlayerSheet);

module.exports = router;
