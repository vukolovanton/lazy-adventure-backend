const express = require('express');
const router = express.Router();
const {
	handleCreateOrUpdatePlayerSheet,
	handleGetPlayersSheet,
  	handleCreateCharacter
} = require('../controllers/playerController');

router.get('/:userId', handleGetPlayersSheet);
router.post('/', handleCreateOrUpdatePlayerSheet);
router.post('/character', handleCreateCharacter)

module.exports = router;
