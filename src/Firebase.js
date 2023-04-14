import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import settings from './settings.json';
const {firebaseConfig} = require('./env-configuration.json');

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebaseApp.auth();
export const func = firebase.functions();
if(!!settings.emulator) {
    func.useEmulator("localhost", 5001);
}
