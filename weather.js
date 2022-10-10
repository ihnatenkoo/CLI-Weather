#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printWeather, printError, printHelp } from './services/log.service.js';
import { saveToken, saveCity, getParams } from './services/storage.service.js';
import { getWeather } from './services/api.service.js';

const getForcast = async () => {
	try {
		const weather = await getWeather();
		printWeather(weather);
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

const initCLI = async () => {
	const args = getArgs(process.argv);

	if (args.h) {
		return printHelp();
	}
	if (args.c) {
		return await saveCity(args.c);
	}
	if (args.t) {
		return await saveToken(args.t);
	}
	if (args.p) {
		return await getParams();
	}

	getForcast();
};

initCLI();
