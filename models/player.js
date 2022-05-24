const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
  userId: String,
  baseInfo: {
    characterName: String,
    characterClass: String,
    level: Number,
    race: String,
    aligment: String,
    gender: String,
    experience: Number,
  },
  additionalInfo: {
    armorClass: Number,
    initiative: Number,
    speed: Number,
    currentHitPoints: Number,
    maximumHitPoints: Number,
    temporaryHitPoints: Number,
    hitDice: String,
    deathSaves: [],
  },
  baseStats: {
    strength: Number,
    dexterety: Number,
    constitution: Number,
    intelligence: Number,
    wisdom: Number,
    charisma: Number,
  },
  skills: [],
  spells: [],
  inventory: [],
});

exports.Player = mongoose.model('Player', playerSchema);
