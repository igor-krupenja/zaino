import * as functions from 'firebase-functions';

type Settings = { region: string };

const settings = functions.config().settings as Settings;

export default settings.region;
