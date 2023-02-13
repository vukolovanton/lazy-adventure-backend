const fs = require("fs")
const { writeFile } = require("fs");
const directoryPath = '/public/characters/';
const { trimCharacterName } = require('../utils/utils');

async function handleCreateCharacter(req, res) {
	if (!req.body) {
		return res.status(500).json({ message: 'Request body is missing' });
	}

	const characterName = trimCharacterName(req.body.name);
	const path = __basedir + directoryPath + characterName + '.json'
	
	writeFile(path, JSON.stringify(req.body, null, 2), (error) => {
		if (error) {
			return res.status(500).json({ message: error });
		}
		return res.status(200).json({});
	});
}

async function getCharacterByName(req, res) {
	if (!req.params.characterName) {
		return res.status(500).json({ message: 'Request body is missing' });
	}
	const characterName = trimCharacterName(req.params.characterName);
	const path = __basedir + directoryPath + characterName + '.json';

	fs.readFile(path, "utf8", (error, jsonString) => {
    if (error) {
        res.status(500).json({ message: 'Error reading the JSON file: ', error });
    }
    try {
        const character = JSON.parse(jsonString);
        res.status(200).json(character);
    } catch (err) {
        console.log("Error parsing JSON string:", err);
        res.status(500).json({ message: 'Error reading the JSON file: ', err });
    }
});
}

module.exports = {
  handleCreateCharacter,
  getCharacterByName,
};
