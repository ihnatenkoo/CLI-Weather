#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printError, printSuccess, printHelp } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';
import { getWeather } from './services/api.service.js';

const saveToken = async (token) => {
	if (!token.length) {
		printError(' No token passed');
		return;
	}

	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess(' Token saved');
	} catch (e) {
		printError(e.message);
	}
};

const initCLI = () => {
	const args = getArgs(process.argv);

	if (args.h) {
		printHelp();
	}
	if (args.s) {
		printSuccess('success');
	}
	if (args.t) {
		return saveToken(args.t);
	}
	getWeather('odessa');
};

initCLI();
