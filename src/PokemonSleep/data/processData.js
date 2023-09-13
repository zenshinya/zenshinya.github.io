const fs = require("fs");

var TimeFormat = require("hh-mm-ss");

const data = require("./default.json");

// 0.2% per level
const FREQ_INCREMENT_PER_LEVEL = 0.2;

Object.keys(data).forEach((pkmKey) => {
  const pokemon = data[pkmKey];
  const baseFreq = pokemon.base_freq;
  const baseFreqInSec = TimeFormat.toS(baseFreq);

  const frequencies = [];

  // Level 1 to 50
  const maxLevel = 50;
  for (let i = 0; i < maxLevel; i += 1) {
    const increment = FREQ_INCREMENT_PER_LEVEL * i;

    frequencies.push(Math.floor(baseFreqInSec * (1 - increment / 100)));
    console.log(TimeFormat.fromS(frequencies[i], "hh:mm:ss"));
  }
});
