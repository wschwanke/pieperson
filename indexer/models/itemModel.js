const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  abyssJewel: Boolean,
  additionalProperties: [{
    name: String,
    values:	[],
    displayMode: Number,
    type: Number,
    progress: Number
  }],
  artFilename: String,
  category: [String],
  corrupted: Boolean,
  cosmeticMods: [String],
  craftedMods: [String],
  descrText: String,
  duplicated: Boolean,
  elder: Boolean,
  enchantMods: [String],
  explicitMods: [String],
  flavourText: [String],
  frameType: String,
  h: Number,
  icon:	String,
  id: String,
  identified:	Boolean,
  ilvl: Number,
  implicitMods: [String],
  inventoryId: String,
  isRelic: Boolean,
  league: String,
  lockedToCharacter: Boolean,
  maxStackSize: Number,
  name: String,
  nextLevelRequirements: [{
    name: String,
    values:	[],
    displayMode: Number,
    type: Number,
    progress: Number
  }],
  note:	String,
  properties: [{
    name: String,
    values:	[],
    displayMode: Number,
    type: Number,
    progress: Number
  }],
  prophecyDiffText:	String,
  prophecyText: String,
  requirements: [{
    name: String,
    values:	[],
    displayMode: Number,
    type: Number,
    progress: Number
  }],
  secDescrText: String,
  shaper: Boolean,
  socketedItems: [Schema.Types.Mixed],
  sockets: [{
    group: Number,
    attr: Schema.Types.Mixed,
    sColour: String
  }],
  stackSize: Number,
  support: Boolean,
  talismanTier: Number,
  typeLine: String,
  utilityMods: [String],
  verified: Boolean,
  w: Number,
  x: Number,
  y: Number
});

module.exports = mongoose.model('Stash', stashSchema);