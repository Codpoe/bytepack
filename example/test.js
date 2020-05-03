const pack = require('../lib/index').default;
const mpaPreset = require('../lib/presets/mpa').default;

pack({
  presets: [mpaPreset],
});
