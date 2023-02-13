const express = require('express');
const router = express.Router();
const {
  handleCreateCharacter,
  getCharacterByName,
} = require('../controllers/characterController');

router.get('/:characterName', getCharacterByName);
router.post('/', handleCreateCharacter)

module.exports = router;
