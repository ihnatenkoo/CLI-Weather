import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
	console.log(chalk.bgRed.bold(' ERROR ') + '' + error);
};

const printSuccess = (message) => {
	console.log(chalk.bgGreen(' SUCCESS ') + '' + message);
};

const printHelp = () => {
	console.log(dedent`${chalk.white.bgYellow(' HELP ')}
							Without parameters - show weather
							-h show help
							-c [CITY] set city
							-t [TOKEN] set token`);
};

const printWeather = (res) => {
	if (res.sys.country === 'RU') {
		console.log('Русский военный корабль иди нахуй');
	} else {
		console.log(dedent`${chalk.bgBlue(' WEATHER ')}
											City: ${res.name} ${res.sys.country}
											${res.weather[0].main}, ${res.weather[0].description}
											Temperature: ${res.main.temp}c
											Feels like: ${res.main.feels_like}c
											Wind: ${res.wind.speed}m`);
	}
};

export { printWeather, printError, printSuccess, printHelp };
