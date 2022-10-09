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

const getForcast = async () => {
	try {
		const weather = await getWeather('odessa');
		console.log(weather);
	} catch (e) {
		if (e?.response?.status === 404) {
			printError('Wrong city, set it using the command -c [CITY]');
		} else if (e?.response?.status === 401) {
			printError('Wrong token, set it using the command -t [API_KEY]');
		} else {
			printError(e.message);
		}
	}
};

const initCLI = () => {
	const args = getArgs(process.argv);

	if (args.h) {
		printHelp();
	}
	if (args.c) {
		printSuccess('City block');
	}
	if (args.t) {
		return saveToken(args.t);
	}

	getForcast();
};

initCLI();
