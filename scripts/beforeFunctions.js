const fsExtra = require('fs-extra');
const path = require('path');
const env = process.argv[2];

let jsonPath = '';
let clientJson = {};
switch (env) {
    case 'dev-emulator':
        jsonPath = path.resolve(__dirname, `../env-configuration/dev.json`);
        clientJson = {emulator: true};
        break
    case 'prod-emulator':
        jsonPath = path.resolve(__dirname, `../env-configuration/prod.json`);
        clientJson = {emulator: true};
        break
    case 'dev':
    case 'prod':
        jsonPath = path.resolve(__dirname, `../env-configuration/${env}.json`);
        break;

    default:
        console.error('env param not valid');
        process.exit(0);

}
const json = fsExtra.readJsonSync(jsonPath);

fsExtra.outputJsonSync(path.resolve(__dirname, '../functions/env-configuration.json'), json);
fsExtra.outputJsonSync(path.resolve(__dirname, '../src/env-configuration.json'), json);
fsExtra.outputJsonSync(path.resolve(__dirname, '../src/settings.json'), clientJson);

console.log(`set ${env} files in position, beforeFunctions.js finished`);
