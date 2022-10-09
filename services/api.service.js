import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const getWeather = async () => {
	const token = await getKeyValue(TOKEN_DICTIONARY.token);
	const city = await getKeyValue(TOKEN_DICTIONARY.city);
	if (!token) {
		throw new Error(
			'The Token is not set, set it using the command -t [API_KEY]'
		);
	}
	if (!city) {
		throw new Error('The City is not set, set it using the command -c [CITY]');
	}

	const { data } = await axios.get(
		`https://api.openweathermap.org/data/2.5/weather`,
		{
			params: {
				q: city,
				appid: token,
				units: 'metric',
			},
		}
	);

	return data;
};

export { getWeather };
