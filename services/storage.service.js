import { homedir } from 'os';
import { promises } from 'fs';
import { join } from 'path';
import { printError, printSuccess, printParams } from './log.service.js';

const TOKEN_DICTIONARY = {
	token: 'token',
	city: 'city',
};

const filePath = join(homedir(), 'weather-data.json');

const isExist = async (path) => {
	try {
		await promises.stat(path);
		return true;
	} catch (e) {
		return false;
	}
};

const saveKeyValue = async (key, value) => {
	let data = {};

	if (await isExist(filePath)) {
		const file = await promises.readFile(filePath);
		data = JSON.parse(file);
	}

	data[key] = value;

	await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key) => {
	if (await isExist(filePath)) {
		const file = await promises.readFile(filePath);
		const data = JSON.parse(file);

		return data[key];
	}

	return undefined;
};

const getParams = async () => {
	if (await isExist(filePath)) {
		const file = await promises.readFile(filePath);
		const data = JSON.parse(file);

		printParams(data.token ?? 'Not set', data.city ?? 'Not set');
	} else {
		printParams('Not set', 'Not set');
	}
};

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

const saveCity = async (city) => {
	if (!city.length) {
		printError(' No city passed');
		return;
	}

	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
		printSuccess(' City saved');
	} catch (e) {
		printError(e.message);
	}
};

export {
	saveKeyValue,
	getKeyValue,
	TOKEN_DICTIONARY,
	saveToken,
	saveCity,
	getParams,
};
