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

export { printError, printSuccess, printHelp };
