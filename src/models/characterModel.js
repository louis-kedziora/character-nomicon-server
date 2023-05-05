const mongoose = require("mongoose");


const characterSchema = {
  name: String,
  characterClass: String,
  race: String,
  background: String,
  alignment: String,
  languagesKnown: String,
  armorProficiences: String,
  weaponProficiences: String,
  toolProficiences: String,
  hpMax: Number,
  currentHP: Number,
  tempHP: Number,
  deathSaveSuccesses: Number,
  deathSaveFailures: Number,
  str: Number,
  int: Number,
  dex: Number,
  wis: Number,
  con: Number,
  char: Number,
  ac: Number,
  speed: String,
  level: Number,
  spellCastingAttribute: String,
  combatInfoBoxes:  [
    {
      combatInfoID: String,
      title: String,
      info: String,
    },
  ],
  trainedSkills: {
    athletics: Boolean,
    acrobatics: Boolean,
    sleightOfHand: Boolean,
    stealth: Boolean,
    arcana: Boolean,
    history: Boolean,
    investigation: Boolean,
    nature: Boolean,
    religion: Boolean,
    animalHandling: Boolean,
    insight: Boolean,
    medicine: Boolean,
    perception: Boolean,
    survival: Boolean,
    deception: Boolean,
    intimidation: Boolean,
    performance: Boolean,
    persuasion: Boolean,
  },
  savingThrowProficiency: {
    str: Boolean,
    int: Boolean,
    dex: Boolean,
    wis: Boolean,
    con: Boolean,
    char: Boolean,
  },
  notes: String,
  features: String,
  loot: String,
  partyLoot: String,
  customResources: [{
    resourceID: String,
    resourceName: String,
    currentResourceValue: Number,
    maxResourceValue: Number,
  }],
  attacks: [
    {
      attackID: String,
      attackName: String,
      attackRange: String,
      attackModifier: String,
      attackDamage: String,
      attackType: String,
      attackNotes: String,
    },
  ],
  spells: [
    {
      spellID: String,
      spellLevel: String,
      spellPrepared: Boolean,
      spellName: String,
      spellTime: String,
      spellRange: String,
      spellHitOrDC: String,
      spellEffect: String,
      spellNotes: String,
    },
  ],
};

exports.getSchema = () => {
  return characterSchema;
}

exports.getModel = () => {
  const Character = mongoose.model("Character", characterSchema);
    return Character;
}
