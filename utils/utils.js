function trimCharacterName(name) {
	return name.split(" ").join("").toLowerCase();
}

module.exports = {
	trimCharacterName,
}