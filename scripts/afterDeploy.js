const fsExtra = require('fs-extra');
const path = require('path');

fsExtra.outputJsonSync(path.resolve(__dirname, '../src/settings.json'), {emulator: true});

console.log(`afterDeploy.js finished`);
